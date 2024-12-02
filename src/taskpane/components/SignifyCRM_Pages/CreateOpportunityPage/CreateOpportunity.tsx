import React, { useState } from 'react'
import Navbar from '../Navbar'
import { AddCardOutlined } from '@mui/icons-material'
import { Box } from '@mui/material'
import CancelBtn from '../../SignifyCRM_UI/Signify_Button/CancelBtn'
import SaveButton from '../../SignifyCRM_UI/Signify_Button/SaveButton'
import NameIput from '../../SignifyCRM_UI/SignifyCRM_Inputs/NameIput'
import TypeSelect from '../../SignifyCRM_UI/Signify_DropDown/TypeSelect'
import SaleStageSelect from '../../SignifyCRM_UI/Signify_DropDown/SaleStageSelect'
import AmountInput from '../../SignifyCRM_UI/SignifyCRM_Inputs/AmountInput'
import CloseDate from '../../SignifyCRM_UI/SignifyCRM_Inputs/CloseDateInput'
import ProbabilityInput from '../../SignifyCRM_UI/SignifyCRM_Inputs/ProbabilityInput'
import { Link, useNavigate } from 'react-router-dom'
import GetEmailBody from '../../../Utilty/GetEmailBody'
import SignifyCurrency from '../../../Services/Signify_API/SignifyCurrency'
import SignifyToast from '../../../SignifyToast/Toast'
import Toast from '../../../SignifyToast/Toast'
import { GetUserData } from '../../../Oauth/GetUserData'
import CRM_Url from '../../../Hooks/CRM_Url'
import CRM_Token from '../../../Oauth/CRM_Token'
import GetAccountByNameAPI from '../../../Services/Signify_API/GetAccountByNameAPI'
import CRM_Loader from '../../../Hooks/CRM_Loader'

let createdOppertunityId;

const CreateOpportunity = () => {
    const navigate = useNavigate();
    const API_URL = CRM_Url()
    const LoginToken = CRM_Token()

    const navigateToOpportunitySuccess = () => {
        navigate('/OpportunitySuccess');
    };

    const { API_Key, User_ID } = GetUserData()
    const { getName } = GetEmailBody();

    const [toastOpen, setToastOpen] = useState(false); // State to manage toast visibility
    const [toastMessage, setToastMessage] = useState(''); // State to manage toast message
    const [toastSeverity, setToastSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success'); // State to manage toast severity
    const [loading, setLoading] = useState(false);

    const account = localStorage.getItem("Account")
    console.log("account:", account)
    const [formData, setFormData] = useState({

        name: getName,
        account: account,
        type: '',
        salesstage: '',
        currency: '',
        amount: '',
        closedate: '',
        probability: '',
    });



    const handleInputChange = (fieldName, value) => {
        setFormData({
            ...formData,
            [fieldName]: value
        });
    };

    const handleSaleStageChange = (saleStage) => {
        // Update probability based on saleStage value
        let probabilityValue = '';

        switch (saleStage) {
            case 'Prospecting':
                probabilityValue = '10';
                break;
            case 'Qualification':
                probabilityValue = '20';
                break;
            case 'Proposal/Price Quote':
                probabilityValue = '65';
                break;
            case 'Negotation/Review':
                probabilityValue = '80';
                break;
            case 'Closed-Won':
                probabilityValue = '100';
                break;
            case 'Closed-Lost':
                probabilityValue = '0';
                break;
            default:
                probabilityValue = '';
        }

        setFormData({
            ...formData,
            salesstage: saleStage,
            probability: probabilityValue,
        });
    };

    const handleSave = () => {
        // Check if required fields are filled
        if (!formData.account || !formData.name || !formData.type || !formData.salesstage || !formData.amount || !formData.closedate) {
            // If required fields are not filled, show a toast message
            setToastMessage('Please fill all required fields');
            setToastSeverity('warning');
            setToastOpen(true);
            return; // Exit the function early
        }
        setLoading(true);
        const Account_Id = localStorage.getItem('Account_Id');
        const Currency_ID = localStorage.getItem("Currecy_ID")
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        //   myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE3MTY5NjQwMzUsImp0aSI6ImZ6OUZMTnJYdHlRNGljdE12eFdDZ3c9PSIsImlzcyI6Imh0dHBzOlwvXC9kZW1vLnNpZ25pZnljcm0ubmV0XC9vdXRsb29rLWFkZGluIiwibmJmIjoxNzE2OTY0MDM1LCJleHAiOjE3MTk1NTYwMzUsImRhdGEiOnsidXNlck5hbWUiOiJJbnRlci1TYWxlczAzIiwidXNlcklkIjoiNDdkZjY2MWQtYmNmZS00NTcwLTY2MjAtNWQ1YTgyYzIyNWI4In19.vrtRRwK7M3yt2mlVk9rms_LgxeEY35j_2JTl8suGbpAyp_lz-b3qRjCgtzZYWMtVfHPMMhBWanYSDlkLsxQgrg");
        myHeaders.append("Authorization", `Bearer ${LoginToken}`);
        const raw = JSON.stringify({
            "Api-Key": API_Key,
            "module_name": "Opportunities",
            "name_value_list": {
                "assigned_user_id": User_ID,
                "name": formData.name,
                "account_id": Account_Id,
                "opportunity_type": formData.type,
                "sales_stage": formData.salesstage,
                "currency_id": Currency_ID,
                "amount": formData.amount,
                "date_closed": formData.closedate,
                "probability": formData.probability,
                "next_step": "",
                "campaign_id": "",
                "description": ""
            }
        });

        const requestOptions: RequestInit = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        //  fetch("https://demo.signifycrm.net/outlook-addin/rest_api/v1/rest/set_entry", requestOptions)
        fetch(`${API_URL}set_entry`, requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json(); // Parse the response as JSON
                } else {
                    if (DEBUG) {

                        console.error('Error:', response.statusText);
                    }
                    throw new Error('Network response was not ok');
                }
            })
            .then((result) => {
                // result is already parsed JSON
                if (result && result.data) {
                    const parsedData = JSON.parse(result.data);
                    const oppId = parsedData.id;
                    createdOppertunityId = oppId;
                    // console.log('createdOppertunityId:', createdOppertunityId);

                    setToastMessage('Opportunity created successfully');
                    setToastSeverity('success');
                    setToastOpen(true);
                }
            })
            .catch((error) => {
                console.error('Fetch error:', error);
                // setShowtoast(true);


                setToastMessage('Error');
                setToastSeverity('error');
                setToastOpen(true);
            })
            .finally(() => {
                setLoading(false); // Close loader regardless of success or error
            });




        //  console.log(formData); // Output the form data object to console
        // You can further process this data, send it to an API, etc.
    };


    function handleToastClose() {
        setToastOpen(false);
        // Check if the toast severity is 'success'
        if (toastSeverity === 'success') {
            // If it is, navigate to the next page
            navigateToOpportunitySuccess();
            localStorage.removeItem("Currecy_ID");
            // localStorage.removeItem("Account");
        } // Navigate to the next page after closing the toast
    }


    return (

        <>
            <Navbar />
            <p style={{ display: "flex", marginLeft: "15px" }}><AddCardOutlined /><span style={{ fontWeight: "bold", fontSize: "16px", paddingLeft: "4px" }}> Create Opportunity</span></p>
            <hr />
            <Box
                component="form"
                sx={{ mb: 5, '& > :not(style)': { m: 1, width: '90%', ml: 2 } }}
                noValidate
                autoComplete="off"
            >
                <NameIput value={formData.name} onChange={(value) => handleInputChange('name', value)} />
                <GetAccountByNameAPI />
                <TypeSelect onChange={(value) => handleInputChange('type', value)} />
                <SaleStageSelect value={formData.salesstage} onChange={handleSaleStageChange} />
                <SignifyCurrency />
                <AmountInput onChange={(value) => handleInputChange('amount', value)} />
                <CloseDate onChange={(value) => handleInputChange('closedate', value)} />
                <ProbabilityInput value={formData.probability} onChange={(value) => handleInputChange('probability', value)} />

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

export default CreateOpportunity

export const getOppertunitId = () => {
    return createdOppertunityId
}


