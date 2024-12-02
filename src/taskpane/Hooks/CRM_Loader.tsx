


import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { styled, keyframes } from '@mui/system';


const colorChange = keyframes`
  0% { stroke: #ff0000; }
  14% { stroke: #ff7f00; }
  28% { stroke: #ffff00; }
  42% { stroke: #00ff00; }
  56% { stroke: #0000ff; }
  70% { stroke: #4b0082; }
  84% { stroke: #8b00ff; }
  100% { stroke: #ff0000; }
`;

// Create a styled CircularProgress with the color change animation
const MultiColorCircularProgress = styled(CircularProgress)({
    'circle': {
        animation: `${colorChange} 3s linear infinite`,
    },
});


interface BackdropLoaderProps {
    open: boolean; // Define the open prop
}

const CRM_Loader: React.FC<BackdropLoaderProps> = ({ open }) => {
    const handleClose = () => { };

    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={handleClose}
        >
            <MultiColorCircularProgress />
        </Backdrop>
    );
}

export default CRM_Loader;
