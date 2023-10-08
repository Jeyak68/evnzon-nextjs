import React, { useState,useRef  } from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import axios from 'axios'; 
import { useRouter } from 'next/router';

function ServiceEdit() {
  const [serviceName, setServiceName] = useState('');
  const [priceName, setPriceName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [orderName, setOrderName] = useState('');

  
  const [selectedValue, setSelectedValue] = useState('active');
  const router = useRouter();
  const categoryRef = useRef(null);
  const districtRef = useRef(null);
  const unionRef = useRef(null);

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedCategory = categoryRef.current.value;
    const selectedDistrict = districtRef.current.value;
    const selectedUnion = unionRef.current.value;

    // Create an object with the form data
    const formData = {
      serviceName,
      priceName,
      phoneNumber,
      orderName,
      selectedValue,
      selectedCategory,
      selectedDistrict,
      selectedUnion,
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
    router.push('/services');

  };

  return (
    <div className="container mx-auto">
      <Typography variant="h5" className="pb-4">
        <Link href="/services" target="">
          Manage Services - Edit
        </Link>
      </Typography>

      <div className="bg-gray-200 w-full sm:w-2/4 p-6 rounded-lg">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="servicename" className="block font-medium pb-2"  >
              Serice Name
            </label>
            <input
              type="text"
              id="servicename"
              className="w-full border border-blue-300 rounded px-3 py-2 focus:text-blue-500"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              placeholder="Enter Service Name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="dropdown" className="block font-medium pb-2">
              Category
            </label>
            <select
              id="categoryid"
              className="w-full border border-blue-300 rounded px-3 py-2 focus:text-blue-500"
              ref={categoryRef} // Attach the ref to the dropdown
            >
             <option value="">Select Category</option>
              <option value="1">Decration</option>
              <option value="2">Wedding Hall</option>
              <option value="3">Food</option>
              <option value="4">Ice Cream</option>
              <option value="5">Photography</option>
              <option value="6">Make UP</option>
              <option value="7">Wedding Cards</option>
            </select>
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
          <div className="mb-4">
            <label htmlFor="pricename" className="block font-medium pb-2">
            Starting From Price*
            </label>
            <input
              type="text"
              id="pricename"
              className="w-full border border-blue-300  rounded px-3 py-2 focus:text-blue-500"
              value={priceName}
              onChange={(e) => setPriceName(e.target.value)}
              placeholder="Enter Price Amount"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phonenumber" className="block font-medium pb-2">
            Service Phone*
            </label>
            <input
              type="text"
              id="phonenumber"
              className="w-full border border-blue-300  rounded px-3 py-2 focus:text-blue-500"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter Phone Number"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="ordername" className="block font-medium pb-2">
            Service Order (Ex:- 1 or 2 or 3)*
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

export default ServiceEdit