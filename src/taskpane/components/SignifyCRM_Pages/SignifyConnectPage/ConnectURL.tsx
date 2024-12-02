
import React, { useEffect, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { Link, useNavigate } from "react-router-dom"
import CRM_Token from '../../../Oauth/CRM_Token';


let connectUrl = "";
const ConnectURL = () => {

    const [isCalendarMode, setIsCalendarMode] = useState(Boolean)

    const [url, setUrl] = useState('');
    const navigate = useNavigate()
    const LoginToken = CRM_Token()

    const handleConnect = () => {

        connectUrl = url;
        window.localStorage.setItem("connectUrl", url);
        navigate("/SignifySignin")
    };



    useEffect(() => {
        if (LoginToken) {
            // navigate("/Home")
            const checkOfficeContext = () => {
                if (Office.context.mailbox.diagnostics.hostName === "OutlookWebApp" || Office.context.mailbox.diagnostics.hostName === "Outlook") {
                    const item = Office.context.mailbox.item;
                    if (item) {
                        if (item.itemType === Office.MailboxEnums.ItemType.Appointment) {
                            // Navigate to "/" for calendar mode
                            navigate("/CalendarHome");
                        } else if (item.itemType === Office.MailboxEnums.ItemType.Message) {
                            // Navigate to "/Home" for mail mode
                            navigate("/Home");
                        } else {
                            console.log("Unknown mode or item type.");
                        }
                    } else {
                        console.log("No item context available.");
                    }
                } else {
                    console.log("Not running in Outlook.");
                }
            };
            checkOfficeContext();
        }
        else {
            navigate("/")
        }
        // Call the function to check Office context


    }, []); // Empty dependency array ensures this effect runs only once on mount

    const handleCancel = () => {

        const BackUpToken = window.localStorage.getItem("Backup_Token");

        if (BackUpToken) {
            window.localStorage.setItem("API_Token", BackUpToken);
            navigate("/Home");
        } else {

            console.log("Please Add CRM Login Link");

            return;
        }
    };

    return (
        <>
            <Box sx={{ m: 2 }}>
                <TextField
                    size="small"
                    label="CRM URL"
                    variant="outlined"
                    sx={{ width: "auto" }}
                    style={{ width: "285px" }}
                    value={url}
                    // onChange={handleInputChange}
                    onChange={(e) => setUrl(e.target.value)}
                />
            </Box>

            <Button sx={{ ml: 2 }} variant="contained" onClick={handleConnect}>
                Connect
            </Button>
            <Button sx={{ ml: 5, color: "#6074ac" }} onClick={handleCancel}>
                Cancel
            </Button>


        </>

    );
};

export default ConnectURL;

export const connectURlValue = () => {
    // console.log("connectvalue:", connectUrl)
    return connectUrl

}

