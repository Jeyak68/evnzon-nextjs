import React, { useState,useRef  } from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import axios from 'axios'; 
import { useRouter } from 'next/router';

function UnionsEdit() {
  const [unionName, setUnionName] = useState('');

  
  const [selectedValue, setSelectedValue] = useState('active');
  const router = useRouter();
  const districtRef = useRef(null);

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedDistrict = districtRef.current.value;

    // Create an object with the form data
    const formData = {
      unionName,
      selectedValue,
      selectedDistrict,
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


  const handleRadioChange = (e) => {
    setSelectedValue(e.target.value);
  };


  const handleCancel = () => {
    router.push('/unions');

  };

  return (
    <div className="container mx-auto">
      <Typography variant="h5" className="pb-4">
        <Link href="/unions" target="">
          Manage Unions - Add
        </Link>
      </Typography>

      <div className="bg-gray-200 w-full sm:w-2/4 p-6 rounded-lg">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="unionname" className="block font-medium pb-2"  >
              Union Name
            </label>
            <input
              type="text"
              id="unionname"
              className="w-full border border-blue-300 rounded px-3 py-2 focus:text-blue-500"
              value={unionName}
              onChange={(e) => setUnionName(e.target.value)}
              placeholder="Enter Union Name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="dropdown" className="block font-medium pb-2">
              District
            </label>
            <select
              id="districtid"
              className="w-full border border-blue-300 rounded px-3 py-2 focus:text-blue-500"
              ref={districtRef} // Attach the ref to the dropdown
            >
            <option value="">Select District</option>
              <option value="1">Chennai</option>
              <option value="2">Coimbatore</option>
              <option value="3">Erode</option>
              <option value="4">Namakkal</option>
              <option value="5">Thiruvallur</option>
            </select>
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

export default UnionsEdit;
