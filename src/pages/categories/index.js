// ** MUI Imports

import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';

// ** Demo Components Imports
import Category from 'src/views/submenu/Category'


const MUITable = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>
          <Link href='' target='_blank'>
            Manage Category
          </Link>
        </Typography>
      </Grid>

            <Grid container spacing={6} >
                <Grid item xs={8}>
                </Grid>
                <Grid item xs={4} >
                  <div className = "text-right">
                  <Link href='/categories/category_add' target=''>
                <button className="btn btn-lg px-6 py-3 text-sm text-white rounded-full bg-blue-800 hover:bg-blue-700 text-right">
                    Add Category
                  </button>
                  </Link>

                  </div>
                </Grid>
            </Grid>
      <Grid item xs={12}>
        <Card>
          
          <Category />
        </Card>
      </Grid>
     
    </Grid>
  )
}

export default MUITable
