

import { Search } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import EmailInput from '../../SignifyCRM_UI/SignifyCRM_Inputs/EmailInput'
import NameIput from '../../SignifyCRM_UI/SignifyCRM_Inputs/NameIput'
import { Box } from '@mui/material'
import SearchBtn from '../../SignifyCRM_UI/Signify_Button/SearchBtn'
import Clearbtn from '../../SignifyCRM_UI/Signify_Button/Clearbtn'
import Navbar from '../Navbar'
import GetEmailBody from '../../../Utilty/GetEmailBody'
import SearchAccount from '../../../Services/Signify_API/SearchAccount'
import SearchContact from '../../../Services/Signify_API/SearchContact'
import SearchLeads from '../../../Services/Signify_API/SearchLeads'
import SearchOpportunity from '../../../Services/Signify_API/SearchOpportunity'
import CRM_Loader from '../../../Hooks/CRM_Loader'

const FindInSignify = () => {
    const { getName, getEmailAddress } = GetEmailBody();
    const [searchTriggered, setSearchTriggered] = useState(false);
    const [savedFormData, setSavedFormData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingAccounts, setLoadingAccounts] = useState(false); // New state
    const [loadingContacts, setLoadingContacts] = useState(false); // New state
    const [loadingLeads, setLoadingLeads] = useState(false); // New state
    const [loadingOpportunities, setLoadingOpportunities] = useState(false); // New state
    const [formData, setFormData] = useState({
        name: getName,
        email: getEmailAddress,
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

    return (
        <>
            <Navbar />
            <p style={{ display: "flex", marginLeft: "15px" }}><Search /><span style={{ fontWeight: "bold", fontSize: "16px", paddingLeft: "4px" }}> Find in SignifyCRM</span></p>
            <hr />
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '90%', ml: 2 },
                }}
                noValidate
                autoComplete="off"
            >
                <EmailInput value={formData.email} onChange={(value) => handleInputChange('email', value)} />
                <NameIput value={formData.name} onChange={(value) => handleInputChange('name', value)} />
            </Box>
            <Box sx={{ mt: 3, mb: 3, ml: 2, '& button': { m: 1 } }}>
                <SearchBtn onClick={handleSearch} />
                <Clearbtn onClick={handleClear} />
            </Box>
            <hr />
            <Box sx={{ mt: 4, ml: 1 }}>
                {searchTriggered && savedFormData && (
                    <>
                        {Object.entries(savedFormData).map(([key, value]) => {
                            if (value) {
                                switch (key) {
                                    case 'Accounts':
                                        return <SearchAccount name={formData.name} email={formData.email} key={key} setLoading={setLoadingAccounts} />;
                                    case 'Contacts':
                                        return <SearchContact name={formData.name} email={formData.email} key={key} setLoading={setLoadingContacts} />;
                                    case 'Leads':
                                        return <SearchLeads name={formData.name} email={formData.email} key={key} setLoading={setLoadingLeads} />;
                                    case 'Opportunities':
                                        return <SearchOpportunity name={formData.name} key={key} setLoading={setLoadingOpportunities} />;
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
