import React, { createContext, ReactNode } from 'react';
import {
    CreateLocalTrackOptions,
    ConnectOptions,
    LocalAudioTrack,
    LocalVideoTrack,
    Room,
    TwilioError,
} from 'twilio-video';
import { SelectedParticipantProvider } from './useSelectedParticipant';
import useHandleRoomDisconnectionErrors from './useHandleRoomDisconnectionErrors';
import useHandleOnDisconnect from './useHandleOnDisconnect';
import useHandleTrackPublicationFailed from './useHandleTrackPublicationFailed';
import useLocalTracks from './useLocalTracks';
import useRoom from './useRoom';


export const VideoContext = createContext(null);

export function VideoProvider(
    {
        options,
        children,
        onError = () => {},
        onDisconnect = () => {}
    }
) {

    const onErrorCallback = error => {
        console.log(`ERROR: ${error.message}`, error);
        onError(error);
    };

    const {
        localTracks,
        getLocalVideoTrack,
        getLocalAudioTrack,
        isAcquiringLocalTracks,
        removeLocalVideoTrack,
    } = useLocalTracks();
    const { room, isConnecting, connect } = useRoom(localTracks, onErrorCallback, options);

    // Register onError and onDisconnect callback functions.
    useHandleRoomDisconnectionErrors(room, onError);
    useHandleTrackPublicationFailed(room, onError);
    useHandleOnDisconnect(room, onDisconnect);

    return (
        <VideoContext.Provider
            value={{
                room,
                localTracks,
                isConnecting,
                onError: onErrorCallback,
                onDisconnect,
                getLocalVideoTrack,
                getLocalAudioTrack,
                connect,
                isAcquiringLocalTracks,
                removeLocalVideoTrack,
            }}
        >
            <SelectedParticipantProvider room={room}>{children}</SelectedParticipantProvider>
        </VideoContext.Provider>
    );
}
