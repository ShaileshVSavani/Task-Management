
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Get login function from context

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    // Retrieve the list of users from local storage
    const users = JSON.parse(localStorage.getItem('users')) || [];
  
    // Find a user with matching email and password
    const user = users.find(
      (u) => u.email === formData.email && u.password === formData.password
    );
  
    if (user) {
      toast.success('Login successful!');
  
      // Set the currently logged-in user in local storage
      localStorage.setItem('currentUser', JSON.stringify(user));
      login(user);
  
      navigate(user.role === 'admin' ? '/admin' : '/user');
    } else {
      toast.error('Invalid email or password!');
    }
  };
  

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <ToastContainer />
      <div className="w-96 p-6 shadow-md bg-white rounded">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          Don't have an account? <a href="/register" className="text-indigo-600">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
