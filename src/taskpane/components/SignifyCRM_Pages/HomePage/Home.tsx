import React from 'react';
import { Box } from '@mui/material';
import SignifyCRM from '../../SignifyCRM_UI/Signify_Button/SignifyCRM'
import Lead from '../../SignifyCRM_UI/Signify_Button/Lead';
import Account from '../../SignifyCRM_UI/Signify_Button/Account';
import Contact from '../../SignifyCRM_UI/Signify_Button/Contact';
import Opportunity from '../../SignifyCRM_UI/Signify_Button/Opportunity';
import Case from '../../SignifyCRM_UI/Signify_Button/Case';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import { GetUserData } from '../../../Oauth/GetUserData';



const Home = () => {

    const { User_Name } = GetUserData()

    const navigate = useNavigate();

    const navigateToFindInSignify = () => {
        navigate('/FindInSignify');
    };
    const navigateToCreateLeade = () => {
        navigate('/CreateLeade');
    };
    const navigateToCreateContact = () => {
        navigate('/CreateContact');
    };
    const navigateToCreateAcount = () => {
        navigate('/CreateAcount');
    };
    const navigateToCreateOpportunity = () => {
        navigate('/CreateOpportunity');
    };
    const navigateToCCreateCase = () => {
        navigate('/CreateCase');
    };
    return (
        <div>
            <Navbar />
            <p style={{ paddingLeft: "16px" }}>
                Welcome {User_Name}
            </p>
            <hr />
            {/* <SignifyLoader /> */}
            <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column", '& button': { m: 1, justifyContent: "flex-start", width: "75%", fontSize: "small", background: "#6074ac" } }}>
                <SignifyCRM onClick={navigateToFindInSignify} />
                <Lead onClick={navigateToCreateLeade} />
                <Account onClick={navigateToCreateAcount} />
                <Contact onClick={navigateToCreateContact} />
                <Opportunity onClick={navigateToCreateOpportunity} />
                <Case onClick={navigateToCCreateCase} />




            </Box>
        </div>
    )
}

export default Home