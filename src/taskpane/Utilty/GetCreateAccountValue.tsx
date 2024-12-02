

import { useState } from 'react'

export default function GetOfficePhoneValue() {


    const [phone, setPhone] = useState('');

    const handleOfficePhoneChange = (e) => {
        setPhone(e.target.value);
    };
    console.log(phone);
    return { phone, handleOfficePhoneChange };
}



export function GetDecriptionValue() {


    const [description, setDescription] = useState('');

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };
    console.log(description);
    return { description, handleDescriptionChange };
}