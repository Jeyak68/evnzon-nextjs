import React, { useState,useRef  } from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import axios from 'axios'; 
import { useRouter } from 'next/router';

function UsersAdd() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create an object with the form data
    const formData = {
      userName,
      email,
      password,
    };

    try {
      // Send a POST request to the API endpoint
      const response = await axios.post('your-api-endpoint-url', formData);

      // Handle the response, e.g., show a success message
      console.log('Data sent successfully:', response.data);
    } catch (error) {
      // Handle any errors that occur during the request
      console.error('Error sending data:', error);
    }
  };



  const handleCancel = () => {
    router.push('/users');

  };

  return (
    <div className="container mx-auto">
      <Typography variant="h5" className="pb-4">
        <Link href="/users" target="">
          Manage Users - Add
        </Link>
      </Typography>

      <div className="bg-gray-200 w-full sm:w-2/4 p-6 rounded-lg">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block font-medium pb-2"  >
            User Name*
            </label>
            <input
              type="text"
              id="username"
              className="w-full border border-blue-300 rounded px-3 py-2 focus:text-blue-500"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter User Name"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium pb-2"  >
            Email Address*
            </label>
            <input
              type="text"
              id="email"
              className="w-full border border-blue-300 rounded px-3 py-2 focus:text-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
            />
          </div>
   
          <div className="mb-4">
            <label htmlFor="password" className="block font-medium pb-2"  >
            Password*
            </label>
            <input
              type="text"
              id="password"
              className="w-full border border-blue-300 rounded px-3 py-2 focus:text-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
            />
          </div>
   
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            >
              Submit
            </button>
            <button
              type="button"
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UsersAdd;
