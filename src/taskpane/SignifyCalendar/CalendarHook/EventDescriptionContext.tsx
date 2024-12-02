import React, { createContext, useState, useContext, ReactNode } from 'react';

interface EventDescriptionContextType {
    eventDescription: string;
    setEventDescription: React.Dispatch<React.SetStateAction<string>>;
}

const EventDescriptionContext = createContext<EventDescriptionContextType | undefined>(undefined);

export const EventDescriptionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [eventDescription, setEventDescription] = useState<string>('');

    return (
        <EventDescriptionContext.Provider value={{ eventDescription, setEventDescription }}>
            {children}
        </EventDescriptionContext.Provider>
    );
};

export const useEventDescription = (): EventDescriptionContextType => {
    const context = useContext(EventDescriptionContext);
    if (context === undefined) {
        throw new Error('useEventDescription must be used within an EventDescriptionProvider');
    }
    return context;
};
