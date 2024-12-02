import React, { useState } from 'react';
import { ListItem, ListItemButton, ListItemText, FormLabel, Button } from '@mui/material'
import { ArchiveOutlined } from '@mui/icons-material';
import GetName from '../../../Utilty/GetName';
import GetEmailBody from '../../../Utilty/GetEmailBody';
import OpportunityArchiveAPI from '../../../Services/Signify_API/OpportunityArchiveAPI';
import { RedirectOpportunity_URL } from '../../../Oauth/Redirect_URL';
import Toast from '../../../SignifyToast/Toast';
import { useNavigate } from 'react-router-dom';
let getOpportunityList;
export const CalendarOpportunityList = ({ opportunities, totalCount }) => {
    const navigate = useNavigate();
    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastSeverity, setToastSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success');

    const handleArchiveClick = async (id) => {


        try {
            await OpportunityArchiveAPI(id);
            setToastMessage('Opportunity archived successfully!');
            setToastSeverity('success');
            setToastOpen(true);
        } catch (error) {
            setToastMessage(`Failed to archive Opportunity: ${error.message}`);
            setToastSeverity('error');
            setToastOpen(true);
        }
    };
    const handleCloseToast = () => {
        setToastOpen(false);
    };

    const redirectOpportunityURL = RedirectOpportunity_URL()

    const handleOpportunityURLClick = (id) => {
        // Open the URL in a new tab
        window.open(redirectOpportunityURL + id, '_blank');
    };


    const handleSelectOpportunity = (id, name, module) => {
        const selectOpportunity = {
            Id: id,
            Name: name,
            Module: module
        }
        getOpportunityList = selectOpportunity;
        navigate('/CalendarHome', { state: { listVaue: selectOpportunity } });
    }
    return (
        <>
            <Toast
                open={toastOpen}
                message={toastMessage}
                severity={toastSeverity}
                onClose={handleCloseToast}
            />
            <FormLabel sx={{ ml: 2, color: "black", fontWeight: "bold" }}>Opportunities ({totalCount})</FormLabel>
            {opportunities.map((opportunity) => (
                <ListItem key={opportunity.id.value} >
                    <ListItemButton>
                        <ListItemText sx={{ color: "Blue" }} primary={`${opportunity.name_value_list.name.value}`} onClick={() => handleOpportunityURLClick(opportunity.name_value_list.id.value)} />
                        <Button variant="outlined" onClick={() => handleSelectOpportunity(opportunity.name_value_list.id.value, opportunity.name_value_list.name.value, opportunity.module_name)} sx={{ color: "#6074ac" }}>Select</Button>

                    </ListItemButton>
                </ListItem>
            ))

            }

        </>
    )
}


