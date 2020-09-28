import React from 'react';
import { UnsupportedBrowserWarning } from './UnsupportedBrowserWarning';
import { VideoProvider } from './VideoProvider';
import { useConnectionOptions } from "../utilities/useConnectionOptions";

export const VideoApp = () => {
    const setError = e => console.log('Error =>', e);
    const connectionOptions = useConnectionOptions();

    return (
        <UnsupportedBrowserWarning>
            <VideoProvider options={connectionOptions} onError={ setError }>
                1
                {/*<App />*/}
            </VideoProvider>
        </UnsupportedBrowserWarning>
    );
};
