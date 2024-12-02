
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import CalendarNavbar from '../Calendar_UI/Calendar_Navbar/CalendarNavBar';
import CalendarModuleSelect from '../Calendar_UI/Calendar_Selects/ModuleSelect';
import CalendarSubjectInput from '../Calendar_UI/Calendar_Inputs/SubjectInput';
import CalendarStartDateInput from '../Calendar_UI/Calendar_Inputs/StartDate';
import CalendarEndDateInput from '../Calendar_UI/Calendar_Inputs/EndDate';
import CalendarStatusSelect from '../Calendar_UI/Calendar_Selects/StatusSelect';
import CalendarDescriptionInput from '../Calendar_UI/Calendar_Inputs/CalendarDescriptionInput';
import CalendarSaveButton from '../Calendar_UI/Calendar_Buttons/CalendarSaveButton';
import ActionCode from '../Calendar_UI/Calendar_Selects/ActionCode';
import { Subject, Window } from '@mui/icons-material';
import PostCalendarAPI from '../CalendarServices/CalendarAPIs/PostCalendarAPI';
import Toast from '../../SignifyToast/Toast';
import CRM_Loader from '../../Hooks/CRM_Loader';
import RelatedTo from '../Calendar_UI/Calendar_Inputs/RelatedTo';
import { useLocation, useNavigate } from 'react-router-dom';
import ActionCodeAPI from '../CalendarServices/CalendarAPIs/ActionCodeAPI';
import CalendarItemsHook from '../CalendarHook/CalendarItemsHook';
import GetModuleAPI from '../CalendarServices/CalendarAPIs/GetModuleAPI';
import { GetMsActivity } from '../CalendarServices/CalendarAPIs/GetMsActivity';
import { CalendarDescription } from '../CalendarHook/CalendarDescription';

const CalendarHome = () => {
    const location = useLocation();
    const [showActionCodeInput, setShowActionCodeInput] = useState(false);
    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastSeverity, setToastSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success');
    const [loading, setLoading] = useState(false);
    const [listValues, setlistValues] = useState();
    const [ActionID, setActionID] = useState('');
    const [dataArray, setDataArray] = useState([]);
    const [beanObject, setBeanObject] = useState(null);
    const [eventDescription, setEventDescription] = useState('');


    const navigate = useNavigate();
    const { mActionid, mDescription, pStatus, pName, pID, mID, type } = GetModuleAPI()

    useEffect(() => {
        CalendarDescription()
            .then(description => setEventDescription(description))
            .catch(error => console.error('Failed to retrieve calendar item body:', error));
    }, []);
    console.log("eventDescription", eventDescription);

    const getModuleName = beanObject
    const getStatus = pStatus;

    const defaultModule = "Meetings";
    const defaultStatus = "Planned";
    const module = getModuleName != null ? getModuleName : defaultModule;
    const status = getStatus != null ? getStatus : defaultStatus;
    const moduleactionid = mActionid != null ? mActionid : "";
    const moduledescription = mDescription != null ? mDescription : "";

    useEffect(() => {
        GetMsActivity((result) => {
            if (result) {
                setBeanObject(result.getBeanModule);
            } else {
                console.log("Failed to retrieve data");
            }
        });
    }, []);
    const [formData, setFormData] = useState(() => {
        const savedData = localStorage.getItem('formData');
        return savedData ? JSON.parse(savedData) : {
            module: module,
            subject: '',
            startDate: '',
            endDate: '',
            status: status,
            actionCode: moduleactionid,
            description: moduledescription,
            durationHours: "",
            durationMinutes: "",
        };
    });



    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const appointmentData = await CalendarItemsHook();
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    subject: appointmentData.subject || prevFormData.subject || '',
                    startDate: appointmentData.startDate || prevFormData.startDate,
                    endDate: appointmentData.endDate || prevFormData.endDate,
                    durationHours: appointmentData.hoursDifference.toString() || prevFormData.durationHours || "",
                    durationMinutes: appointmentData.minutesDifference.toString() || prevFormData.durationMinutes || "",
                }));
            } catch (error) {
                console.error('Failed to fetch appointment data:', error);
            }
        };

        fetchInitialData();
    }, []);


    useEffect(() => {
        if (location.state && location.state.listVaue) {
            const listValue = location.state.listVaue;
            setlistValues(listValue);
            console.log(listValue);
        }
    }, [location.state]);

    useEffect(() => {
        if (getStatus) {
            setFormData(prevFormData => ({
                ...prevFormData,
                status: getStatus
            }));
        }
    }, [getStatus]);

    useEffect(() => {
        // Update formData based on beanObject
        setFormData(prevFormData => ({
            ...prevFormData,
            module: beanObject || prevFormData.module,
        }));
    }, [beanObject]);
    const handleModuleChange = async (module) => {
        try {
            setShowActionCodeInput(module === "Meetings" || module === "Tasks" || module === "Calls");
            const dataArray = await ActionCodeAPI(module);
            setDataArray(dataArray);
        } catch (error) {
            console.error("Error in handleModuleChange:", error);
        }
    };

    const handleInputChange = (fieldName, value) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [fieldName]: value
        }));
    };
    const SubjectInputHidden = formData.subject.trim().length > 0;
    const StartDateInputHidden = formData.startDate.dates || formData.startDate.times;
    const EndDateInputHidden = formData.endDate.dates || formData.endDate.times;

    const handleSave = () => {
        if (!formData.module || !formData.endDate || !formData.status || !formData.subject) {
            setToastMessage('Please fill all required fields');
            setToastSeverity('warning');
            setToastOpen(true);
            return;
        }
        setLoading(true);
        PostCalendarAPI(formData, listValues, pID, mID, type, pStatus, mDescription, mActionid, eventDescription, setLoading, handleToast);
    };

    const handleToast = (message, severity) => {
        setLoading(false);
        setToastMessage(message);
        setToastSeverity(severity);
        setToastOpen(true);
    };

    function handleToastClose() {
        setToastOpen(false);
        if (toastSeverity === 'success') {
            navigate('/CalendarSuccessPage', { state: { module: formData.module, subject: formData.subject } })
        }
    }

    const handleDateChange = (newDate) => {
        setFormData(prevData => ({
            ...prevData,
            startDate: {
                ...prevData.startDate,
                dates: newDate ? newDate.format('YYYY-MM-DD') : null,
            }
        }));
    };

    const handleTimeChange = (newTime) => {
        setFormData(prevData => ({
            ...prevData,
            startDate: {
                ...prevData.startDate,
                times: newTime ? newTime.format('HH:mm') : null,
            }
        }));
    };


    const handleEndDateChange = (newDate) => {
        setFormData(prevData => ({
            ...prevData,
            endDate: {
                ...prevData.endDate,
                dates: newDate ? newDate.format('YYYY-MM-DD') : null,
            }
        }));
    };

    const handleEndTimeChange = (newTime) => {
        setFormData(prevData => ({
            ...prevData,
            endDate: {
                ...prevData.endDate,
                times: newTime ? newTime.format('HH:mm') : null,
            }
        }));
    };



    return (
        <>
            <CalendarNavbar />
            <p style={{ display: "flex", marginLeft: "15px" }}>
                <Window /><span style={{ fontWeight: "bold", fontSize: "16px", paddingLeft: "4px" }}> Update CRM Activity</span>
            </p>
            <hr />
            <CalendarModuleSelect value={formData.module} onChange={(module) => { handleModuleChange(module); handleInputChange("module", module); }} />
            <CalendarSubjectInput subject={formData.subject} onChange={(value) => handleInputChange("subject", value)} hidden={SubjectInputHidden} />
            <CalendarStartDateInput
                startDate={formData.startDate}
                onDateChange={handleDateChange}
                onTimeChange={handleTimeChange}
                hidden={StartDateInputHidden}
            />
            <CalendarEndDateInput
                endDate={formData.endDate}
                onDateChange={handleEndDateChange}
                onTimeChange={handleEndTimeChange}
                hidden={!!EndDateInputHidden}
            />
            <CalendarStatusSelect value={formData.status} onChange={(status) => handleInputChange("status", status)} />

            {showActionCodeInput && (
                <ActionCode onChange={(value) => {
                    handleInputChange("actionCode", value);
                    setActionID(value);
                }} dataArray={dataArray} />
            )}
            <RelatedTo listValues={listValues} />
            <CalendarDescriptionInput onChange={(value) => handleInputChange("description", value)} />
            <Box sx={{ margin: "4%" }}>
                <CalendarSaveButton onClick={handleSave} />
            </Box>
            <Toast open={toastOpen} message={toastMessage} severity={toastSeverity} onClose={handleToastClose} />
            <CRM_Loader open={loading} />
        </>
    );
};

export default CalendarHome;





