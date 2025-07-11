import React, { useState } from 'react';
import { auth, googleProvider, signInWithPopup, signInAnonymously } from '../firebase';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';
import GoogleIcon from '@mui/icons-material/Google';
import Grow from '@mui/material/Grow';

function LoginPage({ onLogin }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await signInWithPopup(auth, googleProvider);
      onLogin(result.user);
    } catch (err) {
      setError('Google sign-in failed.');
    }
    setLoading(false);
  };

  const handleGuestLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await signInAnonymously(auth);
      onLogin(result.user);
    } catch (err) {
      setError('Guest sign-in failed.');
    }
    setLoading(false);
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      width: '100vw',
      bgcolor: 'background.default',
      background: 'linear-gradient(120deg, #1976d2 0%, #ff4081 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Animated background circles */}
      <Box sx={{
        position: 'absolute',
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}>
        <Box sx={{
          position: 'absolute',
          width: 320,
          height: 320,
          borderRadius: '50%',
          background: 'rgba(25, 118, 210, 0.18)',
          top: -80,
          left: -80,
          filter: 'blur(8px)',
          animation: 'float1 8s ease-in-out infinite',
        }} />
        <Box sx={{
          position: 'absolute',
          width: 220,
          height: 220,
          borderRadius: '50%',
          background: 'rgba(255, 64, 129, 0.15)',
          bottom: -60,
          right: -60,
          filter: 'blur(8px)',
          animation: 'float2 10s ease-in-out infinite',
        }} />
      </Box>
      <Grow in timeout={900}>
        <Paper elevation={10} sx={{
          p: { xs: 3, sm: 5 },
          maxWidth: 400,
          width: '90vw',
          borderRadius: 5,
          textAlign: 'center',
          backdropFilter: 'blur(12px)',
          background: 'rgba(255,255,255,0.92)',
          zIndex: 1,
        }}>
          <Avatar sx={{ width: 72, height: 72, mx: 'auto', mb: 2, bgcolor: 'primary.main', fontSize: 44, boxShadow: 3 }}>⭐</Avatar>
          <Typography variant="h3" fontWeight={900} color="primary" gutterBottom sx={{ letterSpacing: 1 }}>
            Welcome!
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Your safe space for support, comfort, and crisis help.
          </Typography>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            startIcon={<GoogleIcon />}
            onClick={handleGoogleLogin}
            disabled={loading}
            sx={{ mt: 4, mb: 2, fontWeight: 700, fontSize: 18, py: 1.5, borderRadius: 3, boxShadow: 2 }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign in with Google'}
          </Button>
          <Button
            fullWidth
            variant="outlined"
            color="secondary"
            onClick={handleGuestLogin}
            disabled={loading}
            sx={{ mb: 1, fontWeight: 700, fontSize: 18, py: 1.5, borderRadius: 3, boxShadow: 1 }}
          >
            Continue as Guest
          </Button>
          {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
        </Paper>
      </Grow>
      {/* Keyframes for floating animation */}
      <style>{`
        @keyframes float1 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(30px); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </Box>
  );
}

export default LoginPage; 