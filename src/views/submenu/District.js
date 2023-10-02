import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const columns = [
   { field: 'districtname', headerName: 'District Name', width: 350 ,headerClassName: 'header-bold'},
  { field: 'status', headerName: 'Status', width: 150 },
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
    districtname: 'Chennai',
    status: 'Active',
  },
  {
    id: 2,
    districtname: 'Coimbatore',
    status: 'Active',
  },
  {
    id: 3,
    districtname: 'Erode',
    status: 'Active',
  },
  {
    id: 4,
    districtname: 'Namakkal',
    status: 'Active',
  },
  {
    id: 5,
    districtname: 'Tiruvallur',
    status: 'Active',
  },
  {
    id: 6,
    districtname: 'Ariyalur',
    status: 'Active',
  },
  {
    id: 7,
    districtname: 'Chengalpattu',
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

const District = () => {
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

export default District;
