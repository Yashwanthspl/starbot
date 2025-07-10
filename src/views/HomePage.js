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
import Fab from '@mui/material/Fab';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Avatar from '@mui/material/Avatar';
import { blue, pink } from '@mui/material/colors';

function ChatBubble({ message, from }) {
  return (
    <Fade in timeout={400}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: from === 'user' ? 'flex-end' : 'flex-start',
          mb: 1.5,
        }}
      >
        {from === 'bot' && (
          <Avatar sx={{ bgcolor: blue[500], width: 32, height: 32, mr: 1 }}>🤖</Avatar>
        )}
        <Paper
          elevation={3}
          sx={{
            px: 2,
            py: 1,
            borderRadius: 3,
            maxWidth: '75%',
            bgcolor: from === 'user' ? pink[100] : 'background.paper',
            color: 'text.primary',
            fontSize: 16,
            boxShadow: from === 'user' ? 2 : 1,
          }}
        >
          {message}
        </Paper>
        {from === 'user' && (
          <Avatar sx={{ bgcolor: pink[400], width: 32, height: 32, ml: 1 }}>🧑</Avatar>
        )}
      </Box>
    </Fade>
  );
}

function HomePage({ mode, toggleColorMode }) {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'How are you feeling today? Let me support you.' }
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!userInput.trim()) return;
    const userMsg = { from: 'user', text: userInput };
    setMessages((msgs) => [...msgs, userMsg]);
    setUserInput("");
    setLoading(true);
    const reply = await askGranite(userInput);
    setMessages((msgs) => [...msgs, { from: 'bot', text: reply }]);
    setLoading(false);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        background: `linear-gradient(135deg, #1976d2 0%, #ff4081 100%)`,
        position: 'relative',
        pb: 6,
      }}
    >
      <AppBar position="static" color="transparent" elevation={0} sx={{ background: 'none', boxShadow: 'none', pt: 2 }}>
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1, fontWeight: 900, letterSpacing: 1, color: '#fff', textShadow: '0 2px 16px #0006' }}>
            StarBot
          </Typography>
          <Fab
            size="medium"
            color="secondary"
            aria-label="toggle theme"
            onClick={toggleColorMode}
            sx={{ ml: 2, boxShadow: 3 }}
          >
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </Fab>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '90vh',
          pt: 4,
        }}
      >
        <Paper
          elevation={8}
          sx={{
            p: 3,
            pt: 5,
            pb: 4,
            maxWidth: 420,
            width: '100%',
            borderRadius: 6,
            backdropFilter: 'blur(16px)',
            background: mode === 'dark'
              ? 'rgba(30,34,44,0.7)'
              : 'rgba(255,255,255,0.7)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            border: '1px solid rgba(255,255,255,0.18)',
            position: 'relative',
          }}
        >
          <Typography variant="h5" align="center" fontWeight={700} sx={{ mb: 2, color: 'primary.main' }}>
            Crisis Intervention Assistant
          </Typography>
          <Box sx={{ minHeight: 220, maxHeight: 320, overflowY: 'auto', mb: 2, pr: 1 }}>
            {messages.map((msg, idx) => (
              <ChatBubble key={idx} message={msg.text} from={msg.from} />
            ))}
            {loading && (
              <Fade in={loading} timeout={400}>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, mb: 1 }}>
                  <Avatar sx={{ bgcolor: blue[500], width: 32, height: 32, mr: 1 }}>🤖</Avatar>
                  <Paper elevation={1} sx={{ px: 2, py: 1, borderRadius: 3, bgcolor: 'background.paper', color: 'text.secondary', fontSize: 16 }}>
                    <CircularProgress size={18} sx={{ mr: 1 }} /> Typing...
                  </Paper>
                </Box>
              </Fade>
            )}
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              variant="outlined"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type your concern..."
              disabled={loading}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
              sx={{ bgcolor: 'background.paper', borderRadius: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSend}
              disabled={loading || !userInput.trim()}
              sx={{ minWidth: 90, fontWeight: 700 }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Send'}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

export default HomePage;
