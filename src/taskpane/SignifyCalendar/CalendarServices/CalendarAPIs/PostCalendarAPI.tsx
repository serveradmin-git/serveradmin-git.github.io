import React from 'react'
import CRM_Url from '../../../Hooks/CRM_Url'
import CRM_Token from '../../../Oauth/CRM_Token'
import { GetUserData } from '../../../Oauth/GetUserData'
import { CalendarEvent } from '../../CalendarHook/CalendarEvent'
import GetModuleAPI from './GetModuleAPI'

var modeuleID
// var calendarID
const PostCalendarAPI = (formData, listValues, pID, mID, type, pStatus, mDescription, mActionid, eventDescription, setLoading, handleToast) => {

    const API_URL = CRM_Url()
    const LoginToken = CRM_Token()
    const { API_Key, User_ID } = GetUserData()
    const getpId = pID
    const getmId = mID
    const getpType = type
    const getmDescription = mDescription
    const getActionid = mActionid
    console.log("getpId:", getpId)

    // Function to combine date and time strings into an ISO 8601 string
    function combineDateTime(date, time) {
        return new Date(`${date}T${time}:00`); // Adding seconds for completeness
    }

    // Convert to Date objects
    const startDateTime = combineDateTime(formData.startDate.dates, formData.startDate.times);
    const endDateTime = combineDateTime(formData.endDate.dates, formData.endDate.times);

    // Check if the conversion was successful
    if (isNaN(startDateTime.getTime()) || isNaN(endDateTime.getTime())) {
        console.error("Invalid date format in formData.");
    } else {
        // Calculate the difference in milliseconds
        const difference = endDateTime.getTime() - startDateTime.getTime();

        // Convert milliseconds to hours and minutes
        const hoursDifference = Math.floor(difference / (1000 * 60 * 60));
        const minutesDifference = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

        // Output the result
        console.log("hoursDifference:", hoursDifference, "minutesDifference:", minutesDifference);

        const parentType = listValues?.Module ?? "";
        const parentId = listValues?.Id ?? "";
        const modulesId = getmId != null ? getmId : "";
        const Edescript = formData.description !== "" ? formData.description : eventDescription;

        const moduleParentID = parentId && parentId.trim() !== ""
            ? parentId
            : (getpId && getpId.trim() !== "") ? getpId : "";
        const moduleParentType = parentType && parentType.trim() !== ""
            ? parentType
            : (getpType && getpType.trim() !== "") ? getpType : "";
        const moduleDescription = (formData.description !== "" && formData.description.trim() !== "")
            ? formData.description
            : (getmDescription && getmDescription.trim() !== "")
                ? getmDescription
                : (Edescript && Edescript.trim() !== "")
                    ? Edescript
                    : "";
        const moduleActionid = formData.actionCode && formData.actionCode.trim() !== ""
            ? formData.actionCode
            : (getActionid && getActionid.trim() !== "") ? getActionid : "";
        const moduleStatus = formData.status && formData.status.trim() !== ""
            ? formData.status
            : (pStatus && pStatus.trim() !== "") ? getActionid : "";

        const isUpdate = modulesId !== ""; // Check if modulesId exists (i.e., it's an update operation)

        // Combine the start date and time into a single string
        const localDateAndTime = `${formData.startDate.dates} ${formData.startDate.times}`;

        // Convert local date and time string to UTC
        const localDate = new Date(localDateAndTime);
        const utcDate = new Date(localDate.toISOString()); // Convert to ISO string, then back to Date to get UTC

        // Format the UTC date into the desired format (e.g., "YYYY-MM-DD HH:mm")
        const formattedUTCDate = `${utcDate.getUTCFullYear()}-${String(utcDate.getUTCMonth() + 1).padStart(2, '0')}-${String(utcDate.getUTCDate()).padStart(2, '0')} ${String(utcDate.getUTCHours()).padStart(2, '0')}:${String(utcDate.getUTCMinutes()).padStart(2, '0')}`;

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        // myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE3MjA2MDc4NDcsImp0aSI6ImorVVwvc2pWU2lyZXE2dnZJREZJT1FnPT0iLCJpc3MiOiJodHRwczpcL1wvZGVtby5zaWduaWZ5Y3JtLm5ldFwvb3V0bG9vay1hZGRpbiIsIm5iZiI6MTcyMDYwNzg0NywiZXhwIjoxNzIzMTk5ODQ3LCJkYXRhIjp7InVzZXJOYW1lIjoiSW50ZXItU2FsZXMwMyIsInVzZXJJZCI6IjQ3ZGY2NjFkLWJjZmUtNDU3MC02NjIwLTVkNWE4MmMyMjViOCIsImN1cnJlbmN5IjoiVGhhaSBCYWh0IiwiZGF0ZV9mb3JtYXQiOiJkLW0tWSIsInRpbWVfZm9ybWF0IjoiSDppIn19.8GBfBrH5cHlsJ4JHgwvHL4dH1AADjzz6itR00WL7bgCVsYWhQFkLICZ1M6yfRPBWE6GdXrDKfvfiX_LBYliPNg");
        myHeaders.append("Authorization", `Bearer ${LoginToken}`)
        const raw = JSON.stringify({
            "Api-Key": API_Key,
            // "module_name": "Calls",
            "module_name": formData.module,
            "name_value_list": {
                "assigned_user_id": User_ID,
                "id": modulesId,
                "name": formData.subject,
                "status": moduleStatus,
                "action_id": moduleActionid,
                "date_start": formattedUTCDate,
                "duration_hours": hoursDifference,
                "duration_minutes": minutesDifference,
                "parent_type": moduleParentType,
                "parent_id": moduleParentID,
                "description": moduleDescription
            }
        });

        const requestOptions: RequestInit = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        // fetch("https://demo.signifycrm.net/outlook-addin/rest_api/v1/rest/set_entry", requestOptions)
        fetch(`${API_URL}set_entry`, requestOptions)
            .then((response) => response.json())
            .then(result => {
                if (result.status === 200 && result.data) {
                    const entryList = JSON.parse(result.data).entry_list;
                    if (entryList && entryList.id && entryList.id.value) {
                        if (DEBUG) {

                            console.log("Entry ID:", entryList.id.value);
                        }
                        modeuleID = entryList.id.value
                        CreateMSActivity(modeuleID, formData);


                        if (isUpdate) {
                            handleToast(`${formData.module} updated successfully`, 'success');
                        } else {
                            handleToast(`${formData.module} created successfully`, 'success');
                        }
                    } else {
                        console.error("Error: Unable to find ID in response");
                        handleToast('Failed to create entry', 'error');
                    }
                } else {
                    console.error("Error:", result.message);
                    handleToast('Failed to create entry', 'error');
                }
            })
            .catch(error => {
                console.error("Error:", error);
                handleToast('Failed to create entry', 'error');
            })
            .finally(() => {
                setLoading(false); // Set loading state to false after API call completes
            });

    }

}

export default PostCalendarAPI


export const getModuleID = () => {
    return modeuleID
}










const CreateMSActivity = (modeuleID, formData) => {

    const { API_Key } = GetUserData()
    const API_URL = CRM_Url()
    const LoginToken = CRM_Token()
    const saveEvent = CalendarEvent()

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${LoginToken}`)
    const raw = JSON.stringify({
        "Api-Key": API_Key,
        "module_name": "PL_Calendar",
        "name_value_list": {
            "event_id": saveEvent,
            "bean_module": formData.module,
            "bean_id": modeuleID,
            "provider": "Microsoft"
        }
    });

    const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };
    fetch(`${API_URL}set_entry`, requestOptions)
        // fetch("https://demo.signifycrm.net/outlook-addin/rest_api/v1/rest/set_entry", requestOptions)
        .then((response) => response.json())
        .then(result => {
            if (result.status === 200 && result.data) {
                const entryList = JSON.parse(result.data).entry_list;
                // if (entryList && entryList.id && entryList.event_id.value) {
                const calendarID = entryList.event_id.value
                if (DEBUG) {

                    console.log(" MS_CALENDAR_ID:", calendarID);
                }

            }
        })
        .catch(error => {
            console.error("Error:", error);

        })

}
