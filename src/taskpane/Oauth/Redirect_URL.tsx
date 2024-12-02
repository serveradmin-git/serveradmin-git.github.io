import React from 'react'
import { getAccountId } from '../components/SignifyCRM_Pages/CreateAccountPage/CreateAcount';
import { getContactId } from '../components/SignifyCRM_Pages/CreateContactPage/CreateContact';
import { getCaseId } from '../components/SignifyCRM_Pages/CreateCasePage/CreateCase';
import { getLeadId } from '../components/SignifyCRM_Pages/CreateLeadPage/CreateLeade';
import { getOppertunitId } from '../components/SignifyCRM_Pages/CreateOpportunityPage/CreateOpportunity';

let Connect_Url = window.localStorage.getItem("connectUrl");

if(DEBUG){
    console.log("Connect_Url:", Connect_Url); 
}

let CRM_URL = Connect_Url;
export const RedirectAccount_URL = () => {

    const redirectAccountURL = `${CRM_URL}/index.php?module=Accounts&action=DetailView&record=`;
    return redirectAccountURL;
}
export const SuccessRedirectAccount_URL = () => {
    const AccountID = getAccountId();
    const successredirectAccountURL = `${CRM_URL}/index.php?module=Accounts&action=DetailView&record=${AccountID}`;
    return successredirectAccountURL;
}

export const RedirectContact_URL = () => {

    const redirectContactURL = `${CRM_URL}/index.php?module=Contacts&action=DetailView&record=`;
    return redirectContactURL;
}

export const SuccessRedirectContact_URL = () => {
    const ContactID = getContactId();
    const successredirectContactURL = `${CRM_URL}/index.php?module=Contacts&action=DetailView&record=${ContactID}`;
    return successredirectContactURL;
}


export const RedirectCase_URL = () => {

    const redirectCaseURL = `${CRM_URL}/index.php?module=Cases&action=DetailView&record=`;
    return redirectCaseURL;
}

export const SuccessRedirectCase_URL = () => {
    const CaseID = getCaseId();
    const successredirectCaseURL = `${CRM_URL}/index.php?module=Cases&action=DetailView&record=${CaseID}`;
    return successredirectCaseURL;
}





export const RedirectLead_URL = () => {

    const redirectLeadURL = `${CRM_URL}/index.php?module=Leads&action=DetailView&record=`;
    return redirectLeadURL;
}


export const SuccessRedirectLead_URL = () => {
    const LeadID = getLeadId();
    const successredirectLeadURL = `${CRM_URL}/index.php?module=Leads&action=DetailView&record=${LeadID}`;
    return successredirectLeadURL;
}






export const RedirectOpportunity_URL = () => {

    const redirectOpportunityURL = `${CRM_URL}/index.php?module=Opportunities&action=DetailView&record=`;
    return redirectOpportunityURL;
}

export const SuccessRedirectOpportunity_URL = () => {
    const createdOppertunityId = getOppertunitId();
    const successredirectOpportunityURL = `${CRM_URL}/index.php?module=Opportunities&action=DetailView&record=${createdOppertunityId}`;
    return successredirectOpportunityURL;
}