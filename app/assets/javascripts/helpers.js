function getVideoTracks(tracks){
    return tracks.filter(track => track.type === VIDEO_TYPE);
}

function getAudioTracks(tracks){
    return tracks.filter(track => track.type === AUDIO_TYPE);
}