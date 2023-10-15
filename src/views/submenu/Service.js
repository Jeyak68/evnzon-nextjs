import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ViewIcon from '@mui/icons-material/Visibility';
import { useRouter } from 'next/router';


// const rows = [
//   {
//     id: 1,
//     servicename: 'Sri Gopal decoration',
//     category: 'DECORATION',
//     location: 'Chennai',
//     status: 'Active',
//   },
 
//   {
//     id: 2,
//     servicename: 'Spot Shot Event',
//     category: 'DECORATION',
//     location: 'Coimbatore',
//     status: 'Active',
//   },
//   {
//     id: 3,
//     servicename: 'NN Decorators',
//     category: 'DECORATION',
//     location: 'Chennai',
//     status: 'Active',
//   },
//   {
//     id: 4,
//     servicename: 'KSV Decorators',
//     category: 'DECORATION',
//     location: 'Chennai',
//     status: 'Active',
//   },
//   {
//     id: 5,
//     servicename: 'MD Decorators',
//     category: 'DECORATION',
//     location: 'Chennai',
//     status: 'Active',
//   },
// ];


const Service = () => {

  const [apiData, setApiData] = useState([]);

  const router = useRouter();
  const [selectedItemId, setSelectedItemId] = React.useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);

  const openDeleteDialog = (id) => {
    setSelectedItemId(id);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setSelectedItemId(null);
    setIsDeleteDialogOpen(false);
  };

useEffect(() => {
    // Fetch data from the API when the component mounts
    fetchData();
   // handleDelete();

   
  }, []);

  const handleDelete = async () => {

    try {

      const response = await fetch('http://127.0.0.1:8000/api/delete_service', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', // Set the content type to JSON
            },
            body: JSON.stringify({ id: selectedItemId, service_name:'decorations' }), // Send the data as JSON
          });


      if (response.ok) {
        // If the response status is OK (2xx), you can parse the response data
        const data = await response.json();
        console.log('API response data:', data);
        fetchData();
      } else {
        // Handle errors or non-OK responses here
        console.error('API request failed with status:', response.status);
  
      }
    } catch (error) {
      console.error('An error occurred while making the API request:', error);

    }

   
// Close the confirmation dialog
closeDeleteDialog();
router.push('/services'); 

};

const fetchData = async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/service_list', {
    method: 'POST', // Set the HTTP method to POST
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "service_name": "decorations"
      })

    });

    if (response.ok) {
      const data = await response.json();
      console.log('Response Body:', data.data);

      // Update the state with the data fetched from the API
      setApiData(data.data);
    } else {
      // Handle the response if it's not okay (e.g., non-2xx status code)
      console.error('Error fetching data from API:', response.statusText);
    }
  } catch (error) {
    console.error('Error fetching data from API:', error);
  }
};



  const columns = [
    { field: 'name', headerName: 'Service Name', width: 200 , headerClassName: 'header-bold header-black',  },
    { field: 'location', headerName: 'Location', width: 200 , headerClassName: 'header-bold header-black', },
    { field: 'mobile', headerName: 'Mobile No', width: 200 , headerClassName: 'header-bold header-black', },
    { field: 'fromPrice', headerName: 'Amount', width: 150, headerClassName: 'header-bold header-black',  },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      headerClassName: 'header-bold header-black',
      renderCell: (params) => (
        <>
          <IconButton
            aria-label="Edit"
            onClick={() => handleEdit(params.id)}
            style={{ color: 'blue' }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="Delete"
            onClick={() => openDeleteDialog(params.id)} 
            style={{ color: 'red' }}
          >
            <DeleteIcon />
          </IconButton>


        </>
      ),
    },
  ];

  const handleEdit = (id) => {
    // Add your edit logic here
    console.log(`Edit clicked for row with ID ${id}`);

    // Use the router here to navigate
    //router.push(`/edit?id=${id}`);
    router.push(`/services/services_edit?id=${id}`);

  };



  return (
    <>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={apiData}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 20]}
        />
      </div>
      {isDeleteDialogOpen && (
        <div className="delete-dialog">
          <div className="delete-dialog-content">
            <p>Are you sure you want to delete this item?</p>
            <button onClick={handleDelete}>Yes</button>
            <button onClick={closeDeleteDialog}>No</button>
          </div>
        </div>
      )}

    </>
  );
};

export default Service;
