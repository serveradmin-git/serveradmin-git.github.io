

import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { styled, keyframes } from '@mui/system';

// Define the keyframes for the color change animation
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

export default function SimpleBackdrop() {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
        setTimeout(() => {
            setOpen(false);
        }, 3000); // 3 seconds
    };

    React.useEffect(() => {
        handleOpen();
    }, []);

    return (
        <Backdrop
            sx={{
                color: '#000',
                backgroundColor: '#fff',
                zIndex: (theme) => theme.zIndex.drawer + 1
            }}
            open={open}
        >
            <MultiColorCircularProgress />
        </Backdrop>
    );
}
