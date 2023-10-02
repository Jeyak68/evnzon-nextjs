import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const columns = [
   { field: 'unionname', headerName: 'Union Name', width: 250 ,headerClassName: 'header-bold'},
   { field: 'district', headerName: 'Status', width: 250 },
  { field: 'status', headerName: 'Status', width: 250 },
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
    unionname: 'Velachery',
    district: 'Chennai',
    status: 'Active',
  },
  {
    id: 2,
    unionname: 'Tiruttani',
    district: 'Tiruvallur',
    status: 'Active',
  },
  {
    id: 3,
    unionname: 'Tiruchengode',
    district: 'Namakkal',
    status: 'Active',
  },
  {
    id: 4,
    unionname: 'Sulur',
    district: 'Coimbatore',
    status: 'Active',
  },
  {
    id: 5,
    unionname: 'Pollachi',
    district: 'Coimbatore',
    status: 'Active',
  },
  {
    id: 6,
    unionname: 'Perundhurai',
    district: 'Erode',
    status: 'Active',
  },
  {
    id: 7,
    unionname: 'Mettupalayam',
    district: 'Coimbatore',
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

const Unions = () => {
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

export default Unions;
