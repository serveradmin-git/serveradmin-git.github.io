

import React, { useState } from 'react';
import Navbar from '../Navbar';
import { ReceiptLong } from '@mui/icons-material';
import { Box } from '@mui/material';
import CancelBtn from '../../SignifyCRM_UI/Signify_Button/CancelBtn';
import SaveButton from '../../SignifyCRM_UI/Signify_Button/SaveButton';
import SubjectInput from '../../SignifyCRM_UI/SignifyCRM_Inputs/SubjectInput';
import TypeSelect from '../../SignifyCRM_UI/Signify_DropDown/TypeSelect';
import StatusSelect from '../../SignifyCRM_UI/Signify_DropDown/StatusSelect';
import RequestedDateInput from '../../SignifyCRM_UI/SignifyCRM_Inputs/RequestedDateInput';
import DueDateInput from '../../SignifyCRM_UI/SignifyCRM_Inputs/DueDateInput';
import { GetUserData } from '../../../Oauth/GetUserData';
import Toast from '../../../SignifyToast/Toast';
import GetAccountByNameAPI from '../../../Services/Signify_API/GetAccountByNameAPI';
import GetContactByNameAPI from '../../../Services/Signify_API/GetContactByNameAPI';
import CRM_Loader from '../../../Hooks/CRM_Loader';
import DueTime from '../../SignifyCRM_UI/SignifyCRM_Inputs/DueTime';
import CaseDescriptionInput from '../../SignifyCRM_UI/SignifyCRM_Inputs/CaseDescriptionInput';
import { useNavigate } from 'react-router-dom';
import CRM_Token from '../../../Oauth/CRM_Token';
import CRM_Url from '../../../Hooks/CRM_Url';
import CreateCaseCheckBox from '../../SignifyCRM_UI/Signify_CheckBox/CreateCaseCheckBox';

let CaseID;

const CreateCase = () => {
    const [bodyText, setBodyText] = useState('');
    const [subject, setSubject] = useState('');
    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastSeverity, setToastSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const API_URL = CRM_Url(); // Assuming CRM_Url is correctly imported and implemented elsewhere
    const LoginToken = CRM_Token(); // Assuming CRM_Token is correctly imported and implemented elsewhere
    const { API_Key, User_ID } = GetUserData(); // Assuming GetUserData is correctly imported and implemented elsewhere

    const navigateToCaseSuccess = () => {
        navigate('/CaseSuccess');
    };
    const account = localStorage.getItem("Account")
    console.log("account:", account)
    const contact = localStorage.getItem("Contact")
    console.log("Contact:", contact)

    const [formData, setFormData] = useState({
        subject: subject, // Initialize subject field
        account: account,
        type: '',
        status: '',
        requesteddate: '',
        duedate: '',
        contact: contact,
        duetime: '',
        description: '',
    });

    const handleInputChange = (fieldName, value) => {
        setFormData({
            ...formData,
            [fieldName]: value,
        });
    };

    const handleRequestedDateChange = ({ date }) => {
        handleInputChange('requesteddate', date);
    };

    const handleDueDateChange = ({ date }) => {
        handleInputChange('duedate', date);
    };




    const handleSave = () => {
        // Check if required fields are filled
        if (!formData.account || !formData.requesteddate || !formData.duedate || !formData.status || !formData.type || (formData.subject === "" ? !subject : !formData.subject)) {
            // If required fields are not filled, show a toast message
            setToastMessage('Please fill all required fields');
            setToastSeverity('warning');
            setToastOpen(true);
            return; // Exit the function early
        }
        setLoading(true);
        const Account_Id = localStorage.getItem('Account_Id');

        const Contact_Id = localStorage.getItem('Contact_Id');
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', `Bearer ${LoginToken}`);

        const raw = JSON.stringify({
            'Api-Key': API_Key,
            module_name: 'Cases',
            name_value_list: {
                assigned_user_id: User_ID,
                subject: subject, // Ensure formData.subject is correctly set
                type: formData.type,
                status: formData.status,
                description: formData.description,
                request_date: formData.requesteddate,
                due_date: formData.duedate,
                account_id: Account_Id,
                contact_id: Contact_Id,
                opportunity_id: '',
            },
        });

        const requestOptions: RequestInit = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        fetch(`${API_URL}set_entry`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result && result.data) {
                    const parsedData = JSON.parse(result.data);
                    const id = parsedData.id;
                    CaseID = id;
                    setToastMessage('Case created successfully');
                    setToastSeverity('success');
                    setToastOpen(true);
                }
            })
            .catch((error) => {
                console.error('API call failed:', error);
                setToastMessage('Error');
                setToastSeverity('error');
                setToastOpen(true);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleBodyTextChange = (text) => {
        setBodyText(text);
        handleInputChange('description', text);
    };

    const handleSubjectChange = (newSubject) => {
        setSubject(newSubject); // Update subject state
        handleInputChange('subject', newSubject); // Update formData.subject
    };

    function handleToastClose() {
        setToastOpen(false);
        if (toastSeverity === 'success') {
            navigateToCaseSuccess();
            // localStorage.removeItem("Contact")
            // localStorage.removeItem("Account")
        }
    }

    return (
        <>
            <Navbar />
            <p style={{ display: 'flex', marginLeft: '15px' }}>
                <ReceiptLong />
                <span style={{ fontWeight: 'bold', fontSize: '16px', paddingLeft: '4px' }}> Create Case</span>
            </p>
            <hr />
            <CreateCaseCheckBox onSubjectChange={handleSubjectChange} onBodyTextChange={handleBodyTextChange} />
            <Box
                component="form"
                sx={{ mb: 5, '& > :not(style)': { m: 1, width: '90%', ml: 2 } }}
                noValidate
                autoComplete="off"
            >
                {/* Pass handleSubjectChange function to SubjectInput */}
                <SubjectInput subject={subject} onChange={handleSubjectChange} />
                <GetAccountByNameAPI />
                <TypeSelect onChange={(value) => handleInputChange('type', value)} />
                <StatusSelect onChange={(value) => handleInputChange('status', value)} />
                <RequestedDateInput onChange={handleRequestedDateChange} />
                <DueDateInput onChange={(value) => handleInputChange('duedate', value)} />

                <DueTime onChange={(value) => handleInputChange('duetime', value)} />
                <GetContactByNameAPI />
                <CaseDescriptionInput bodyText={bodyText} onChange={handleBodyTextChange} />
            </Box>
            <hr />
            <Box sx={{ mt: 3, mb: 3, display: 'flex', justifyContent: 'flex-end', '& button': { m: 1 } }}>
                <CancelBtn />
                <SaveButton onClick={handleSave} />
            </Box>
            <CRM_Loader open={loading} />
            <Toast open={toastOpen} message={toastMessage} severity={toastSeverity} onClose={handleToastClose} />
        </>
    );
};

export default CreateCase;



export const getCaseId = () => {
    return CaseID
} 