import './App.css';
import React from 'react';
import CollapsibleTable from './components/CryptoFees/CryptoTableList.jsx';
import axios from 'axios';
import styled from 'styled-components';
import "@fontsource/nova-flat"
import Particle from './components/Particle';
import moment from 'moment';


const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
/* background-image: linear-gradient(to right, #1371fd 0%, #e16415 100%); */

`

const Header = styled.div`
margin-top: 5rem;
height: 20vh;
align-items: center;
justify-content: center;
font-size: 5rem;
font-family: "Nova Flat";
color: white;
`

const api = axios.create({baseURL: 'https://api.cryptostats.community/api/v1/fees/'})

function App() {

  const date = (moment(new Date()).subtract(1, 'd').format('YYYY-MM-DD'))
  const [data, setData] = React.useState([])

  console.log(date)
  
  const fetchApi = async () => {
    await api.get(`oneDayTotalFees/${date}`, null,
    )
    .then((res) => {
        const array = res.data.data
        array.sort((a, b) => {
          return (b.results.oneDayTotalFees - a.results.oneDayTotalFees) 
        })
        console.log(array)
        setData(array)
    })
    .catch((err) => {
        console.log(err)
    })
}

  React.useEffect(() => {
    
    fetchApi();
  })
  

  return (
    <Container >
      <Particle/>
      <Header>
        Crypto Fees
      </Header>
      
      { data && <CollapsibleTable data={data}/>}

    </Container>
  );
}

export default App;
