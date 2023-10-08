import React, { useState, useEffect } from 'react';

const Category = () => {
  const [apiData, setApiData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Fetch data from the API when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/list');
      const data = await response.json();
      // Update the state with the data fetched from the API
      setApiData(data);
    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
  };

  // ...

  // Replace the 'rows' constant with the 'apiData' state variable
  const columns = [
    { field: 'categoryname', headerName: 'Category Name', width: 280, headerClassName: 'header-bold' },
    // ... other columns
  ];

  return (
    <>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={apiData} // Use the 'apiData' state variable here
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
