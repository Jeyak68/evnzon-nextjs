import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/router';



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

const Banner = () => {

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
    { field: 'id', headerName: 'Order', width: 100 , headerClassName: 'header-bold header-black',},
 
  {
    field: 'image',
    headerName: 'Image',
    sortable: false,
    width: 280,
    headerClassName: 'header-bold header-black',
    renderCell: (params) => (
      <img
        src={params.row.image}
        alt="User Avatar"
        style={{ width: '100%', height: 'auto' }}
      />
    ),
  },
  { field: 'bannerlink', headerName: 'Banner Link', width: 350 , headerClassName: 'header-bold header-black',},
  { field: 'status', headerName: 'Status', width: 150, headerClassName: 'header-bold header-black', },
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
  router.push(`/banner/banner_edit?id=${id}`);

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

export default Banner;
