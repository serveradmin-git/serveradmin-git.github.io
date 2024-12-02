import { TextField } from '@mui/material'
import React from 'react'
import GetFirstName from '../../../Utilty/GetFirstName'


const FirstNameInput = ({ onChange }) => {
    const { firstname, setFirstName } = GetFirstName()
    const handleFirstNameChange = (e) => {

        const newFirstName = e.target.value
        setFirstName(newFirstName);
        onChange(newFirstName)
    }

    return (
        <TextField
            value={firstname}
            onChange={handleFirstNameChange}
            label="First Name*" variant='standard'
        ></TextField>
    )
}

export default FirstNameInput






