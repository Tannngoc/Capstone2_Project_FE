import React, { useState } from 'react';
import { Container, Typography, TextField, IconButton, Button, Paper } from '@mui/material';
import { Chat, Close, Fullscreen, FullscreenExit } from '@mui/icons-material'; // Thêm biểu tượng Fullscreen


const Chatbot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false); // Trạng thái toàn màn hình
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    if (isChatOpen) {
      setIsFullscreen(false); // Đóng chế độ toàn màn hình khi chat đóng
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { text: message, sender: 'user' }]);
      // Giả lập phản hồi từ chatbot
      setMessages(prevMessages => [
        ...prevMessages,
        { text: `Bot: ${message}`, sender: 'bot' }
      ]);
      setMessage('');
    }
  };

  return (
    <>
      <IconButton className="chat-icon" onClick={toggleChat} style={{ position: 'fixed', bottom: 20, right: 20, color: 'red' }}>
        <Chat />
      </IconButton>
      {isChatOpen && (
        <Paper className={`chatbot-container ${isFullscreen ? 'fullscreen' : ''}`} elevation={3}>
          <div className="chatbot-header">
            <Typography variant="h6" className="chatbot-title">Chatbot</Typography>
            <div>
              <IconButton className="fullscreen-button" onClick={toggleFullscreen}>
                {isFullscreen ? <FullscreenExit sx={{color:'white'}} /> : <Fullscreen sx={{color:'white'}} />} {/* Biểu tượng phóng to hoặc thoát */}
              </IconButton>
              <IconButton className="close-button" onClick={toggleChat}>
                <Close sx={{color:'white'}} />
              </IconButton>
            </div>
          </div>
          <Container className="chatbot-body">
            {messages.map((msg, index) => (
              <Container key={index} className={`chatbot-message ${msg.sender}`}>
                <Typography>{msg.text}</Typography>
              </Container>
            ))}
          </Container>
          <Container className="chatbot-input">
            <TextField 
              type="text" 
              placeholder="Type your message..." 
              value={message} 
              onChange={(e) => setMessage(e.target.value)} 
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} 
              variant="outlined"
              fullWidth
              size="small" 
              InputProps={{
                style: { border: '1px solid red' },
                disableRipple: true 
              }}
              InputLabelProps={{
                style: { color: 'red' }
              }}
            />
            <Button onClick={handleSendMessage} size="small" style={{ border: '1px solid red', backgroundColor: 'white', color: 'red' }}>Send</Button>
          </Container>
        </Paper>
      )}
    </>
  );
}

export default Chatbot;
