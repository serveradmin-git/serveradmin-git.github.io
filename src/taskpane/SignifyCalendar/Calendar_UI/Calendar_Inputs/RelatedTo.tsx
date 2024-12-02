
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import useGetModuleAPI from '../../CalendarServices/CalendarAPIs/GetModuleAPI';
import { CircularProgress } from '@mui/material';

const RelatedTo = ({ listValues }) => {
    const navigate = useNavigate();
    const { pName, type, loading } = useGetModuleAPI();

    const calFindsignify = () => {
        navigate('/CalendarFindInSignify');
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', height: '100px', marginLeft: '10px' }}>
                <CircularProgress size={20} style={{ marginRight: '10px' }} />
                <p>Related To...</p>
            </div>
        );
    }

    return (
        <div style={{ marginLeft: '10px', display: 'flex', alignItems: 'center', marginBottom: '10px', lineHeight: "7px" }}>
            <div style={{ flex: '1' }}>
                <p>{listValues && listValues.Module ? listValues.Module : type || 'Related To'}</p>
                <a style={{ color: 'black', textDecoration: "none", lineHeight: 1, cursor: 'pointer' }} onClick={calFindsignify}>
                    {listValues && listValues.Name ? listValues.Name : pName || 'Click here to Select'}
                </a>
            </div>
            <div style={{ marginLeft: 'auto', marginRight: '10px', marginTop: "10%" }}>
                <SearchIcon />
            </div>
        </div>
    );
};

export default RelatedTo;








