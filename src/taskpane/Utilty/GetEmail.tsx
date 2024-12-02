import React, { useEffect, useState } from 'react'
import GetEmailBody from './GetEmailBody'

const GetEmail = () => {
    const { getEmailAddress } = GetEmailBody()
    const mail = getEmailAddress
    const [email, setEmail] = useState(mail)
    useEffect(() => {
        setEmail(getEmailAddress)
    }, [])

    return { email, setEmail }
}

export default GetEmail