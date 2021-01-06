import { useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import AuthLayout from '../../components/Layout/AuthLayout';
import api from '../../api';
import { AuthContext } from '../../App';

function Signup() {
  const [form, setForm] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const authValue = useContext(AuthContext);
  const { user, login } = authValue;

  if (user) return (
    <Redirect to="/" />
  );

  const onChangeForm = (event) => {
    const { name, value } = event.target;
  
    setForm({
      ...form,
      [name]: value
    })
  };

  const { username, password, confirmPassword } = form;

  const onSubmitForm = async (event) => {
    event.preventDefault();
    const res = await api({
      url: '/auth/signup',
      method: 'POST',
      data: form
    });
    if (res.success) {
      login(res.data);
    }
  }

  return (
    <AuthLayout>
      <div className="Signup">
        <Form className="form-wrapper" onSubmit={onSubmitForm}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              value={username}
              onChange={onChangeForm}
              type="email"
              placeholder="Enter email"
              name="username"
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={password}
              onChange={onChangeForm}
              type="password"
              placeholder="Password"
              name="password"
            />
          </Form.Group>
          <Form.Group controlId="confirmFormBasicPassword">
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              value={confirmPassword}
              onChange={onChangeForm}
              type="password"
              placeholder="Confirm password"
              name="confirmPassword"
            />
          </Form.Group>
          <Button variant="primary" type="submit" block>
            Submit
          </Button>
        </Form>
        <div className="redirect-box mt-4 form-wrapper">
          <div>Have account? <Link to="/login">Login</Link></div>
        </div>
      </div>
    </AuthLayout>
  )
}

export default Signup;