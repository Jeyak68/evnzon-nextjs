// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/';
import SpeedIcon from '@mui/icons-material/Speed';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const navigation = () => {
  return [
    // {
    //   title: 'Dashboard',
    //   icon: HomeOutline,
    //   path: '/'
    // },

     {
      title: 'Login',
      icon: Login,
      path: '/pages/login',
      openInNewTab: true
    },
   
    {
      sectionTitle: 'Pages'
    },
      {
      title: 'Manage Categories',
      icon: SpeedIcon,
      path: '/categories'
    },
    {
      title: 'Manage Services',
      icon: ContentCopyIcon,
      path: '/services'
    },
    {
      title: 'Manage Banner',
      icon: ViewCarouselIcon,
      path: '/banner'
    },
    {
      title: 'Manage Districts',
      icon: LocationCityIcon,
      path: '/districts'
    },
    {
      title: 'Manage Unions',
      icon: AcUnitIcon,
      path: '/unions'
    },
    {
      title: 'Manage Users',
      icon: AccountCircleIcon,
      path: '/users'
    },
    // {
    //   title: 'Login',
    //   icon: Login,
    //   path: '/pages/login',
    //   openInNewTab: true
    // },
    // {
    //   sectionTitle: 'User Interface'
    // },
    // {
    //   title: 'Typography',
    //   icon: FormatLetterCase,
    //   path: '/typography'
    // },
    // {
    //   title: 'Icons',
    //   path: '/icons',
    //   icon: GoogleCirclesExtended
    // },
    // {
    //   title: 'Cards',
    //   icon: CreditCardOutline,
    //   path: '/cards'
    // },
    // {
    //   title: 'Tables',
    //   icon: Table,
    //   path: '/tables'
    // },
    // {
    //   icon: CubeOutline,
    //   title: 'Form Layouts',
    //   path: '/form-layouts'
    // }
  ]
}

export default navigation
