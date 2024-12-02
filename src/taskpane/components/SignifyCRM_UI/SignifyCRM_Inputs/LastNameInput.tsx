import { TextField } from '@mui/material'
import React from 'react'
import GetLastName from '../../../Utilty/GetLastName'

const LastNameInput = ({ onChange }) => {
    const { lastname, setLastName } = GetLastName()
    const handelLastNameChange = (e) => {
        const newLastName = e.target.value
        setLastName(newLastName);
        onChange(newLastName)
    }
    return (
        <TextField
            value={lastname}
            onChange={handelLastNameChange}
            label="Last Name" variant='standard' ></TextField>
    )
}

export default LastNameInput