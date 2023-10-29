import React, { useState,useRef,useEffect  } from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import axios from 'axios'; 
import { useRouter } from 'next/router';


function ServiceAdd() {
  const [serviceName, setServiceName] = useState('');
  const [priceName, setPriceName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [direction, setDirection] = useState('');
  const [description, setDescription] = useState([{ Address: '', Chair: '' }]);
  // const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [images, setImages] = useState([]);

  const [previewImages, setPreviewImages] = useState([]);

  // const [selectedValue, setSelectedValue] = useState('active');
  const router = useRouter();
  const categoryRef = useRef(null);
  const districtRef = useRef(null);

  const closeMessages = () => {
    setErrorMessage('');
    setSuccessMessage('');
  };

  useEffect(() => {
    if (errorMessage || successMessage) {
      const timeoutId = setTimeout(() => {
        closeMessages();
        router.push('/services'); // Redirect to /categories after 4 seconds
      }, 2000); // 4000 milliseconds (4 seconds)
      
      // Clear the timeout when the component unmounts
      return () => clearTimeout(timeoutId);
    }
  }, [errorMessage, successMessage, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedCategory = categoryRef.current.value;
    const selectedDistrict = districtRef.current.value;

        // Create a FormData object to send the file
        const formData = new FormData();
        formData.append('description', JSON.stringify(description));
        formData.append('fromPrice', priceName);
        //  formData.append('photos', image);
        //  formData.append('photos', '');
        formData.append('direction', direction);
        formData.append('mobile', phoneNumber);
        formData.append('name', serviceName);
        formData.append('location', selectedDistrict);
        // formData.append('photos', images1);
        images.forEach((image, index) => {
          formData.append(`photos${index}`, image);
        });
    

        formData.append('noofRatings', '2');
        formData.append('queries', '2');
        formData.append('ratings', '2');
        formData.append('totalRating', '2');
        formData.append('type', '2');
        formData.append('service_name', 'decorations');

        console.log('data:', formData);
        try {
          // Send a POST request to the API endpoint with the FormData
          const response = await axios.post('http://127.0.0.1:8000/api/add_service', formData, {
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
            {/* <input
              type="text"
              id="servicename"
              className="w-full border border-blue-300 rounded px-3 py-2 focus:text-blue-500"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              placeholder="Enter Service Name"
            /> */}
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

          {/* <div className="pt-4 pb-4">
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
            <div class="pr-2">
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
