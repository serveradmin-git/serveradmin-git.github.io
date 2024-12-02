
import React, { useState, useEffect } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import { Box, Button, Checkbox, FormControlLabel } from '@mui/material';
import Navbar from '../Navbar';
import { Link } from 'react-router-dom';
import { GetUserData } from '../../../Oauth/GetUserData';
import Toast from '../../../SignifyToast/Toast';


const SignifySetting = () => {
    const { User_Name } = GetUserData()
    // Toast state
    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastSeverity, setToastSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success');
    // let conactURL = connectURlValue()
    const Connect_Url = window.localStorage.getItem("connectUrl");
    // console.log(Connect_Url)

    const [checkedItems, setCheckedItems] = useState({
        Leads: false,
        Contacts: false,
        Accounts: false,
        Opportunities: false
    });
    const [checkedItemNames, setCheckedItemNames] = useState([]);

    useEffect(() => {
        const storedCheckedItems = JSON.parse(localStorage.getItem('checkedItems'));
        if (storedCheckedItems) {
            setCheckedItems(storedCheckedItems);
            const checkedNames = Object.keys(storedCheckedItems).filter(key => storedCheckedItems[key]);
            setCheckedItemNames(checkedNames);
        }
    }, []);

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        const updatedCheckedItems = { ...checkedItems, [name]: checked };
        setCheckedItems(updatedCheckedItems);
    };

    const handleSave = () => {
        localStorage.setItem('checkedItems', JSON.stringify(checkedItems)); // Save to localStorage
        const checkedNames = Object.keys(checkedItems).filter(key => checkedItems[key]);
        setCheckedItemNames(checkedNames);

        // Show toast
        setToastMessage('Updated successfully');
        setToastSeverity('success');
        setToastOpen(true);
    };
    const handleChangeButtonClick = () => {
        // Remove token from localStorage
        window.localStorage.removeItem("API_Token");


    };
    return (
        <>
            <Navbar />
            <p style={{ display: "flex", marginLeft: "15px" }}>
                <SettingsIcon /><span style={{ fontWeight: "bold", fontSize: "16px", paddingLeft: "4px" }}> Connect to SignifyCRM</span>
            </p>
            <hr />
            <div style={{ padding: "5%" }}>

                <span style={{ color: "gray" }}>CRM URL</span>
                <Link to="/">
                    <Button style={{ marginLeft: "40%", top: "-10px" }} variant="outlined" onClick={handleChangeButtonClick}>Change</Button>
                </Link>
                <p style={{ marginTop: "-7px" }}>{Connect_Url}</p>
                <span style={{ color: "gray" }}>CURRENT USER</span>
                <p style={{ marginTop: "1px" }}>{User_Name}</p>


                <p style={{ fontWeight: "bold" }}>Please specify which module(s) to search inside SignifyCRM</p>




                <FormControlLabel
                    sx={{ marginTop: "-7px" }}
                    control={<Checkbox checked={checkedItems.Leads} onChange={handleCheckboxChange} name="Leads" />}
                    label="Leads"
                /><br />
                <FormControlLabel
                    sx={{ marginTop: "-7px" }}
                    control={<Checkbox checked={checkedItems.Contacts} onChange={handleCheckboxChange} name="Contacts" />}
                    label="Contacts"
                /><br />
                <FormControlLabel
                    sx={{ marginTop: "-7px" }}
                    control={<Checkbox checked={checkedItems.Accounts} onChange={handleCheckboxChange} name="Accounts" />}
                    label="Accounts"
                /><br />
                <FormControlLabel
                    sx={{ marginTop: "-7px" }}
                    control={<Checkbox checked={checkedItems.Opportunities} onChange={handleCheckboxChange} name="Opportunities" />}
                    label="Opportunities"
                /><br />
                <Box>
                    <Button variant='contained' sx={{ background: "#6074ac", width: "" }} onClick={handleSave}>Save</Button>
                    <Link to="/Home">
                        <Button variant='contained' sx={{ background: "#82909b", marginLeft: "15px" }}>Back to Home</Button>
                    </Link>
                </Box>

            </div>
            <Toast
                open={toastOpen}
                message={toastMessage}
                severity={toastSeverity}
                onClose={() => setToastOpen(false)}
            />
        </>
    );
}

export default SignifySetting;
