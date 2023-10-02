import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ViewIcon from '@mui/icons-material/Visibility';

const columns = [
  { field: 'servicename', headerName: 'Service Name', width: 200 ,headerClassName: 'header-bold'},
  { field: 'category', headerName: 'Category', width: 200 ,headerClassName: 'header-bold'},
  { field: 'location', headerName: 'Location', width: 200 ,headerClassName: 'header-bold'},
  { field: 'status', headerName: 'Status', width: 150 },
  {
    field: 'action',
    headerName: 'Action',
    width: 150,
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
        >
          <EditIcon />
        </IconButton>
        <IconButton
          aria-label="Delete"
          onClick={() => handleDelete(params.id)}
        >
          <DeleteIcon />
        </IconButton>
      </>
    ),
  },
];


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

const handleEdit = (id) => {
  // Add your edit logic here
  console.log(`Edit clicked for row with ID ${id}`);
};

const handleDelete = (id) => {
  // Add your delete logic here
  console.log(`Delete clicked for row with ID ${id}`);
};

const handleView = (id) => {
    // Add your delete logic here
    console.log(`Delete clicked for row with ID ${id}`);
  };

const Service = () => {
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
    </>
  );
};

export default Service;
