import React, { useEffect, useState } from 'react'
import GetEmailBody from './GetEmailBody'

const GetName = () => {
    const { getName } = GetEmailBody()



    const [name, setName] = useState("")
    useEffect(() => {
        setName(getName)
    }, [])

    return { name, setName }

}

export default GetName