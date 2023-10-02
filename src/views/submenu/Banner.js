import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const columns = [
    { field: 'id', headerName: 'Order', width: 100 ,headerClassName: 'header-bold'},
 
  {
    field: 'image',
    headerName: 'Image',
    sortable: false,
    width: 280,
    renderCell: (params) => (
      <img
        src={params.row.image}
        alt="User Avatar"
        style={{ width: '100%', height: 'auto' }}
      />
    ),
  },
  { field: 'bannerlink', headerName: 'Banner Link', width: 350 ,headerClassName: 'header-bold'},
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
    image: '/images/decoration1.png',
    bannerlink: 'https://www.evnzon.com/search?category=178',
    status: 'Active',
  },
  {
    id: 2,
    bannerlink: 'https://www.evnzon.com/search?category=182',
    image: '/images/photograph1.png',
    status: 'Active',
  },
  {
    id: 3,
    bannerlink: 'https://www.evnzon.com/search?category=180',
    image: '/images/food1.png',
    status: 'Active',
  },
  {
    id: 4,
    bannerlink: 'https://www.evnzon.com/search?category=183',
    image: '/images/photo2.png',
    status: 'Active',
  },
  {
    id: 5,
    bannerlink: 'https://www.evnzon.com/service/sri-bridal-studio-in-coimbatore-north',
    image: '/images/bridal.png',
    status: 'Active',
  },
  {
    id: 6,
    bannerlink: 'https://www.evnzon.com/service/aara-bridal-studio-in-coimbatore-north',
    image: '/images/bridal2.png',
    status: 'Active',
  },
  {
    id: 7,
    bannerlink: 'https://www.evnzon.com/service/aara-bridal-studio-in-coimbatore-north',
    image: '/images/bridal3.png',
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

const Banner = () => {
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

export default Banner;
