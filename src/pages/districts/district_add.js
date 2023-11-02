import React, { useState,useEffect  } from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import axios from 'axios'; 
import { useRouter } from 'next/router';
import TagsInput from 'react-tagsinput';

function DistrictAdd() {

  const router = useRouter();
  const [tags, setTags] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const closeMessages = () => {
    setErrorMessage('');
    setSuccessMessage('');
  };

  useEffect(() => {
    if (errorMessage || successMessage) {
      const timeoutId = setTimeout(() => {
        closeMessages();
        router.push('/districts'); // Redirect to /categories after 4 seconds
      }, 2000); // 4000 milliseconds (4 seconds)
      
      // Clear the timeout when the component unmounts
      return () => clearTimeout(timeoutId);
    }
  }, [errorMessage, successMessage, router]);

  const handleChange = (tags) => {
    setTags(tags);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (tags.length === 0) {
      setErrorMessage('Please enter at least one district.');
      setSuccessMessage(''); 
     
    }

    const formattedTags = [tags.join(', ')]; 

    // Send a POST request to the API endpoint with the formatted array
    const formData = new FormData();
    formData.append('city', JSON.stringify(formattedTags));
  
    try {
      // Send a POST request to the API endpoint with the FormData
      const response = await axios.post('https://sibiselva2000.pythonanywhere.com/api/add_city', formData, {
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
  


  const handleCancel = () => {
    router.push('/districts');

  };

  return (
    <div className="container mx-auto">
      <Typography variant="h5" className="pb-4">
        <Link href="/districts" target="">
          Manage District - Add
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

          <div className="bg-blue-100 p-4 rounded-lg"> {/* Apply the Tailwind CSS classes */}
          <TagsInput value={tags} onChange={handleChange} />
          <div className="mt-2">
            {/* Districts: {tags.join(', ')} */}
          </div>
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

export default DistrictAdd;
