import React, { useState } from 'react'

export default function GetSubjectValue() {


    const [subject, setSubject] = useState('');

    const handleSubjectChange = (e) => {
        setSubject(e.target.value);
    };
    console.log(subject);
    return { subject, handleSubjectChange };
}





export function GetRequestedDateValue() {


    const [requesteddate, setRequestedDate] = useState('');

    const handleRequestedDateChange = (e) => {
        setRequestedDate(e.target.value);
    };
    console.log(requesteddate);
    return { requesteddate, handleRequestedDateChange };
}






export function GetRequestedTimeValue() {


    const [requestedTime, setRequestedTime] = useState('');

    const handleRequestedTimeChange = (e) => {
        setRequestedTime(e.target.value);
    };
    console.log(requestedTime);
    return { requestedTime, handleRequestedTimeChange };
}




export function GetDueDateValue() {


    const [dueDate, setDueDate] = useState('');

    const handleDueDateChange = (e) => {
        setDueDate(e.target.value);
    };
    console.log(dueDate);
    return { dueDate, handleDueDateChange };
}







export function GetDueTimeValue() {


    const [dueTime, setDueTime] = useState('');

    const handleDueTimeChange = (e) => {
        setDueTime(e.target.value);
    };
    console.log(dueTime);
    return { dueTime, handleDueTimeChange };
}




export function GetContactValue() {


    const [contact, setContact] = useState('');

    const handleContactChange = (e) => {
        setContact(e.target.value);
    };
    console.log(contact);
    return { contact, handleContactChange };
}