import React, { useEffect, useState } from 'react';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';

// MUI Components
import {
  Box,
  Typography,
  Link,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import CircularProgress from '@mui/material/CircularProgress';

// MUI Icons
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// Images
import caesLogo from '../assets/caes_logo.png';

// Brand Colors
import { PRIMARY_MAIN, SECONDARY_MAIN } from '../utilities/constants';

const LandingPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (auth.isLoading) return;
    if (auth.isAuthenticated) {
      navigate('/app', { replace: true });
    }
  }, [auth.isLoading, auth.isAuthenticated, navigate]);

  const handleSignIn = () => {
    setLoading(true);
    setTimeout(() => {
      auth.signinRedirect();
    }, 500);
  };

  if (auth.isLoading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000',
        }}
      >
        <CircularProgress size={50} thickness={5} sx={{ color: PRIMARY_MAIN }} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: '#000',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 4,
        }}
      >
        {/* CAES Logo */}
        <Box sx={{ mb: 4 }}>
          <img
            src={caesLogo}
            alt="UGA CAES Logo"
            style={{ height: '80px', width: 'auto' }}
          />
        </Box>

        {/* Title */}
        <Typography
          variant="h3"
          component="h1"
          sx={{
            color: '#fff',
            fontWeight: 'bold',
            mb: 2,
            textAlign: 'center',
          }}
        >
          PDF Accessibility Tool
        </Typography>

        {/* Subtitle */}
        <Typography
          variant="h6"
          component="h2"
          sx={{
            color: '#ccc',
            mb: 6,
            textAlign: 'center',
            maxWidth: '600px',
          }}
        >
          Remediate your PDF documents to meet WCAG 2.1 Level AA accessibility standards
        </Typography>

        {/* Login Button */}
        <LoadingButton
          variant="contained"
          size="large"
          endIcon={<ArrowForwardIosIcon />}
          onClick={handleSignIn}
          loading={loading}
          loadingIndicator={
            <CircularProgress size={24} sx={{ color: '#fff' }} />
          }
          sx={{
            backgroundColor: PRIMARY_MAIN,
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            px: 6,
            py: 2,
            borderRadius: '8px',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#8a0a26',
              transform: 'scale(1.02)',
            },
            transition: 'transform 0.2s, background-color 0.2s',
          }}
        >
          Sign In to Get Started
        </LoadingButton>
      </Box>

      {/* Footer with ASU Acknowledgment */}
      <Box
        sx={{
          borderTop: `3px solid ${PRIMARY_MAIN}`,
          backgroundColor: '#111',
          py: 3,
          px: 4,
          textAlign: 'center',
        }}
      >
        <Typography
          variant="body2"
          sx={{ color: '#888' }}
        >
          Built upon the open-source{' '}
          <Link
            href="https://github.com/ASUCICREPO/PDF_Accessibility"
            target="_blank"
            rel="noopener"
            sx={{ color: SECONDARY_MAIN }}
          >
            PDF Accessibility solution
          </Link>
          {' '}developed by the{' '}
          <Link
            href="https://smartchallenges.asu.edu/"
            target="_blank"
            rel="noopener"
            sx={{ color: SECONDARY_MAIN }}
          >
            Arizona State University AI Cloud Innovation Center
          </Link>
          , powered by AWS.
        </Typography>
      </Box>
    </Box>
  );
};

export default LandingPage;
