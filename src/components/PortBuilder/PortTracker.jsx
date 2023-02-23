import React from 'react'
import axios from 'axios';
import styled from 'styled-components';
import {Button} from '@mui/material';
import {Container, Header, HeaderItem1, HeaderItem2, GraphContainer, HoldingsContainer} from '../../styles/PortfolioStyles'

const api = axios.create({baseURL: 'https://api.coinstats.app/public/v1/coins?skip=0&limit=100&currency=US'})
function PortTracker() {


const handleClick = () => {
    // api.get()
}

  return (
    <Container>
        <h1>PortTracker</h1>
    <Button variant="contained" style={{width: "200px"}} onClick={handleClick}>List coins</Button>
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