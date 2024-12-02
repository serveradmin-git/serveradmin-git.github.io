
import React, { useEffect, useState } from 'react';
import { ListItem, ListItemButton, ListItemText, Typography, CircularProgress } from '@mui/material';
import { ArchiveOutlined } from '@mui/icons-material';
import { RedirectCase_URL } from '../../../Oauth/Redirect_URL';
import { CaseFilterAPI } from '../../../Services/Signify_API/CaseFilterAPI';
import FilterCaseSelect from '../Signify_DropDown/FilterCaseSelect';
import CaseArchiveAPI from '../../../Services/Signify_API/CaseArchiveAPI';
import { AllCaseFilterApi } from '../../../Services/Signify_API/AllCaseFilterApi';
import CRM_Loader from '../../../Hooks/CRM_Loader';
import Toast from '../../../SignifyToast/Toast';

const OpenCaseList = () => {
    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastSeverity, setToastSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success');

    const [caseNameData, setCaseNameData] = useState([]);
    const [loading, setLoading] = useState(false); // Loading state

    const [filter, setFilter] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Start loading

            try {
                let data = [];
                if (filter === 'Show Open Cases') {
                    data = await CaseFilterAPI();
                } else if (filter === 'Show All Cases') {
                    data = await AllCaseFilterApi();
                }

                setCaseNameData(data);
            } catch (error) {
                console.error("Error fetching case data", error);
                setCaseNameData([]);
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchData();
    }, [filter]);

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
    };

    const handleCaseArchiveClick = async (id) => {

        try {
            await CaseArchiveAPI(id);
            setToastMessage('Case archived successfully!');
            setToastSeverity('success');
            setToastOpen(true);
        } catch (error) {
            setToastMessage(`Failed to archive Case: ${error.message}`);
            setToastSeverity('error');
            setToastOpen(true);
        }
    };

    const redirectCaseURL = RedirectCase_URL();

    const handleCaseURLClick = (id) => {
        window.open(redirectCaseURL + id, '_blank');
    };

    const handleCloseToast = () => {
        setToastOpen(false);
    };
    return (
        <>
            <Toast
                open={toastOpen}
                message={toastMessage}
                severity={toastSeverity}
                onClose={handleCloseToast}
            />
            <FilterCaseSelect onFilterChange={handleFilterChange} />
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <CRM_Loader open={true} />
                </div>
            ) : (
                caseNameData.length > 0 ? (
                    caseNameData.map((caseName) => (
                        <ListItem key={caseName.id.value}>
                            <ListItemButton>
                                <div style={{ display: 'flex', flexDirection: "column", width: '100%' }}>
                                    <ListItemText sx={{ color: "Blue" }} onClick={() => handleCaseURLClick(caseName.name_value_list.id.value)} primary={caseName.name_value_list.subject.value} />
                                    <ListItemText primary={caseName.name_value_list.due_date.value} />
                                </div>
                                <ArchiveOutlined onClick={() => handleCaseArchiveClick(caseName.name_value_list.id.value)} />
                            </ListItemButton>
                        </ListItem>
                    ))
                ) : (
                    <p style={{ marginLeft: "10px" }}>No cases found</p>
                )
            )}
        </>
    );
};

export default OpenCaseList;
