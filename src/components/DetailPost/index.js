import { useContext, useState } from 'react';
import { Row, Col, Card, Form } from 'react-bootstrap';
import { AuthContext } from '../../App';
import api from '../../api';

// props = post
function DetailPost({ imageUrl, _id, comments, addComment }) {
  const { user } = useContext(AuthContext);
  const [content, setContent] = useState('');

  const onChangeContent = (event) => {
    setContent(event.target.value);
  }

  const onSubmitForm = async (event) => {
    event.preventDefault();
    const res = await api({
      url: '/comments',
      method: 'POST',
      data: {
        content,
        postId: _id
      }
    });
    if (res.success) {
      addComment({ createdBy: { username: user.username }, content });
      setContent('');
    }
  };

  return (
    <Row>
      <Col xs="12" md="6">
        <Card>
          <Card.Img variant="top" src={imageUrl} />
        </Card>
      </Col>
      <Col xs="12" md="6">
        <div className="d-flex flex-column" style={{ height: '80vh' }}>
          <div className="list-comment flex-grow-1">
            {comments.map(comment => (
              <div key={comment._id}>
                {comment.createdBy.username} {comment.content}
              </div>
            ))}
          </div>
          <div className="form-comment">
            {
              user && (
                <Form onSubmit={onSubmitForm}>
                  <Form.Group>
                    <Form.Control
                      value={content}
                      placeholder="Enter your comment"
                      onChange={onChangeContent}
                    />
                  </Form.Group>
                </Form>
              )
            }
          </div>

        </div>
      </Col>
    </Row>
  )
}

export default DetailPost;