// ** MUI Imports
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
// import Banner2 from './images/food.jpg';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import Button from '@mui/material/Button';

const columns = [
  
  { field: 'categoryname', headerName: 'Category Name', width: 280, headerClassName: 'boldHeader' },  
  {
    field: 'image',
    headerName: 'Image',
    sortable: false,
    width: 200,
    renderCell: (params) => (
      <img
        src={params.row.image} // Use the 'image' field from your data
        alt="User Avatar"
        style={{ width: '100%', height: 'auto' }}
      />
    ),
    },
    { field: 'status', headerName: 'Status', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
     width: 150 ,
      renderCell: (params) => (
        <ActionMenu id={params.row.id} />
      ),
    },
 
];

const rows = [
  { id: 1,
    categoryname: 'Snow',
    image: '/images/avatars/1.png', 
    status: 'Active',
   
       },

];

function ActionMenu({ id }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton aria-controls={`menu-${id}`} aria-haspopup="true" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id={`menu-${id}`}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem> <Button variant="contained" onClick={() => handleEdit(id)} >Edit</Button></MenuItem>
        <MenuItem> <Button variant="contained" onClick={() => handleDelete(id)} >Delete</Button></MenuItem>
      </Menu>
    </>
  );
}

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
        // checkboxSelection
      />
    </div>
    
</>
  )
}

export default Category
