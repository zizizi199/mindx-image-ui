import { useState, useContext } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import storage from '../../firebase'
import ImageUploader from 'react-images-upload';
import MainLayout from '../../components/Layout/MainLayout';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { AuthContext } from '../../App';
import api from '../../api';

import './style.css';

function CreatePost() {
  const [form, setForm] = useState({ title: '', description: '' });
  const [picture, setPicture] = useState(null);

  const history = useHistory();

  const authValue = useContext(AuthContext);
  const { user } = authValue;

  if (!user) return (
    <Redirect to="/login" />
  );

  const onDrop = picture => {
    setPicture(picture[0]);
  };

  const onChangeForm = (event) => {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value
    })
  }

  const uploadFile = (file) => {
    return new Promise((resolve, reject) => {
      const task = storage.child(file.name).put(file);

      task.on('state_changed',
        function onProgress() {},
        function onError(error) {
          reject(error);
        },
        function onSuccess() {
          task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            resolve(downloadURL);
          });
        }
      );
    }); 
  }

  const onSubmitForm = async (event) => {
    event.preventDefault();
    // b1: upload file lên filebase để tạo được đường dẫn url
    const { title, description } = form;
    if (picture && title && description) {
      const imageUrl = await uploadFile(picture);
      console.log(imageUrl);
      // b2: gọi api tạo bài post với title, description và imageUrl
      const res = await api({
        url: '/posts',
        method: 'POST',
        data: {
          title,
          description,
          imageUrl
        }
      });
      if (res.success) {
        history.push('/')
      }
    }
    
  }

  const cls = picture ? 'has-picture' : '';

  return (
    <MainLayout>
      <Container>
        <Row>
          <Col xs="12" md="6">
            <ImageUploader
              className={cls}
              withIcon={true}
              onChange={onDrop}
              imgExtension={[".jpg", ".gif", ".png", ".gif"]}
              maxFileSize={5242880}
              withPreview={true}
              singleImage={true}
            />
          </Col>
          <Col xs="12" md="6">
            <Form className="form-wrapper" onSubmit={onSubmitForm}>
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  value={form.title}
                  placeholder="Enter title"
                  name="title"
                  onChange={onChangeForm}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={form.description}
                  placeholder="Enter description"
                  name="description"
                  onChange={onChangeForm}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Create post
          </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </MainLayout>
  )
}

export default CreatePost;