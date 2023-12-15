import './App.css';
import { Routes, Route } from 'react-router-dom';
import Dashboard from 'pages/dashboard';
import Login from 'pages/login';
import Register from 'pages/register';
import Home from 'pages/home';
import ForgotPassword from 'pages/forgot-password';
import PasswordReset from 'pages/password-reset';
import NotFoundPage from 'pages/404';
import Create from 'pages/create';
import BlogPost from 'pages/blogPost';
import Edit from 'pages/edit';
import Profile from 'pages/profile';
import MyAccount from 'pages/myAccount';
function App() {
  return (
    <div className="antialiased">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/password-reset/:token" element={<PasswordReset />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/myAccount" element={<MyAccount />} />
        <Route path="/create" element={<Create />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/profile/:id" element={<Profile />} />

        <Route path="*" element={<NotFoundPage/>}
        />
      </Routes>
    </div>
  );
}

export default App;
