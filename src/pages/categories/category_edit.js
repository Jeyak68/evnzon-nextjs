import React, { useState,useEffect  } from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import axios from 'axios'; 
import { useRouter } from 'next/router';

function CategoryEdit() {
  const [name, setName] = useState('');
  const [index, setIndex] = useState('');
  const [image, setImage] = useState(null);
  const [editid, setEditId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isDataLoaded, setIsDataLoaded] = useState(false); // Track if data is loaded
  const [data, setData] = useState(null);


  const [categories, setCategories] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const router = useRouter();
  const { id } = router.query; // Retrieve the ID from query parameters

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
      }, 4000); // 4000 milliseconds (4 seconds)

      // Clear the timeout when the component unmounts
      return () => clearTimeout(timeoutId);
    }

    if (id) {
      // Fetch data based on the ID
      async function fetchData() {
        try {
          const response = await fetch(`https://sibiselva2000.pythonanywhere.com/api/category_edit_details`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }), // Send the ID as JSON data in the request body
          });
  
          console.log(response)
          if (response.ok) {
            const data = await response.json();
            // const filteredData = data.filter(item => item.id === id);
            setName(data.data.name);
            setIndex(data.data.index);
            setImage(data.data.image);
            setEditId(data.data.id);
            setData(data);
            setIsDataLoaded(true);
          } else {
            console.error('Failed to fetch data:', response.status);
          }
        } catch (error) {
          console.error('An error occurred:', error);
        }
      }
  

      fetchData();
    }
  }, [errorMessage, successMessage, id, router]);



  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append('name', name);
    formData.append('index', index);
    formData.append('image', image);
    formData.append('id', id);
    try {
      // Send a POST request to the API endpoint with the FormData
      const response = await axios.post('https://sibiselva2000.pythonanywhere.com/api/edit_category?id=${id}', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
        },
      });
  
      // Handle the response, e.g., show a success message
      console.log('Data Updated successfully:', response.data);
      setErrorMessage('');
      setSuccessMessage('Data Updated successfully.');

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
      {isDataLoaded ? ( // Render the form only if data is loaded

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
              type="hidden"
              id="editid"
              className="w-full border border-blue-300 rounded px-3 py-2 focus:text-blue-500"
              value={editid}
              onChange={(e) => setEditId(e.target.value)}
             
            />
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

        ) : (
          // Render a loading indicator while data is being fetched
          <div>Loading...</div>
        )}

      </div>
    </div>
  );
}

export default CategoryEdit;
