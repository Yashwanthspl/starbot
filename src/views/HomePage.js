import React, { useState } from "react";
import { askGranite } from "../api/granite";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import CircularProgress from '@mui/material/CircularProgress';

function HomePage() {
  const [userInput, setUserInput] = useState("");
  const [botReply, setBotReply] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!userInput.trim()) return;
    setLoading(true);
    const reply = await askGranite(userInput);
    setBotReply(reply);
    setLoading(false);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static" color="primary" elevation={2}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
            StarBot
          </Typography>
          <Typography variant="subtitle2" sx={{ opacity: 0.7 }}>
            Crisis Intervention Assistant
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', p: 2 }}>
        <Paper elevation={6} sx={{ p: 4, maxWidth: 400, width: '100%', borderRadius: 4 }}>
          <Typography variant="h5" gutterBottom fontWeight={600} align="center">
            How are you feeling today?
          </Typography>
          <Typography variant="body1" color="text.secondary" align="center" gutterBottom>
            Let me support you.
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type your concern..."
              disabled={loading}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSend}
              disabled={loading || !userInput.trim()}
              sx={{ minWidth: 90 }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Send'}
            </Button>
          </Box>
          <Box sx={{ minHeight: 56, mt: 3 }}>
            <Fade in={!!botReply && !loading} timeout={600}>
              <Box>
                {botReply && !loading && (
                  <Typography variant="body1" sx={{ mt: 1 }}><strong>Bot:</strong> {botReply}</Typography>
                )}
              </Box>
            </Fade>
            {loading && (
              <Fade in={loading} timeout={400}>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}><em>Typing...</em></Typography>
              </Fade>
            )}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

export default HomePage;
