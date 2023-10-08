import React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useRouter } from 'next/router';

const Breadcrumb = () => {
  const router = useRouter();
  const pathSegments = router.asPath.split('/').filter((segment) => segment !== '');

  return (
    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
      <Link color="inherit" href="/">
        Home
      </Link>
      {pathSegments.map((segment, index) => (
        <Link key={index} color="inherit" href={`/${pathSegments.slice(0, index + 1).join('/')}`}>
          {segment}
        </Link>
      ))}
    </Breadcrumbs>
  );
};

export default Breadcrumb;
