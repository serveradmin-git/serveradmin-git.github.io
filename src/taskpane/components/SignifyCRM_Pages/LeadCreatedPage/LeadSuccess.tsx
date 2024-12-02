import React, { useState } from 'react';
import { ListItem, ListItemButton, ListItemText, FormLabel, Button } from '@mui/material';
import { ArchiveOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import GetEmailBody from '../../../Utilty/GetEmailBody';
import Navbar from '../Navbar';
import LeadArchiveAPI from '../../../Services/Signify_API/LeadArchiveAPI';
import Toast from '../../../SignifyToast/Toast';
import { SuccessRedirectLead_URL } from '../../../Oauth/Redirect_URL';
import { getLeadId } from '../CreateLeadPage/CreateLeade';


const LeadSuccess = () => {
  const { getName } = GetEmailBody();
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastSeverity, setToastSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success');
  const createdLeadID = getLeadId();
  const handleArchiveClick = async () => {
    try {
      await LeadArchiveAPI(createdLeadID);
      setToastMessage('Lead archived successfully!');
      setToastSeverity('success');
      setToastOpen(true);
    } catch (error) {
      setToastMessage(`Failed to archive lead: ${error.message}`);
      setToastSeverity('error');
      setToastOpen(true);
    }
  };

  const successredirectLeadURL = SuccessRedirectLead_URL()

  const handleLeadURLClick = () => {
    // Open the URL in a new tab
    window.open(successredirectLeadURL, '_blank');
  };


  const handleCloseToast = () => {
    setToastOpen(false);
  };

  return (
    <>
      <Navbar />
      <Toast
        open={toastOpen}
        message={toastMessage}
        severity={toastSeverity}
        onClose={handleCloseToast}
      />
      <p style={{ color: "green", paddingLeft: "15px" }}>A Lead has been created successfully</p>
      <FormLabel sx={{ ml: 2, color: "black", fontWeight: "bold" }}>Lead</FormLabel>
      <ListItem >
        <ListItemButton>
          <ListItemText sx={{ color: "Blue" }} primary={getName} onClick={handleLeadURLClick} />
          <ArchiveOutlined onClick={handleArchiveClick} />
        </ListItemButton>
      </ListItem>
      <Link to="/Home">
        <Button variant="contained" sx={{ m: 2 }}>Back to Home</Button>
      </Link>
    </>
  );
}

export default LeadSuccess;
