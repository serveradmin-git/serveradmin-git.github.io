import { useState } from "react";

export function GetDescriptionValue() {


    const [description, setDescription] = useState('');

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };
    console.log(description);
    return { description, handleDescriptionChange };
}





export function GetMobileValue() {


    const [mobile, setMobile] = useState('');

    const handleMobileChange = (e) => {
        setMobile(e.target.value);
    };
    console.log(mobile);
    return { mobile, handleMobileChange };
}





export function GetOfficePhoneValue() {


    const [phone, setPhone] = useState('');

    const handleOfficePhoneChange = (e) => {
        setPhone(e.target.value);
    };
    console.log(phone);
    return { phone, handleOfficePhoneChange };
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
