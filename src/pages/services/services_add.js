import React, { useState,useRef,useEffect  } from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import axios from 'axios'; 
import { useRouter } from 'next/router';


function ServiceAdd() {
  const [serviceName, setServiceName] = useState('');
  const [districtName, setDistrictName] = useState('');
  const [priceName, setPriceName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [direction, setDirection] = useState('');
  const [description, setDescription] = useState([{ Address: '', Chair: '' }]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  const router = useRouter();
  const categoryRef = useRef(null);
  const districtRef = useRef(null);

  const closeMessages = () => {
    setErrorMessage('');
    setSuccessMessage('');
  };

  useEffect(() => {
    fetchData();
    if (errorMessage || successMessage) {
      const timeoutId = setTimeout(() => {
        closeMessages();
        router.push('/services'); // Redirect to /categories after 4 seconds
      }, 2000); // 4000 milliseconds (4 seconds)
      
      // Clear the timeout when the component unmounts
      return () => clearTimeout(timeoutId);
    }

   
  }, [errorMessage, successMessage, router]);

  const fetchData = async () => {
    try {
      const response = await fetch('https://sibiselva2000.pythonanywhere.com/api/category_list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Response Body:', data.data);
  
        // Ensure that categories is always an array
        const fetchedCategories = data.data || [];
        
        // Update the state with the data fetched from the API
        setCategories(fetchedCategories);
  
        // Optional: You can also set a default selected category if needed.
        // For example, select the first category by default:
        if (fetchedCategories.length > 0) {
          categoryRef.current.value = fetchedCategories[0].id;
        }
      } else {
        // Handle the response if it's not okay (e.g., non-2xx status code)
        console.error('Error fetching data from API:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedCategory = categoryRef.current.value;

        const formData = new FormData();
        formData.append('description', JSON.stringify(description));
        formData.append('fromPrice', priceName);
        formData.append('location', districtName);
        formData.append('direction', direction);
        formData.append('mobile', phoneNumber);
        formData.append('name', serviceName);
        images.forEach((image) => {
          formData.append(`photos`, image);
        });
    

        formData.append('noofRatings', '2');
        formData.append('queries', '2');
        formData.append('ratings', '2');
        formData.append('totalRating', '2');
        formData.append('type', '2');
          formData.append('service_name', selectedCategory);

        console.log('data:', formData);
        try {
          // Send a POST request to the API endpoint with the FormData
          const response = await axios.post('https://sibiselva2000.pythonanywhere.com/api/add_service', formData, {
            headers: {
              'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
            },
          });
          console.log('Data sent successfully:', response);
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

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     if (file.size > 1024 * 1024 * 10) { // Check if the file size is greater than 10MB
  //       setErrorMessage('Image size is too large. Please choose a smaller image.');
  //       return;
  //     }
  
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       setImage(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleMultipleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);

    setImages([...images, ...selectedImages]);

    const selectedImagePreviews = selectedImages.map((image) => URL.createObjectURL(image));

    setPreviewImages([...previewImages, ...selectedImagePreviews]);
  };

 
  const handleCancel = () => {
    router.push('/services');

  };


  const handleAddInput = () => {
    setDescription([...description, { Address: '', Chair: '' }]);
  };

  const handleRemoveInput = (index) => {
    const updatedDescription = [...description];
    updatedDescription.splice(index, 1);
    setDescription(updatedDescription);
  };

  const handleInputChange = (index, field, value) => {
    const updatedDescription = [...description];
    updatedDescription[index][field] = value;
    setDescription(updatedDescription);
  };



  return (
    <div className="container mx-auto">
      <Typography variant="h5" className="pb-4">
        <Link href="/services" target="">
          Manage Services - Add
        </Link>
      </Typography>

      <div className="grid grid-cols-2 gap-4">

      <div className="bg-gray-200 w-full p-6 rounded-lg">
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
            <label htmlFor="servicename" className="block font-medium pb-2"  >
              Serice Name
            </label>
           
            <input
              type="text"
              name="serviceName"
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

             {categories.map((category) => (
      <option key={category.id} value={category.name}>
        {category.name}
      </option>
    ))}


            </select>
          </div>
        
          <div className="mb-4">
            <label htmlFor="districtname" className="block font-medium pb-2">
            Enter District Name*
            </label>
            <input
              type="text"
              id="districtname"
              className="w-full border border-blue-300  rounded px-3 py-2 focus:text-blue-500"
              value={districtName}
              onChange={(e) => setDistrictName(e.target.value)}
              placeholder="Enter District Name"
            />
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
            <label htmlFor="direction" className="block font-medium pb-2">
            Enter Direction*
            </label>
            <input
              type="text"
              id="direction"
              className="w-full border border-blue-300  rounded px-3 py-2 focus:text-blue-500"
              value={direction}
              onChange={(e) => setDirection(e.target.value)}
              placeholder="Direction"
            />
          </div>


    <div>
    <label htmlFor="description" className="block font-medium pb-2">
            Enter Description*
            </label>

      {description.map((input, index) => (
        <div key={index} className="flex items-center">
          <input
            type="text"
            placeholder=""
            value={input.Address}
            onChange={(e) => handleInputChange(index, 'Address', e.target.value)}
            className="mr-2 p-1 border border-gray-300 rounded w-44 h-10" 
          />
          <input
            type="text"
            placeholder=""
            value={input.Chair}
            onChange={(e) => handleInputChange(index, 'Chair', e.target.value)}
            className="mr-2 p-1 border border-gray-300 rounded"
          />
          {description.length > 1   && (
            <div className="pr-2">
            <button
              onClick={() => handleRemoveInput(index)}
              className="mt-2 p-1 bg-red-500 text-white rounded-full"
            >
              -
            </button>
            </div>
          )}
          {description.length > 0 && (
            <button
              onClick={() => handleAddInput(index)}
              className="mt-2 p-1 bg-green-500 text-white rounded-full"
            >
              +
            </button>
          )}
        </div>
      ))}

    </div>


          <div className="flex justify-end pt-4">
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
      
      <div className="bg-gray-200 w-full p-6 rounded-lg">
      {/* <div className="container mx-auto">
            <h1 className="block font-medium mb-2">Service Pic</h1>
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
          </div> */}
          <h1 className="block font-medium mb-2 pt-2">Multiple Image</h1>
          <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleMultipleImageChange}
            />
          <div>
              {previewImages.map((image, index) => (
                <img key={index} src={image} alt={`Preview ${index}`} />
              ))}
            </div>
        </div>
      </div>
    
    </div>
  );
}

export default ServiceAdd;
