

import CRM_Url from "../../../Hooks/CRM_Url";
import CRM_Token from "../../../Oauth/CRM_Token";
import { GetUserData } from "../../../Oauth/GetUserData";
import { CalendarEvent } from "../../CalendarHook/CalendarEvent";

export const GetMsActivity = (callback: (result: { getBeanID: string, getBeanModule: string } | null) => void) => {
    // Fetching required values from other modules
    const { API_Key } = GetUserData();
    const API_URL = CRM_Url();
    const LoginToken = CRM_Token();
    const saveEvent = CalendarEvent();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${LoginToken}`);

    const raw = JSON.stringify({
        "Api-Key": API_Key,
        "module_name": "PL_Calendar",
        "select_fields": [
            "event_id",
            "bean_module",
            "bean_id"
        ],
        "str_query": `pl_calendar.event_id = '${saveEvent}' AND provider = 'Microsoft'`,
        "str_order_by": "",
        "offset": 0,
        "link_name_to_fields_array": "",
        "max_results": 1,
        "deleted": "false"
    });

    const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch(`${API_URL}get_entry_list`, requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result.status === 200 && result.data) {
                const getBeanID = result.data.entry_list[0].name_value_list.bean_id.value;
                const getBeanModule = result.data.entry_list[0].name_value_list.bean_module.value;
                window.localStorage.setItem("getBeanModule", getBeanModule);
                if (DEBUG) {

                    console.log("getcalendarID:", getBeanID);
                }
                const beanObject = {
                    getBeanID,
                    getBeanModule
                };
                callback(beanObject); // Return the result through the callback
            } else {
                if (DEBUG) {

                    console.error("Error", result.message);
                }
                callback(null); // Return null in case of an error
            }
        })
        .catch(error => {
            if (DEBUG) {

                console.error("Error:", error);
            }
            callback(null); // Return null in case of a catch error
        });
};
