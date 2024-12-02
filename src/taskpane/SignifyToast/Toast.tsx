import { Alert, Fade, Snackbar } from '@mui/material';
import React from 'react';

interface ToastProps {
  open: boolean;
  message: string;
  severity: 'success' | 'info' | 'warning' | 'error';
  onClose: () => void; // Add onClose prop for closing the Snackbar
}

const Toast: React.FC<ToastProps> = (props) => {
  // No need for state to manage the Transition, use directly in Snackbar
  return (
    <Snackbar
      open={props.open}
      TransitionComponent={Fade} // Use Fade directly here
      autoHideDuration={1000}
      onClose={props.onClose} // Call onClose function when Snackbar is closed
    >
      <Alert severity={props.severity}>{props.message}</Alert>
    </Snackbar>
  );
};

export default Toast;
