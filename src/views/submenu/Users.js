import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/router';
import axios from 'axios';



// const rows = [
//   {
//     id: 1,
//     name: 'vinothcl',
//     email: 'clvinoth@gmail.com',
//   },
//   {
//     id: 2,
//     name: 'guna',
//     email: 'gunasekaran7398@gmail.com',
//   },
// ];



const Users = () => {

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

  const handleDelete = () => {
    // Perform the delete operation here, e.g., send a delete request to your API
    console.log(`Delete clicked for row with ID ${selectedItemId}`);

    // Close the confirmation dialog
    closeDeleteDialog();
  };

  useEffect(() => {
    // Fetch data from the API when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://sibiselva2000.pythonanywhere.com/api/get_users', {
      method: 'POST', // Set the HTTP method to POST
        headers: {
          'Content-Type': 'application/json',
        },
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
    { field: 'name', headerName: 'Name', width: 250 , headerClassName: 'header-bold header-black',},
    { field: 'district', headerName: 'District', width: 250 , headerClassName: 'header-bold header-black',},
    { field: 'city', headerName: 'City', width: 250 , headerClassName: 'header-bold header-black',},
    { field: 'mobile', headerName: 'Mobile', width: 250 , headerClassName: 'header-bold header-black',},
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
  router.push(`/users/users_edit?id=${id}`);

};

  return (
    <>
      <div style={{ height: 200, width: '100%' }}>
        <DataGrid
          rows={apiData}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
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

export default Users;
