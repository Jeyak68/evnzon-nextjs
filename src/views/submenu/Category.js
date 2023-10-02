import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const columns = [
  { field: 'categoryname', headerName: 'Category Name', width: 280 ,headerClassName: 'header-bold'},
  {
    field: 'image',
    headerName: 'Image',
    sortable: false,
    width: 200,
    renderCell: (params) => (
      <img
        src={params.row.image}
        alt="User Avatar"
        style={{ width: '100%', height: 'auto' }}
      />
    ),
  },
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
    categoryname: 'WEDDING HALLS',
    image: '/images/kalyanamandapam.jpg',
    status: 'Active',
  },
  {
    id: 2,
    categoryname: 'WEDDING CARDS',
    image: '/images/decoration.jpg',
    status: 'Active',
  },
  {
    id: 3,
    categoryname: 'PHOTOGRAPHY',
    image: '/images/photography.jpg',
    status: 'Active',
  },
  {
    id: 4,
    categoryname: 'MAKE UP',
    image: '/images/makeup.jpg',
    status: 'Active',
  },
  {
    id: 5,
    categoryname: 'ICE CREAM',
    image: '/images/icecream.jpg',
    status: 'Active',
  },
  {
    id: 6,
    categoryname: 'FOOD',
    image: '/images/food.jpg',
    status: 'Active',
  },
  {
    id: 7,
    categoryname: 'DECORATION',
    image: '/images/decoration.jpg',
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

const Category = () => {
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

export default Category;
