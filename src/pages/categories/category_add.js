import React, { useState,useEffect  } from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import axios from 'axios'; 
import { useRouter } from 'next/router';

function CategoryAdd() {
  const [name, setName] = useState('');
  const [index, setIndex] = useState('');
  // const [selectedValue, setSelectedValue] = useState('active');
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const router = useRouter();

  // Function to close messages after 4 seconds
  const closeMessages = () => {
    setErrorMessage('');
    setSuccessMessage('');
  };

  useEffect(() => {
    if (errorMessage || successMessage) {
      const timeoutId = setTimeout(() => {
        closeMessages();
        router.push('/categories'); // Redirect to /categories after 4 seconds
      }, 2000); // 4000 milliseconds (4 seconds)
      
      // Clear the timeout when the component unmounts
      return () => clearTimeout(timeoutId);
    }
  }, [errorMessage, successMessage, router]);


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append('name', name);
    formData.append('index', index);
    // formData.append('selectedValue', selectedValue);
    formData.append('image', image);
  
    try {
      // Send a POST request to the API endpoint with the FormData
      const response = await axios.post('http://127.0.0.1:8000/api/add_category', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
        },
      });
  
      // Handle the response, e.g., show a success message
      console.log('Data sent successfully:', response.data);
      setErrorMessage('');
      setSuccessMessage('Data Added successfully.');

    } catch (error) {
      // Handle any errors that occur during the request
      console.error('Error sending data:', error);
      setSuccessMessage('');
      setErrorMessage('An error occurred while submitting the form.');

    }
  };
  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1024 * 1024 * 10) { // Check if the file size is greater than 10MB
        setErrorMessage('Image size is too large. Please choose a smaller image.');
        return;
      }
  
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  

  const handleRadioChange = (e) => {
    setSelectedValue(e.target.value);
  };


  const handleCancel = () => {
    router.push('/categories');

  };

  return (
    <div className="container mx-auto">
      <Typography variant="h5" className="pb-4">
        <Link href="/categories" target="">
          Manage Category - Add
        </Link>
      </Typography>

      <div className="bg-gray-200 w-full sm:w-2/4 p-6 rounded-lg">
        <form onSubmit={handleSubmit}>
        {errorMessage && (
            <div className="bg-red-500 text-white p-2 mb-4">
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="bg-green-500 text-white p-2 mb-4">
              {successMessage}
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="name" className="block font-medium pb-2"  >
              Category Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full border border-blue-300 rounded px-3 py-2 focus:text-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="index" className="block font-medium pb-2">
              Order
            </label>
            <input
              type="text"
              id="index"
              className="w-full border border-blue-300  rounded px-3 py-2 focus:text-blue-500"
              value={index}
              onChange={(e) => setIndex(e.target.value)}
              placeholder="Enter Order"
            />
          </div>
          <div className="container mx-auto">
            <h1 className="block font-medium mb-2">Category Pic</h1>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mb-4"
            />
            {image && (
              <div className="mb-4">
                <h2 className="text-xl font-semibold">Preview:</h2>
                <img src={image} alt="Uploaded" className="mt-2 max-w-md" />
              </div>
            )}
          </div>
          {/* <div className="pt-4">
            <label className="mr-2">
              <input
                type="radio"
                value="active"
                checked={selectedValue === 'active'}
                onChange={handleRadioChange}
                className="mr-1"
              />
              Active
            </label>
            <label>
              <input
                type="radio"
                value="inactive"
                checked={selectedValue === 'inactive'}
                onChange={handleRadioChange}
                className="mr-1"
              />
              Inactive
            </label>
          </div> */}
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

export default CategoryAdd;
