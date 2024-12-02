import React, { useEffect, useState } from 'react'
import GetEmailBody from './GetEmailBody'

const GetFirstName = () => {
    const { firstName } = GetEmailBody()



    const [firstname, setFirstName] = useState("")
    useEffect(() => {
        setFirstName(firstName)
    }, [])

    return { firstname, setFirstName }

}

export default GetFirstName