import React, { useEffect, useState } from 'react'
import GetEmailBody from './GetEmailBody'

const GetLastName = () => {
    const { lastName } = GetEmailBody()

    const [lastname, setLastName] = useState("")
    useEffect(() => {
        setLastName(lastName)
    }, [])
    return { lastname, setLastName }
}

export default GetLastName