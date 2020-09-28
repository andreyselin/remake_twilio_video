import React from 'react';
import { UnsupportedBrowserWarning } from './UnsupportedBrowserWarning';
import { VideoProvider } from './VideoProvider';
import { useConnectionOptions } from "../utilities/useConnectionOptions";
import { App } from "../components/App";

export const VideoApp = () => {
    const setError = e => console.log('Error =>', e);
    const connectionOptions = useConnectionOptions();

    return (
        <UnsupportedBrowserWarning>
            <VideoProvider options={connectionOptions} onError={ setError }>
                <App />
            </VideoProvider>
        </UnsupportedBrowserWarning>
    );
};
