import React from 'react';
import { useRoomState } from "../hooks/useRoomState";
import { useHeight } from "../hooks/useHeight";
import { MenuBar } from "./MenuBar";
import { LocalVideoPreview } from "./LocalVideoPreview";
import { Room } from "./Room";

export function App() {
    const roomState = useRoomState();

    // Here we would like the height of the main container to be the height of the viewport.
    // On some mobile browsers, 'height: 100vh' sets the height equal to that of the screen,
    // not the viewport. This looks bad when the mobile browsers location bar is open.
    // We will dynamically set the height with 'window.innerHeight', which means that this
    // will look good on mobile browsers even after the location bar opens or closes.
    const height = useHeight();

    return (
        <div style={{ height }}>
            <MenuBar />
            <div style={{ minHeight: '200px' }}>
                {roomState === 'disconnected' ? <LocalVideoPreview /> : <Room />}
            </div>
            {/*<ReconnectingNotification />*/}
        </div>
    );
}
