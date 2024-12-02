import { Button } from '@mui/material'
import React from 'react'

const SaveButton = ({ onClick }) => {
    const handelSaveClick = () => {
        onClick()
    }
    return (

        <Button onClick={handelSaveClick} variant='contained' sx={{ background: "#6074ac", width: "40%" }}>Save</Button>

    )
}

export default SaveButton