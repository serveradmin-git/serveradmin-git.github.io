
export const CalendarEvent = () => {
    const saveEvent = Office.context.mailbox.item.itemId
    if (DEBUG) {
        console.log("saveEvent:", saveEvent);
    }

    return saveEvent
}

