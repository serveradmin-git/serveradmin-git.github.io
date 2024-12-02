
import React, { useEffect, useState } from 'react';
import { ListItem, ListItemButton, ListItemText, FormLabel } from '@mui/material';
import { ArchiveOutlined } from '@mui/icons-material';
import FilterOpportunitySelect from '../Signify_DropDown/FilterOpportunitySelect';
import { OpportunityFilterAPI } from '../../../Services/Signify_API/OpportunityFilterAPI';
import { RedirectOpportunity_URL } from '../../../Oauth/Redirect_URL';
import OpportunityArchiveAPI from '../../../Services/Signify_API/OpportunityArchiveAPI';
import { AllOpportunityFilterAPI } from '../../../Services/Signify_API/AllOpportunityFilterAPI';
import CRM_Loader from '../../../Hooks/CRM_Loader';
import Toast from '../../../SignifyToast/Toast';

const ActiveOpportunityList = ({ }) => {


    const [opportunitiesName, setopportunitiesName] = useState([]);
    const [opportunityfilter, setOpportunityFilter] = useState('');
    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastSeverity, setToastSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success');

    const [loading, setLoading] = useState(false);
    useEffect(() => {

        const fetchOpportunityData = async () => {





            setLoading(true);
            try {
                const data = await OpportunityFilterAPI();
                setopportunitiesName(data);

            } catch (error) {

                console.error("Error fetching Opportunity data", error);

            }
            finally {
                setLoading(false); // Stop loading
            }
        };
        const fetchAllOpportunityData = async () => {
            setLoading(true);
            try {

                const data = await AllOpportunityFilterAPI();
                setopportunitiesName(data);
            } catch (error) {

                console.error("Error fetching Opportunity data", error);
            } finally {
                setLoading(false); // Stop loading
            }

        };

        if (opportunityfilter === 'Show Active Opportunity') {
            fetchOpportunityData();
        } else if (opportunityfilter === 'Show All Opportunity') {
            fetchAllOpportunityData()
        } else {
            setopportunitiesName([]);
        }
    }, [opportunityfilter]);
    const handleOpportunityFilterChange = (newFilter: string) => {
        setOpportunityFilter(newFilter);
    };



    const handleArchiveClick = async (id) => {

        try {
            await OpportunityArchiveAPI(id);
            setToastMessage('Opportunity archived successfully!');
            setToastSeverity('success');
            setToastOpen(true);
        } catch (error) {
            setToastMessage(`Failed to archive Opportunity: ${error.message}`);
            setToastSeverity('error');
            setToastOpen(true);
        }
    };


    const handleCloseToast = () => {
        setToastOpen(false);
    };
    const redirectOpportunityURL = RedirectOpportunity_URL()

    const handleOpportunityURLClick = (id) => {
        // Open the URL in a new tab
        window.open(redirectOpportunityURL + id, '_blank');
    };

    return (
        <>
            <Toast
                open={toastOpen}
                message={toastMessage}
                severity={toastSeverity}
                onClose={handleCloseToast}
            />
            <FilterOpportunitySelect onFilterChange={handleOpportunityFilterChange} />
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <CRM_Loader open={true} />
                </div>
            ) : (

                opportunitiesName.length > 0 ? (
                    opportunitiesName.map((opportunityName) => (
                        <ListItem key={opportunityName.id.value}>
                            <ListItemButton>
                                <ListItemText onClick={() => handleOpportunityURLClick(opportunityName.name_value_list.id.value.id.value)} sx={{ color: "Blue" }} primary={`${opportunityName.name_value_list.name.value}`} />
                                <ArchiveOutlined onClick={() => handleArchiveClick(opportunityName.name_value_list.id.value)} />
                            </ListItemButton>
                        </ListItem>
                    ))
                ) : (
                    <p style={{ marginLeft: "10px" }}>No Opportunity Found</p>
                )

            )}
        </>
    );
}

export default ActiveOpportunityList;
