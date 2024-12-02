
import { useState, useEffect } from 'react';
import { GetUserData } from '../../../Oauth/GetUserData';
import CRM_Url from '../../../Hooks/CRM_Url';
import CRM_Token from '../../../Oauth/CRM_Token';
import { GetMsActivity } from './GetMsActivity';
// Type for the result from GetMsActivity
interface MsActivityResult {
    getBeanID: string;
    getBeanModule: string;
}
const useGetModuleAPI = () => {
    const [beanObject, setBeanObject] = useState(null);
    const [error, setError] = useState(null);
    const [pName, setPName] = useState(null);
    const [type, setType] = useState(null);
    const [mID, setmID] = useState(null);
    const [pID, setPID] = useState(null);
    const [pStatus, setPStatus] = useState(null);
    const [mDescription, setMDescription] = useState(null);
    const [mActionid, setMActionId] = useState(null);
    const [loading, setLoading] = useState(true); // Set to true initially

    const { API_Key } = GetUserData();
    const API_URL = CRM_Url();
    const LoginToken = CRM_Token();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Type the result as MsActivityResult
                const result = await new Promise<MsActivityResult>((resolve, reject) => {
                    GetMsActivity((result) => {
                        if (result) {
                            resolve(result as MsActivityResult);
                        } else {
                            reject(new Error('Failed to retrieve data'));
                        }
                    });
                });
                console.log("Bean ID:", result.getBeanID);
                console.log("Bean Module:", result.getBeanModule);

                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                myHeaders.append("Authorization", `Bearer ${LoginToken}`);

                const raw = JSON.stringify({
                    "Api-Key": API_Key,
                    "module_name": result.getBeanModule,
                    "id": result.getBeanID,
                    "select_fields": [
                        "id",
                        "name",
                        "action_id",
                        "status",
                        "parent_type",
                        "parent_id",
                        "parent_name",
                        "description"
                    ]
                });

                const requestOptions: RequestInit = {
                    method: "POST",
                    headers: myHeaders,
                    body: raw,
                    redirect: "follow"
                };

                const response = await fetch(`${API_URL}get_entry`, requestOptions);
                const data = await response.json();

                if (data.status === 200 && data.data) {
                    const getModules = data.data.entry_list[0].name_value_list;
                    if (DEBUG) {

                        console.log("getModules:", getModules);
                    }
                    setPID(getModules.parent_id.value);
                    setPName(getModules.parent_name.value);
                    setType(getModules.parent_type.value);
                    setmID(getModules.id.value);
                    setPStatus(getModules.status.value);
                    setMDescription(getModules.description.value);
                    setMActionId(getModules.action_id.value);
                } else {
                    console.error("Error:", data.message);
                    setError(data.message);
                }
            } catch (error) {
                console.error("Error:", error);
                setError(error.message);
            } finally {
                setLoading(false); // Set loading to false after the API call is complete
            }
        };

        fetchData();
    }, [API_Key, API_URL, LoginToken]);

    return { beanObject, pID, mID, pName, type, pStatus, mDescription, mActionid, error, loading };
};

export default useGetModuleAPI;
