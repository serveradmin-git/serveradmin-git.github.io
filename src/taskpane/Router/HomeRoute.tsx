import React from 'react'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import Home from '../components/SignifyCRM_Pages/HomePage/Home'
import FindInSignify from '../components/SignifyCRM_Pages/FindInSignifyCRM/FindInSignify'
import CreateLeade from '../components/SignifyCRM_Pages/CreateLeadPage/CreateLeade'
import CreateAcount from '../components/SignifyCRM_Pages/CreateAccountPage/CreateAcount'
import CreateContact from '../components/SignifyCRM_Pages/CreateContactPage/CreateContact'
import CreateOpportunity from '../components/SignifyCRM_Pages/CreateOpportunityPage/CreateOpportunity'
import CreateCase from '../components/SignifyCRM_Pages/CreateCasePage/CreateCase'
import LeadSuccess from '../components/SignifyCRM_Pages/LeadCreatedPage/LeadSuccess'
import AccountSuccess from '../components/SignifyCRM_Pages/AccountCreatedPage/AccountSucces'
import ContactSuccess from '../components/SignifyCRM_Pages/ContactCreatedPage/ContactSuccess'
import OpportunitySuccess from '../components/SignifyCRM_Pages/OpportunityCreatedPage/OpportunitySuccess'
import CaseSuccess from '../components/SignifyCRM_Pages/CaseCreatedPage/CaseSuccess'
import SignifyChatGPT from '../components/SignifyCRM_Pages/SignifyGPTPage/SignifyChatGPT'
import SignifySignin from '../components/SignifyCRM_Pages/LoginPage/SignifySignin'
import ConnectURL from '../components/SignifyCRM_Pages/SignifyConnectPage/ConnectURL'
import SignifySetting from '../components/SignifyCRM_Pages/SettingPage/SignifySetting'
import AccountFilter from '../components/SignifyCRM_Pages/AccountFilterPage/AccountFilter'
import ContactFilter from '../components/SignifyCRM_Pages/ContactFilterPage/ContactFilter'
import CalendarHome from '../SignifyCalendar/Calendar_Pages/CalendarHome'
import CalendarFindInSignify from '../SignifyCalendar/Calendar_Pages/CalendarFindInSignify'
import CalendarSuccessPage from '../SignifyCalendar/Calendar_Pages/CalendarSuccessPage'
import CalendarSettingPage from '../SignifyCalendar/Calendar_Pages/CalendarSettingPage'
const HomeRoute = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path='/' element={<ConnectURL />} />
                    <Route path='/SignifySignin' element={<SignifySignin />} />
                    <Route path='/Home' element={<Home />} />
                    <Route path='/FindInSignify' element={<FindInSignify />} />
                    <Route path='/CreateLeade' element={<CreateLeade />} />
                    <Route path='/CreateAcount' element={<CreateAcount />} />
                    <Route path='/CreateContact' element={<CreateContact />} />
                    <Route path='/CreateOpportunity' element={<CreateOpportunity />} />
                    <Route path='/CreateCase' element={<CreateCase />} />
                    <Route path='/LeadSuccess' element={<LeadSuccess />} />
                    <Route path='/AccountSuccess' element={<AccountSuccess />} />
                    <Route path='/ContactSuccess' element={<ContactSuccess />} />
                    <Route path='/OpportunitySuccess' element={<OpportunitySuccess />} />
                    <Route path='/CaseSuccess' element={<CaseSuccess />} />
                    <Route path='/SignifyChatGPT' element={<SignifyChatGPT />} />
                    <Route path='/SignifySetting' element={<SignifySetting />} />
                    <Route path='/AccountFilter' element={<AccountFilter />} />
                    <Route path='/ContactFilter' element={<ContactFilter />} />
                    <Route path='/CalendarHome' element={<CalendarHome />} />
                    <Route path='/CalendarFindInSignify' element={<CalendarFindInSignify />} />
                    <Route path='/CalendarSuccessPage' element={<CalendarSuccessPage />} />
                    <Route path='/CalendarSettingPage' element={<CalendarSettingPage />} />

                </Routes>
            </Router>
        </>
    )
}

export default HomeRoute