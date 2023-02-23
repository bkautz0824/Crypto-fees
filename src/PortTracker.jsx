import React from 'react'
import axios from 'axios';
import styled from 'styled-components';


const api = axios.create({baseURL: 'https://api.coinstats.app/public/v1/coins?skip=0&limit=100&currency=US'})
function PortTracker() {


const handleClick = () => {
    api.get()
}

  return (
    <div>
        PortTracker
    <button onClick={handleClick}>List coins</button>


    </div>
  )
}

export default PortTracker