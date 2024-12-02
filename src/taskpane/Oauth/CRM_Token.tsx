import React from 'react'

const CRM_Token = () => {

    const LoginToken = localStorage.getItem("API_Token")
    return LoginToken
}

export default CRM_Token
