let videoReady = false;
let audioReady = false;
let videoPlayer;
let audioPlayer;


const onVideoPlayerStateChange = (event, data) => {
    const state = event.data;
    switch (state){
        case YT.PlayerState.ENDED:
            audioPlayer.playVideo();
            videoPlayer.playVideo();
            break;
        case YT.PlayerState.PLAYING:
            if (audioPlayer.getPlayerState() !== YT.PlayerState.PLAYING){
                audioPlayer.playVideo();
            }
            break;

        case YT.PlayerState.PAUSED:
            if (audioPlayer.getPlayerState() !== YT.PlayerState.PAUSED){
                audioPlayer.pauseVideo();
            }
            break;
    }
};

const onVideoPlayerReady = (event) => {
    videoPlayer = event.target;
    event.target.mute();
    videoReady = true;
    if (videoReady && audioReady){ startPlayer(); }
};

const onaudioPlayerReady = (event) => {
    audioPlayer = event.target;
    audioReady = true;
    if (videoReady && audioReady){ startPlayer(); }
};

const startPlayer = () => {
    $("#video_loader").html("");
    videoPlayer.playVideo();
    audioPlayer.playVideo();
};

const initPlayer = () => {
    if (typeof YT === "undefined" || typeof YT.Player === "undefined"){ setTimeout(() => { initPlayer(); }, 50); return; }

    const mix = state.mix.getState();

    const video = mix.tracks.filter(track => track.type === VIDEO_TYPE)[0];
    const audio = mix.tracks.filter(track => track.type === AUDIO_TYPE)[0];
    if (!audio.url || !video.url){ return; }


    $("#audio").html("");
    $("#video_loader").html(LOADING_TEMPLATE);

    const defaultOptions = {
        height: '300',
        width: '300',
        playerVars: {
            autoplay: 0,
        }
    };

     new window.YT.Player('video', {
        ...defaultOptions,
         videoId: video.provider.videoId,
         events: {
            'onReady': onVideoPlayerReady,
             'onStateChange': onVideoPlayerStateChange
        }
    });

    new window.YT.Player('audio', {
        ...defaultOptions,
        videoId: audio.provider.videoId,
        events: {
            'onReady': onaudioPlayerReady,
        }
    });

}