// hooks/useModuleAPI.js
import { useEffect, useState } from 'react';
import GetModuleAPI from '../CalendarServices/CalendarAPIs/GetModuleAPI';


const useModuleAPI = () => {
    const [moduleData, setModuleData] = useState({ pID: '', mID: '', type: '' });

    useEffect(() => {
        const { pID, mID, type } = GetModuleAPI();
        setModuleData({ pID, mID, type });
    }, []);

    return moduleData;
};

export default useModuleAPI;
