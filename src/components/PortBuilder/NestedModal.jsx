import * as React from 'react'
import {Button, Select, MenuItem, Box, Modal} from '@mui/material';

export default function NestedModal(props) {
    const [open, setOpen] = React.useState(false);
   
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    

    const style = props.style
    const coin = props.selectedCoin
    console.log(coin)
  
    return (
      <div>
        <Button onClick={handleOpen}>Edit Entry</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={{ ...style, width: 400 }}>
         
          </Box>
        </Modal>
      </div>
    );
  }