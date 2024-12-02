





import React, { useState } from 'react';
import { ListItem, ListItemButton, ListItemText, FormLabel, Button } from '@mui/material';
import { ArchiveOutlined } from '@mui/icons-material';
import LeadArchiveAPI from '../../../Services/Signify_API/LeadArchiveAPI';
import { RedirectLead_URL } from '../../../Oauth/Redirect_URL';
import Toast from '../../../SignifyToast/Toast';
import { useNavigate } from 'react-router-dom';

export const CalendarLeadList = ({ leads, totalCount }) => {
    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastSeverity, setToastSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success');
    const navigate = useNavigate();

    const redirectLeadURL = RedirectLead_URL();

    const handleLeadURLClick = (id) => {
        // Open the URL in a new tab
        window.open(redirectLeadURL + id, '_blank');
    };

    const handleCloseToast = () => {
        setToastOpen(false);
    };

    const handleSelectLead = (id, firstName, lastName, module) => {
        const name = `${firstName} ${lastName}`;
        const selectLead = {
            Id: id,
            Name: name,
            Module: module
        };
        navigate('/CalendarHome', { state: { listVaue: selectLead } });
    };

    return (
        <>
            <Toast
                open={toastOpen}
                message={toastMessage}
                severity={toastSeverity}
                onClose={handleCloseToast}
            />
            <FormLabel sx={{ ml: 2, color: "black", fontWeight: "bold" }}> Leads ({totalCount})</FormLabel>
            {leads.map((lead) => (
                <ListItem key={lead.id.value}>
                    <ListItemButton>
                        <ListItemText onClick={() => handleLeadURLClick(lead.name_value_list.id.value)} sx={{ color: "Blue" }} primary={`${lead.name_value_list.first_name.value} ${lead.name_value_list.last_name.value}`} />
                        <Button variant="outlined" onClick={() => handleSelectLead(lead.name_value_list.id.value, lead.name_value_list.first_name.value, lead.name_value_list.last_name.value, lead.module_name)} sx={{ color: "#6074ac" }}>Select</Button>
                    </ListItemButton>
                </ListItem>
            ))}
        </>
    );
};

export default CalendarLeadList;
