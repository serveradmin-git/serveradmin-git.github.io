import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import React from 'react'
import FilterCaseSelect from '../../SignifyCRM_UI/Signify_DropDown/FilterCaseSelect';
import Navbar from '../Navbar';
import GetEmailBody from '../../../Utilty/GetEmailBody';
import OpenCaseList from '../../SignifyCRM_UI/SignifyCRM_Lists/OpenCaseList';

const ContactFilter = () => {
    const { firstName } = GetEmailBody();
    return (
        <>
            <Navbar />
            <p style={{ display: 'flex', marginLeft: '15px' }}>
                <PersonOutlineOutlinedIcon sx={{ height: "50px", width: "50px" }} />
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ paddingLeft: "4px" }}>{firstName}</span>
                    <span style={{ fontWeight: 'bold', fontSize: '16px', paddingLeft: '4px' }}> Contact</span>
                </div>
            </p>
            <hr style={{ marginBottom: "39px" }} />

            <OpenCaseList />

        </>
    )
}

export default ContactFilter