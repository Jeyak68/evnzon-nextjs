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
          <Link >
            Manage Services
          </Link>
        </Typography>
      </Grid>

      <Grid container spacing={6} >
                <Grid item xs={8}>
                </Grid>
                <Grid item xs={4} >
                  <div className = "text-right">
                  <Link href='/services/services_add' target=''>
                <button className="btn btn-lg px-6 py-3 text-sm text-white rounded-full bg-blue-800 hover:bg-blue-700 text-right">
                    Add Services
                  </button>
                  </Link>

                  </div>
                </Grid>
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
