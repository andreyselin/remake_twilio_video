import React from 'react';
import { useTrack } from '../../hooks/useTrack';
import { AudioTrack } from '../AudioTrack';
import { VideoTrack } from '../VideoTrack';


export function Publication({ publication, isLocal, disableAudio, videoPriority }) {
    const track = useTrack(publication);

    if (!track) return null;

    switch (track.kind) {
        case 'video':
            return (
                <VideoTrack
                    track={ track }
                    priority={ videoPriority }
                    isLocal={ track.name.includes('camera') && isLocal }
                />
            );
        case 'audio':
            return disableAudio ? null : <AudioTrack track={ track } />;
        default:
            return null;
    }
}
