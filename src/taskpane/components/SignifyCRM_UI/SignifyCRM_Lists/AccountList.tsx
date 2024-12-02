
import React from 'react';
import { Button, ListItem, ListItemButton, ListItemText, FormLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { RedirectAccount_URL } from '../../../Oauth/Redirect_URL';

const AccountList = ({ accounts, totalCount }) => {
    const navigate = useNavigate();

    const navigateToCreateAcount = () => {
        navigate('/AccountFilter');
    };

    const redirectAccountURL = RedirectAccount_URL();

    const handleAccountURLClick = (id) => {
        window.open(redirectAccountURL + id, '_blank');
    };

    return (
        <>
            <FormLabel sx={{ ml: 2, color: "black", fontWeight: "bold" }}>Account ({totalCount})</FormLabel>
            {accounts.map((account) => (
                <ListItem key={account.id.value}>
                    <ListItemButton>
                        <ListItemText sx={{ color: "blue" }} primary={`${account.name_value_list.name.value}`} onClick={() => handleAccountURLClick(account.name_value_list.id.value)} />
                        <Button onClick={navigateToCreateAcount} sx={{ color: "#6074ac" }}>View More</Button>
                    </ListItemButton>
                </ListItem>
            ))}
        </>
    );
};

export default AccountList;
