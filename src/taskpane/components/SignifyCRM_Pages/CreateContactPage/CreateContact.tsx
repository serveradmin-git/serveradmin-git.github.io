import React, { useState } from 'react'
import Navbar from '../Navbar'
import { PersonAddAltOutlined } from '@mui/icons-material'
import { Box } from '@mui/material'
import CancelBtn from '../../SignifyCRM_UI/Signify_Button/CancelBtn'
import SaveButton from '../../SignifyCRM_UI/Signify_Button/SaveButton'
import FirstNameInput from '../../SignifyCRM_UI/SignifyCRM_Inputs/FirstNameInput'
import LastNameInput from '../../SignifyCRM_UI/SignifyCRM_Inputs/LastNameInput'
import EmailInput from '../../SignifyCRM_UI/SignifyCRM_Inputs/EmailInput'
import MobileInput from '../../SignifyCRM_UI/SignifyCRM_Inputs/MobileInput'
import TitleInput from '../../SignifyCRM_UI/SignifyCRM_Inputs/TitleInput'
import DepartmentInput from '../../SignifyCRM_UI/SignifyCRM_Inputs/DepartmentInput'
import SalutationSelect from '../../SignifyCRM_UI/Signify_DropDown/SalutationSelect'
import OfficePhoneInput from '../../SignifyCRM_UI/SignifyCRM_Inputs/OfficePhoneInput'
import { Link, useNavigate } from 'react-router-dom'
import GetEmailBody from '../../../Utilty/GetEmailBody'
import CRM_Url from '../../../Hooks/CRM_Url'
import CRM_Token from '../../../Oauth/CRM_Token'
import { GetUserData } from '../../../Oauth/GetUserData'
import Toast from '../../../SignifyToast/Toast'
import CRM_Loader from '../../../Hooks/CRM_Loader'




let ContactID;
const CreateContact = () => {

    const [toastOpen, setToastOpen] = useState(false); // State to manage toast visibility
    const [toastMessage, setToastMessage] = useState(''); // State to manage toast message
    const [toastSeverity, setToastSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success'); // State to manage toast severity
    const [loading, setLoading] = useState(false);
    const API_URL = CRM_Url()
    const LoginToken = CRM_Token()
    const { API_Key, User_ID } = GetUserData()

    const navigate = useNavigate();

    const navigateToContactSuccess = () => {
        navigate('/ContactSuccess');
    };
    const { getEmailAddress, firstName, lastName } = GetEmailBody();


    const [formData, setFormData] = useState({
        salutation: '',
        firstName: firstName,
        lastName: lastName,
        email: getEmailAddress,
        mobile: '',
        title: '',
        department: '',
        officePhone: ''
    });

    const handleInputChange = (fieldName, value) => {
        setFormData({
            ...formData,
            [fieldName]: value
        });
    };

    const handleSave = () => {
        // Check if required fields are filled
        if (!formData.firstName || !formData.email) {
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
        // myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE3MTY5NjQwMzUsImp0aSI6ImZ6OUZMTnJYdHlRNGljdE12eFdDZ3c9PSIsImlzcyI6Imh0dHBzOlwvXC9kZW1vLnNpZ25pZnljcm0ubmV0XC9vdXRsb29rLWFkZGluIiwibmJmIjoxNzE2OTY0MDM1LCJleHAiOjE3MTk1NTYwMzUsImRhdGEiOnsidXNlck5hbWUiOiJJbnRlci1TYWxlczAzIiwidXNlcklkIjoiNDdkZjY2MWQtYmNmZS00NTcwLTY2MjAtNWQ1YTgyYzIyNWI4In19.vrtRRwK7M3yt2mlVk9rms_LgxeEY35j_2JTl8suGbpAyp_lz-b3qRjCgtzZYWMtVfHPMMhBWanYSDlkLsxQgrg");
        myHeaders.append("Authorization", `Bearer ${LoginToken}`);
        // Create request payload
        const raw = JSON.stringify({
            "Api-Key": API_Key,
            module_name: "Contacts",
            name_value_list: {
                assigned_user_id: User_ID,
                salutation: formData.salutation,
                first_name: formData.firstName,
                last_name: formData.lastName,
                email1: formData.email,
                phone_mobile: formData.mobile,
                description: "",
                title: formData.title,
                department: formData.department,
                phone_work: formData.officePhone,
                birthdate: ""
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
        // fetch("https://demo.signifycrm.net/outlook-addin/rest_api/v1/rest/set_entry", requestOptions)
        fetch(`${API_URL}set_entry`, requestOptions)
            .then((response) => response.json())
            // .then((response) => response.text())
            .then((result) => {
                if (result && result.data) {
                    const parsedData = JSON.parse(result.data);
                    const id = parsedData.id;
                    ContactID = id
                    if (DEBUG) {

                        console.log("ContactID:", ContactID);
                    }

                    setToastMessage('Contact created successfully');
                    setToastSeverity('success');
                    setToastOpen(true);
                    // console.log("result", result)
                }

            })
            .catch((error) => {

                console.error(error)



                setToastMessage('Error');
                setToastSeverity('error');
                setToastOpen(true);
            }
            ).finally(() => {
                setLoading(false); // Close loader regardless of success or error
            });


    };
    function handleToastClose() {
        setToastOpen(false);
        // Check if the toast severity is 'success'
        if (toastSeverity === 'success') {
            // If it is, navigate to the next page
            navigateToContactSuccess();
        } // Navigate to the next page after closing the toast
    }



    return (
        <>
            <Navbar />
            <p style={{ display: "flex", marginLeft: "15px" }}><PersonAddAltOutlined /><span style={{ fontWeight: "bold", fontSize: "16px", paddingLeft: "4px" }}> Create Contact</span></p>
            <hr />
            <Box
                component="form"
                sx={{ mb: 5, '& > :not(style)': { m: 1, width: '90%', ml: 2 } }}
                noValidate
                autoComplete="off"
            >
                <SalutationSelect onChange={(value) => handleInputChange('salutation', value)} />
                <FirstNameInput onChange={(value) => handleInputChange('firstName', value)} />
                <LastNameInput onChange={(value) => handleInputChange('lastName', value)} />
                <EmailInput value={formData.email} onChange={(value) => handleInputChange('email', value)} />
                <MobileInput onChange={(value) => handleInputChange('mobile', value)} />
                <TitleInput onChange={(value) => handleInputChange('title', value)} />
                <DepartmentInput onChange={(value) => handleInputChange('department', value)} />
                <OfficePhoneInput onChange={(value) => handleInputChange('officePhone', value)} />
            </Box>
            <hr />
            <Box sx={{ mt: 3, mb: 3, display: "flex", justifyContent: "flex-end", '& button': { m: 1, } }}>
                <Link to="/">
                    <CancelBtn />
                </Link>
                <SaveButton onClick={handleSave} />

            </Box>
            <CRM_Loader open={loading} />
            <Toast open={toastOpen} message={toastMessage} severity={toastSeverity} onClose={handleToastClose} />

        </>
    )
}

export default CreateContact


export const getContactId = () => {

    return ContactID
} 