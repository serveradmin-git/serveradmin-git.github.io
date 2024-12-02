import React, { useState } from 'react'

export default function GetAmountValue() {


    const [amount, setAmount] = useState('');

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };
    console.log(amount);
    return { amount, handleAmountChange };
}







export function GetCloseDateValue() {


    const [closedate, setClosedate] = useState('');

    const handleCloseDateChange = (e) => {
        setClosedate(e.target.value);
    };
    console.log(closedate);
    return { closedate, handleCloseDateChange };
}





export function GetProbabilityValue() {


    const [probability, setProbability] = useState('');

    const handleProbabilityDateChange = (e) => {
        setProbability(e.target.value);
    };
    console.log(probability);
    return { probability, handleProbabilityDateChange };
}