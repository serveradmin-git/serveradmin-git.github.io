import React, { useState } from 'react'

export default function GetMobileValue() {


    const [mobile, setMobile] = useState('');

    const handleMobileChange = (e) => {
        setMobile(e.target.value);
    };
    console.log(mobile);
    return { mobile, handleMobileChange };
}


export function GetAccountNameValue() {


    const [account, setAccount] = useState('');

    const handleAccountNumberChange = (e) => {
        setAccount(e.target.value);
    };
    console.log(account);
    return { account, handleAccountNumberChange };
}



export function GetTitleValue() {


    const [title, setTitle] = useState('');

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };
    console.log(title);
    return { title, handleTitleChange };
}




export function GetDepartmentValue() {


    const [department, setDepartment] = useState('');

    const handleDepartmentChange = (e) => {
        setDepartment(e.target.value);
    };
    console.log(department);
    return { department, handleDepartmentChange };
}
