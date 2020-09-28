import React from 'react';
import Video from 'twilio-video';


export const UnsupportedBrowserWarning = ({ children }) =>
    !Video.isSupported
        ? (
            <div>
                <h4>Browser or context not supported</h4>
                <p>
                    Please open this application in one of the{' '}
                    <a href="https://www.twilio.com/docs/video/javascript#supported-browsers"
                        target="_blank"
                    >supported browsers</a>
                    .
                    <br />
                    If you are using a supported browser, please ensure that this app is served over a{' '}
                    <a href="https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts"
                        target="_blank"
                    >secure context</a>{' '}
                    (e.g. https or localhost).
                </p>
            </div>
        )
        : children;
