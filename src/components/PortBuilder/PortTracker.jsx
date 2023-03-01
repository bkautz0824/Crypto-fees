import * as React from 'react'
import axios from 'axios';
import styled from 'styled-components';
import {Button, Select, MenuItem, Box, Modal, TextField} from '@mui/material';
import {Container, Header, HeaderItem1, HeaderItem2, GraphContainer, HoldingsContainer} from '../../styles/PortfolioStyles'



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  // overflow: 'auto',
  display: "flex",
  flexDirection: "column"
};

let id = 0



const api = axios.create({baseURL: 'https://api.coinstats.app/public/v1/coins?skip=0&limit=100&currency=US'})
function PortTracker() {
  const [coins, setCoins] = React.useState([])
  const [selectedCoin, setSelectedCoin] = React.useState({
   
  })
  console.log(selectedCoin)
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true)
    setSelectedCoin({
      
    })
  };
  const handleClose = () => setOpen(false);


// const handleClick = () => {
//     api.get()
//     .then((res) =>{ 
   
//     setCoins(res.data.coins)})
//     .catch((err) => console.log(err))
// }

React.useEffect(() => {

  api.get()
  .then((res) => {
      console.log(res)
      setCoins(res.data.coins)
  })
  .catch(err => console.log(err))
}, [])



  return (
    <Container>
        <h1>PortTracker</h1>
    {/* <Button variant="contained" style={{width: "200px"}} onClick={handleClick} >Add New Coin</Button> */}
    

<Button onClick={handleOpen} variant={"contained"}>Add Coin</Button>
<Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    <Button>Buy</Button>
    <Button>Sell</Button>
    <Select 
      defaultValue={'Select'}
      style={{height: "5rem", width: "100%", justifyContent: "space-between", alignItems:"center"}}>
        <MenuItem value={"Select"}>
          {"Select"}
        </MenuItem>
      {coins.map((item) => {
            return (
                  <MenuItem 
                  value={item.name}
                  style={{justifyContent: "space-between", alignItems:"center", width: "100%", height: "4rem"}}
                  onClick={() => setSelectedCoin(item)}
                  >
                    {item.name}
                    <img src={`${item.icon}`} sx={{height: "5px", width: "100%", position: 'absolute'}}/>
                  </MenuItem>
            
            )
          })}


    </Select>
    <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%", marginTop: "2rem"}}>
      <TextField label={"Quantity"} type={"number"}/>
          
     
      <TextField label={"Price Per Coin"} type={"number"} value={selectedCoin ? Math.round(selectedCoin.price) : 0}/>
        
     
    </div>
   
  </Box>
</Modal>
    <Header>
      <HeaderItem1>
        <p>Current Balance</p>
        <h1>2,000</h1>
      </HeaderItem1>
      <HeaderItem2>
        <Button variant="contained">More</Button>
        <Button variant="contained">Add New</Button>
      </HeaderItem2>
     
    </Header>

    <GraphContainer>

    </GraphContainer>
    
    <HoldingsContainer>

    </HoldingsContainer>
    </Container>
  )
}

export default PortTracker