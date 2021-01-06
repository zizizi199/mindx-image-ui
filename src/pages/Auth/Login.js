import { useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import api from '../../api';
import AuthLayout from '../../components/Layout/AuthLayout';
import { AuthContext } from '../../App';

function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
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
  }

  const onSubmitForm = async (event) => {
    event.preventDefault();
    const res = await api({
      url: '/auth/login',
      method: 'POST',
      data: form
    });
    if (res.success) {
      login(res.data);
    }
  }

  return (
    <AuthLayout>
      <div className="Login">
        <Form className="form-wrapper" onSubmit={onSubmitForm}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              value={form.username}
              type="email"
              placeholder="Enter email"
              name="username"
              onChange={onChangeForm}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={form.password}
              type="password"
              placeholder="Password"
              name="password"
              onChange={onChangeForm}
            />
          </Form.Group>
          <Button variant="primary" type="submit" block>
            Submit
          </Button>
        </Form>
        <div className="redirect-box mt-4 form-wrapper">
          <div>Not account? <Link to="/signup">Signup</Link></div>
        </div>
      </div>
    </AuthLayout>
  )
}

export default Login;