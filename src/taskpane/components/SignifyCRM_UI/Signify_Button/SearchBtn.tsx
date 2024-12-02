import { Button } from '@mui/material'
import React from 'react'

const SearchBtn = ({onClick}) => {
    const handleSearchClick = () => {
        onClick()
    }
    return (

        <Button onClick={handleSearchClick} variant='contained' sx={{ background: "#6074ac" }}>Search</Button>

    )
}

export default SearchBtn