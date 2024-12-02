import { Box } from '@mui/material'
import React, { useState } from 'react'
import CancelBtn from '../../SignifyCRM_UI/Signify_Button/CancelBtn'
import SaveButton from '../../SignifyCRM_UI/Signify_Button/SaveButton'
import Navbar from '../Navbar'
import { CreateNewFolderOutlined } from '@mui/icons-material'
import EmailInput from '../../SignifyCRM_UI/SignifyCRM_Inputs/EmailInput'
import OfficePhoneInput from '../../SignifyCRM_UI/SignifyCRM_Inputs/OfficePhoneInput'
import DescriptionInput from '../../SignifyCRM_UI/SignifyCRM_Inputs/DescriptionInput'
import NameIput from '../../SignifyCRM_UI/SignifyCRM_Inputs/NameIput'
import TypeSelect from '../../SignifyCRM_UI/Signify_DropDown/TypeSelect'
import IndustrySelect from '../../SignifyCRM_UI/Signify_DropDown/IndustrySelect'
import StatusSelect from '../../SignifyCRM_UI/Signify_DropDown/StatusSelect'
import { Link, useNavigate } from 'react-router-dom'
import GetEmailBody from '../../../Utilty/GetEmailBody'
import CRM_Url from '../../../Hooks/CRM_Url'
import CRM_Token from '../../../Oauth/CRM_Token'
import { GetUserData } from '../../../Oauth/GetUserData'
import Toast from '../../../SignifyToast/Toast'
import CRM_Loader from '../../../Hooks/CRM_Loader'



let AccountID;
const CreateAcount = () => {
    const [toastOpen, setToastOpen] = useState(false); // State to manage toast visibility
    const [toastMessage, setToastMessage] = useState(''); // State to manage toast message
    const [toastSeverity, setToastSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success'); // State to manage toast severity
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const API_URL = CRM_Url()
    const LoginToken = CRM_Token()
    const { API_Key, User_ID } = GetUserData()

    const navigateToAccountSuccess = () => {
        navigate('/AccountSuccess');
    };
    const { getEmailAddress, getName } = GetEmailBody();


    const [formData, setFormData] = useState({
        name: getName,
        type: '',
        industry: '',
        email: getEmailAddress,
        officephone: '',
        status: 'Active',
        description: '',

    });

    const handleInputChange = (fieldName, value) => {
        setFormData({
            ...formData,
            [fieldName]: value
        });
    };


    const handleSave = () => {
        // Check if required fields are filled
        if (!formData.type || !formData.name || !formData.industry || !formData.email) {
            // If required fields are not filled, show a toast message
            setToastMessage('Please fill all required fields');
            setToastSeverity('warning');
            setToastOpen(true);
            return; // Exit the function early
        }
        setLoading(true);
        // Create headers
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        //    myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE3MTY5NjQwMzUsImp0aSI6ImZ6OUZMTnJYdHlRNGljdE12eFdDZ3c9PSIsImlzcyI6Imh0dHBzOlwvXC9kZW1vLnNpZ25pZnljcm0ubmV0XC9vdXRsb29rLWFkZGluIiwibmJmIjoxNzE2OTY0MDM1LCJleHAiOjE3MTk1NTYwMzUsImRhdGEiOnsidXNlck5hbWUiOiJJbnRlci1TYWxlczAzIiwidXNlcklkIjoiNDdkZjY2MWQtYmNmZS00NTcwLTY2MjAtNWQ1YTgyYzIyNWI4In19.vrtRRwK7M3yt2mlVk9rms_LgxeEY35j_2JTl8suGbpAyp_lz-b3qRjCgtzZYWMtVfHPMMhBWanYSDlkLsxQgrg");
        myHeaders.append("Authorization", `Bearer ${LoginToken}`);
        // Create request payload
        const raw = JSON.stringify({
            "Api-Key": API_Key,
            module_name: "Accounts",
            "name_value_list": {
                "assigned_user_id": User_ID,
                "account_type": formData.type,
                "name": formData.name,
                "status": formData.status,
                "industry": formData.industry,
                "description": formData.description,
                "email1": formData.email,
                "phone_office": formData.officephone
            }
        });

        // Create request options
        const requestOptions: RequestInit = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        // Perform fetch request
        //  fetch("https://demo.signifycrm.net/outlook-addin/rest_api/v1/rest/set_entry", requestOptions)
        fetch(`${API_URL}set_entry`, requestOptions)
            .then((response) => response.json())
            //.then((response) => response.text())
            .then((result) => {
                if (result && result.data) {
                    const parsedData = JSON.parse(result.data);
                    const id = parsedData.id;
                    AccountID = id



                    setToastMessage('Account created successfully');
                    setToastSeverity('success');
                    setToastOpen(true);
                    // console.log("result", result)
                }

            }
            )
            .catch((error) => {

                setToastMessage('Error');
                setToastSeverity('error');
                setToastOpen(true);
                console.error(error)
            }
            ).finally(() => {
                setLoading(false); // Close loader regardless of success or error
            });
        //  console.log(formData); // Output the form data object to console

    };


    function handleToastClose() {
        setToastOpen(false);
        // Check if the toast severity is 'success'
        if (toastSeverity === 'success') {
            // If it is, navigate to the next page
            navigateToAccountSuccess();
        } // Navigate to the next page after closing the toast
    }

    return (
        <>
            <Navbar />
            <p style={{ display: "flex", marginLeft: "15px" }}><CreateNewFolderOutlined /><span style={{ fontWeight: "bold", fontSize: "16px", paddingLeft: "4px" }}> Create Account</span></p>
            <hr />
            <Box
                component="form"
                sx={{ mb: 5, '& > :not(style)': { m: 1, width: '90%', ml: 2 } }}
                noValidate
                autoComplete="off"
            >
                <NameIput value={formData.name} onChange={(value) => handleInputChange('name', value)} />
                {/* <NameIput onChange={(value) => handleInputChange('name', value)} /> */}
                <TypeSelect onChange={(value) => handleInputChange('type', value)} />
                <IndustrySelect onChange={(value) => handleInputChange('industry', value)} />
                <EmailInput value={formData.email} onChange={(value) => handleInputChange('email', value)} />
                {/* <EmailInput onChange={(value) => handleInputChange('email', value)} /> */}
                <OfficePhoneInput onChange={(value) => handleInputChange('officephone', value)} />
                <StatusSelect onChange={(value) => handleInputChange('status', value)} />
                <DescriptionInput onChange={(value) => handleInputChange('description', value)} />

            </Box>
            <hr />
            <Box sx={{ mt: 3, mb: 3, display: "flex", justifyContent: "flex-end", '& button': { m: 1, } }}>
                <Link to="/Home">
                    <CancelBtn />
                </Link>
                <SaveButton onClick={handleSave} />
                {/* <SaveButton /> */}

            </Box>
            <CRM_Loader open={loading} />
            <Toast open={toastOpen} message={toastMessage} severity={toastSeverity} onClose={handleToastClose} />

        </>
    )
}

export default CreateAcount




export const getAccountId = () => {
    return AccountID;
} 