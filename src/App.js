import { Switch, Route } from 'react-router-dom';
import { useState, createContext, useEffect, useRef } from 'react';
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/Signup';
import CreatePost from './pages/Posts/CreatePost';
import PostDetail from './pages/Posts/PostDetail';
import NotFound from './pages/NotFound/404';
import api from './api';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

export const AuthContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [firstRender, setFirstRender] = useState(true);

  const verifyAuth = async () => {
    setLoading(true)
    try {
      const res = await api({
        url: '/auth/verify',
        method: 'GET'
      });
      if (res.success) {
        setUser(res.data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
    }
    
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      console.log('call verify', token);
      verifyAuth();
    }
    setFirstRender(false);
  }, [])

  const login = ({ user, token }) => {
    localStorage.setItem('token', token);
    setUser(user);
  }

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  }

  if (loading || firstRender) return <div>Loading...</div>

  const authValue = {
    user,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={authValue}>
      <div className="App">
        <Switch>
          <Route path='/' exact>
            <Home />
          </Route>
          <Route path='/login' exact>
            <Login />
          </Route>
          <Route path='/signup' exact>
            <SignUp />
          </Route>
          <Route path='/upload' exact>
            <CreatePost />
          </Route>
          <Route path='/posts/:id' exact>
            <PostDetail />
          </Route>
          <Route path='*'>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </AuthContext.Provider>
  );
}

export default App;