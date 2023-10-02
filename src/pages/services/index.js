// ** MUI Imports

import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'

// ** Demo Components Imports
import Service from 'src/views/submenu/Service'


const MUITable = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>
          <Link href='' target='_blank'>
            Manage Services
          </Link>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Card>
          
          <Service />
        </Card>
      </Grid>
     
    </Grid>
  )
}

export default MUITable
