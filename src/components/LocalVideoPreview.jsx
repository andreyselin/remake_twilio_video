import React from 'react';
import { VideoTrack } from './VideoTrack';
import { useVideoContext } from '../hooks/useVideoContext';

export function LocalVideoPreview() {
    const { localTracks } = useVideoContext();

    const videoTrack = localTracks.find(track => track.name.includes('camera'));

    return videoTrack
        ? <VideoTrack track={videoTrack} isLocal />
        : <div>LocalVideoPreview Error</div>;
}
