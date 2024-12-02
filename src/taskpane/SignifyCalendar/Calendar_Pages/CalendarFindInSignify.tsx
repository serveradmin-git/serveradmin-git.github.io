

import { Search } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'

import CalendarEmailInput from '../Calendar_UI/Calendar_Inputs/CalendarEmailInput'
import CalendarNameIput from '../Calendar_UI/Calendar_Inputs/CalendarNameInput'
import CalendarSearchLeads from '../CalendarServices/CalendarAPIs/CalendarSearchLeads'
import CalendarSearchOpportunity from '../CalendarServices/CalendarAPIs/CalendarSearchOpportunity'
import CalendarNavbar from '../Calendar_UI/Calendar_Navbar/CalendarNavBar'
import CalendarSearchBtn from '../Calendar_UI/Calendar_Buttons/CalendarSearchBtn'
import CalendarClearbtn from '../Calendar_UI/Calendar_Buttons/CalendarClearBtn'
import CRM_Loader from '../../Hooks/CRM_Loader'
import CalendarSearchAccount from '../CalendarServices/CalendarAPIs/CalendarSearchAccount'
import CalendarSearchContact from '../CalendarServices/CalendarAPIs/CalendarSearchContact'

const FindInSignify = () => {
    const [searchTriggered, setSearchTriggered] = useState(false);
    const [savedFormData, setSavedFormData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingAccounts, setLoadingAccounts] = useState(false); // New state
    const [loadingContacts, setLoadingContacts] = useState(false); // New state
    const [loadingLeads, setLoadingLeads] = useState(false); // New state
    const [loadingOpportunities, setLoadingOpportunities] = useState(false); // New state
    const [formData, setFormData] = useState({
        name: "",
        email: "",
    });

    const handleInputChange = (fieldName, value) => {
        setFormData({
            ...formData,
            [fieldName]: value
        });
    };

    const handleClear = () => {
        setFormData({
            name: '',
            email: ''
        });
        setSearchTriggered(false);
    };

    const handleSearch = () => {
        // setLoading(true);
        setSearchTriggered(true);
    };

    useEffect(() => {
        const savedFormData = JSON.parse(localStorage.getItem('checkedItems'));
        if (savedFormData) {
            setSavedFormData(savedFormData);
        }
    }, []);
    const OpportunitiesInputHidden = formData.email.trim().length > 0;

    return (
        <>
            <CalendarNavbar />
            <p style={{ display: "flex", marginLeft: "15px" }}><Search /><span style={{ fontWeight: "bold", fontSize: "16px", paddingLeft: "4px" }}> Find in SignifyCRM</span></p>
            <hr />
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '90%', ml: 2 },
                }}
                noValidate
                autoComplete="off"
            ><CalendarEmailInput value={formData.email} onChange={(value) => handleInputChange('email', value)} />
                <CalendarNameIput value={formData.name} onChange={(value) => handleInputChange('name', value)} />
            </Box>
            <Box sx={{ mt: 3, mb: 3, ml: 2, '& button': { m: 1 } }}>
                <CalendarSearchBtn onClick={handleSearch} />
                <CalendarClearbtn onClick={handleClear} />
            </Box>
            <hr />
            <Box sx={{ mt: 4, ml: 1 }}>
                {searchTriggered && savedFormData && (
                    <>
                        {Object.entries(savedFormData).map(([key, value]) => {
                            if (value) {
                                switch (key) {
                                    case 'Accounts':
                                        return <CalendarSearchAccount name={formData.name} email={formData.email} key={key} setLoading={setLoadingAccounts} />;
                                    case 'Contacts':
                                        return <CalendarSearchContact name={formData.name} email={formData.email} key={key} setLoading={setLoadingContacts} />;
                                    case 'Leads':
                                        return <CalendarSearchLeads name={formData.name} email={formData.email} key={key} setLoading={setLoadingLeads} />;
                                    case 'Opportunities':
                                        return <CalendarSearchOpportunity name={formData.name} key={key} setLoading={setLoadingOpportunities} hidden={OpportunitiesInputHidden} />;
                                    default:
                                        return null;
                                }
                            } else {
                                return null;
                            }
                        })}
                    </>
                )}
            </Box>
            <CRM_Loader open={loading || loadingAccounts || loadingContacts || loadingLeads || loadingOpportunities} />
        </>
    )
}

export default FindInSignify;
