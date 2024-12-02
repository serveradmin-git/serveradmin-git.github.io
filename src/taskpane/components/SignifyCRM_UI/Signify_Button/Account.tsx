import React from 'react'
import { Button } from '@mui/material'
import { CreateNewFolderOutlined } from '@mui/icons-material'

const Account = ({ onClick }) => {
    const handleClick = () => {
        onClick();
    };
    return (

        <Button onClick={handleClick} variant="contained" size="large" startIcon={<CreateNewFolderOutlined />} >Create Account</Button>

    )
}

export default Account