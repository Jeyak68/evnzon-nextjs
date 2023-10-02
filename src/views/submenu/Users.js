import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const columns = [
   { field: 'name', headerName: 'Name', width: 250 ,headerClassName: 'header-bold'},
   { field: 'email', headerName: 'Email', width: 250 },
  {
    field: 'action',
    headerName: 'Action',
    width: 150,
    renderCell: (params) => (
      <>
       
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
    name: 'vinothcl',
    email: 'clvinoth@gmail.com',
  },
  {
    id: 2,
    name: 'guna',
    email: 'gunasekaran7398@gmail.com',
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

const Users = () => {
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

export default Users;
