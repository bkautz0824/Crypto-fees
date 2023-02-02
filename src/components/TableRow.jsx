import React from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {Box, Collapse, IconButton, TableCell, TableRow} from '@mui/material';
import styled from 'styled-components';


const DropDownSection = styled.div`
margin: .5rem;
width: 100%;
/* flex-direction: column; */
`

const DropDownInfoSection = styled.div`
width: 90%;
display: flex;
flex-direction: row;
flex-wrap:wrap;
justify-content: space-between;
`

const InfoSectionItem = styled.div`
width: 12%;
margin: .5rem;
`

const Label = styled.label`
color: grey;
font-size: .75rem;
`

const Image = styled.img`
min-width: 1.5rem;
max-width: 2rem;
border-bottom: none;
`

function Row({data:{metadata, results}}) {
    const [open, setOpen] = React.useState(false);
    const toUpperCase = (string) => {
      const newString = string[0].toUpperCase() + string.substring(1)
      return newString
    }
    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell sx={{width:'10%'}}>
          <Image src={metadata.icon}></Image>
          </TableCell>
          <TableCell align="center" sx={{width: '15%'}}>{metadata.tokenTicker}</TableCell>
          <TableCell align="center" sx={{width: '35%'}}>{metadata.name} {metadata.subtitle}</TableCell>
          <TableCell align="center" sx={{width: '35%'}}>${(Math.round(results.oneDayTotalFees * 100)/100).toLocaleString("en-US")}</TableCell>
          <TableCell sx={{width:'10%'}}>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0}} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1, width:'100%',  display: 'flex',flexDirection:'column'}}>
                  <DropDownSection>{metadata.description}
                  </DropDownSection>
                  <DropDownSection>
                    <Label>Fee Model:</Label><br/>
                    {metadata.feeDescription}
                  </DropDownSection>
               
                 <DropDownInfoSection>
                  <InfoSectionItem ><Label>Website:</Label><br/><a href={metadata.website}>{metadata.website}</a></InfoSectionItem>
                  <InfoSectionItem ><Label>Blockchain:</Label><br/>{metadata.blockchain}</InfoSectionItem>
                  <InfoSectionItem ><Label>Category:</Label><br/>{toUpperCase(metadata.category)}</InfoSectionItem>
                  <InfoSectionItem ><Label>Date of Launch:</Label><br/>{metadata.protocolLaunch}</InfoSectionItem>
                 </DropDownInfoSection>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  

  export default Row;