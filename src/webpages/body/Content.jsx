import { Box, Button } from '@mui/material'
import React, { useState } from 'react'
import Header from './components/Header'
import Quote from './components/Quote'
import About from './components/About'
import Financials from './components/Financials'
import Forecasts from './components/Forecasts'
import Chatbot from './components/Chatbot'
import News from './components/News'



const Content = ({ stockData }) => {
  const [selectedCompany, setSelectedCompany] = useState(Object.keys(stockData)[0])
  const [showChat, setShowChat] = useState(false);

  return (
    <Box sx={{ marginTop: '90px', width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#F7FAFC'}}>
      <Box sx={{width: '90vw'}}>
        <Box sx={{ 
          display: 'flex', 
          gap: '1rem',
          padding: '1rem',
          
      
        }}>
          {Object.keys(stockData).map((symbol) => (
            <Button
              key={symbol}
              variant={selectedCompany === symbol ? "contained" : "outlined"}
              onClick={() => setSelectedCompany(symbol)}
              sx={{
                fontWeight: 'bold',
                minWidth: '120px',
                color: selectedCompany === symbol ? 'white' : 'black',
                backgroundColor: selectedCompany === symbol ? 'red' : 'transparent',
                borderColor: 'red',
                '&:hover': {
                  backgroundColor: selectedCompany === symbol ? '#d32f2f' : 'rgba(255, 0, 0, 0.04)',
                  borderColor: 'red'
                }
              }}
            >
              {symbol}
            </Button>
          ))}
        </Box>
        <Box>
          <Header data={stockData[selectedCompany]} />
          <Quote data={stockData[selectedCompany].quote} />
          <About data={stockData[selectedCompany].about} />
          <Financials data={stockData[selectedCompany].financials} />
          <Forecasts data={stockData[selectedCompany].forecasts} />
          <News data={stockData[selectedCompany].news} />
          <Chatbot showChat={showChat} setShowChat={setShowChat} />
        </Box>

      </Box>

    </Box>
  )
}

export default Content