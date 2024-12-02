import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import React from 'react'
import Navbar from '../Navbar';
import GetEmailBody from '../../../Utilty/GetEmailBody';
import OpenCaseList from '../../SignifyCRM_UI/SignifyCRM_Lists/OpenCaseList';
import ActiveOpportunityList from '../../SignifyCRM_UI/SignifyCRM_Lists/ActiveOpportunityList';


const AccountFilter = () => {
    const { getName } = GetEmailBody();
    return (
        <>
            <Navbar />
            <p style={{ display: 'flex', marginLeft: '15px' }}>
                <FolderOutlinedIcon sx={{ height: "50px", width: "50px" }} />
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ paddingLeft: "4px" }}>{getName}</span>
                    <span style={{ fontWeight: 'bold', fontSize: '16px', paddingLeft: '4px' }}> Account</span>
                </div>
            </p>
            <hr />
            <ActiveOpportunityList />

            <hr style={{ marginTop: "12%", marginBottom: "12%" }} />
            {/* <FilterCaseSelect /> */}
            <OpenCaseList />

        </>
    )
}

export default AccountFilter