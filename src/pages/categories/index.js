// ** MUI Imports

import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';

// ** Demo Components Imports
// import TableBasic from 'src/views/tables/TableBasic'
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
      

      <Grid item xs={12}>
        <Card>
          
          <Category />
        </Card>
      </Grid>
     
    </Grid>
  )
}

export default MUITable
