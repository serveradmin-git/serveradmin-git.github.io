import React from 'react'
import { connectURlValue } from '../components/SignifyCRM_Pages/SignifyConnectPage/ConnectURL'

const CRM_Url = () => {
    const Connect_Url = window.localStorage.getItem("connectUrl");
    console.log(Connect_Url);
    const CRM_URL = Connect_Url;
    const API_VERSION = 'v1';
    const API_URL = `${CRM_URL}/rest_api/${API_VERSION}/rest/`;

    return API_URL
}

export default CRM_Url