import React, { createContext, useContext, useState, useEffect } from 'react';
import { Participant, Room } from 'twilio-video';



export const selectedParticipantContext = createContext(null);

export function useSelectedParticipant() {
    const [selectedParticipant, setSelectedParticipant] = useContext(selectedParticipantContext);
    return [selectedParticipant, setSelectedParticipant];
}

// Clears selected participant when it disconnects
// and pulls a method to select a Participant to context

export function SelectedParticipantProvider({ room, children }) {
    const [selectedParticipant, _setSelectedParticipant] = useState(null);
    const setSelectedParticipant = (participant) =>
        _setSelectedParticipant(prevParticipant =>
            (prevParticipant === participant ? null : participant));

    useEffect(() => {
        const onDisconnect = () => _setSelectedParticipant(null);
        room.on('disconnected', onDisconnect);
        return () => {
            room.off('disconnected', onDisconnect);
        };
    }, [room]);

    return (
        <selectedParticipantContext.Provider value={[selectedParticipant, setSelectedParticipant]}>
            {children}
        </selectedParticipantContext.Provider>
    );
}
