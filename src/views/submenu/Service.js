import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ViewIcon from '@mui/icons-material/Visibility';
import { useRouter } from 'next/router';


const rows = [
  {
    id: 1,
    servicename: 'Sri Gopal decoration',
    category: 'DECORATION',
    location: 'Chennai',
    status: 'Active',
  },
 
  {
    id: 2,
    servicename: 'Spot Shot Event',
    category: 'DECORATION',
    location: 'Coimbatore',
    status: 'Active',
  },
  {
    id: 3,
    servicename: 'NN Decorators',
    category: 'DECORATION',
    location: 'Chennai',
    status: 'Active',
  },
  {
    id: 4,
    servicename: 'KSV Decorators',
    category: 'DECORATION',
    location: 'Chennai',
    status: 'Active',
  },
  {
    id: 5,
    servicename: 'MD Decorators',
    category: 'DECORATION',
    location: 'Chennai',
    status: 'Active',
  },
];


const Service = () => {

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


  const columns = [
    { field: 'servicename', headerName: 'Service Name', width: 200 , headerClassName: 'header-bold header-black',  },
    { field: 'category', headerName: 'Category', width: 200 , headerClassName: 'header-bold header-black', },
    { field: 'location', headerName: 'Location', width: 200 , headerClassName: 'header-bold header-black', },
    { field: 'status', headerName: 'Status', width: 150, headerClassName: 'header-bold header-black',  },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      headerClassName: 'header-bold header-black',
      renderCell: (params) => (
        <>
          <IconButton
            aria-label="View"
            onClick={() => handleView(params.id)}
          >
            <ViewIcon />
          </IconButton>
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

  const handleView = (id) => {
    // Add your delete logic here
    console.log(`Delete clicked for row with ID ${id}`);
  };


  return (
    <>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
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
