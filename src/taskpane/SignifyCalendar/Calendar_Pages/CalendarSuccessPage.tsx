



import React from 'react';
import { ListItem, ListItemButton, ListItemText, FormLabel, Button } from '@mui/material'

import { Link, useLocation } from 'react-router-dom';
import CalendarNavbar from '../Calendar_UI/Calendar_Navbar/CalendarNavBar';
import { getModuleID } from '../CalendarServices/CalendarAPIs/PostCalendarAPI';

const CalendarSuccessPage = () => {
    const location = useLocation();
    const modeuleID = getModuleID()
    let Connect_Url = window.localStorage.getItem("connectUrl");

    let CRM_URL = Connect_Url;

    const formData = location.state.module;
    const subjectData = location.state.subject
    const successredirectModuleURL = `${CRM_URL}/index.php?module=${formData}&action=DetailView&record=${modeuleID}`;
    const handleMoubleURLClick = () => {
        // Open the URL in a new tab
        window.open(successredirectModuleURL, '_blank');
    };
    return (
        <>
            <CalendarNavbar />
            <p style={{ color: "green", paddingLeft: "15px" }}><span>A {formData} has been update successfully</span></p>
            <FormLabel sx={{ ml: 2, color: "black", fontWeight: "bold" }}>{formData}</FormLabel>
            <ListItem >
                <ListItemButton>
                    <ListItemText sx={{ color: "Blue" }} primary={subjectData} onClick={handleMoubleURLClick} />

                </ListItemButton>
            </ListItem>



        </>
    )
}

export default CalendarSuccessPage


