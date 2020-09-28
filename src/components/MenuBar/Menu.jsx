import React, { useState, useRef, useCallback } from 'react';
import MenuContainer from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { useAppState } from '../../state';
import { useVideoContext } from '../../hooks/useVideoContext';

export function Menu() {
    const { user, signOut } = useAppState();
    const { room, localTracks } = useVideoContext();

    const [aboutOpen, setAboutOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);

    const anchorRef = useRef(null);

    const handleSignOut = useCallback(() => {
        room.disconnect && room.disconnect();
        localTracks.forEach(track => track.stop());
        signOut && signOut();
    }, [room.disconnect, localTracks, signOut]);

    return (
        <div ref={anchorRef}>
            <MenuContainer open={menuOpen} onClose={() => setMenuOpen(state => !state)} anchorEl={anchorRef.current}>
                {user?.displayName && <MenuItem disabled>{user.displayName}</MenuItem>}
                <MenuItem onClick={() => setAboutOpen(true)}>About</MenuItem>
                <MenuItem onClick={() => setSettingsOpen(true)}>Settings</MenuItem>
                {user && <MenuItem onClick={handleSignOut}>Logout</MenuItem>}
            </MenuContainer>
        </div>
    );
}
