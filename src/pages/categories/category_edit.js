import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import axios from 'axios'; 
import { useRouter } from 'next/router';

function CategoryEdit() {
  const [categoryName, setCategoryName] = useState('');
  const [orderName, setOrderName] = useState('');
  const [selectedValue, setSelectedValue] = useState('active');
  const [image, setImage] = useState(null);
  const router = useRouter();

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create an object with the form data
    const formData = {
      categoryName,
      orderName,
      selectedValue,
      image, // This assumes your API can handle image uploads
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
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
          Manage Category - Edit
        </Link>
      </Typography>

      <div className="bg-gray-200 w-full sm:w-2/4 p-6 rounded-lg">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="categoryname" className="block font-medium pb-2"  >
              Category Name
            </label>
            <input
              type="text"
              id="categoryname"
              className="w-full border border-blue-300 rounded px-3 py-2 focus:text-blue-500"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Enter Name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="ordername" className="block font-medium pb-2">
              Order
            </label>
            <input
              type="text"
              id="ordername"
              className="w-full border border-blue-300  rounded px-3 py-2 focus:text-blue-500"
              value={orderName}
              onChange={(e) => setOrderName(e.target.value)}
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
          <div className="pt-4">
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

export default CategoryEdit;
