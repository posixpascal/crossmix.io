let videoReady = false;
let audioReady = false;
let videoPlayer;
let audioPlayer;


const onVideoPlayerReady = (event) => {
    console.log("ready");
    videoReady = true;
    if (videoReady && audioReady) {
        startPlayer();
    }
};

const onAudioPlayerReady = (event) => {
    audioReady = true;
    if (videoReady && audioReady) {
        startPlayer();
    }
};

const startPlayer = () => {
    $("#video_loader").html("");
    videoPlayer.play();
    audioPlayer.play();
};

const initPlayer = () => {
    if (typeof Plyr === "undefined") {
        setTimeout(() => {
            initPlayer();
        }, 50);
        return;
    }

    const mix = state.mix.getState();

    const video = mix.tracks.filter(track => track.type === VIDEO_TYPE)[0];
    const audio = mix.tracks.filter(track => track.type === AUDIO_TYPE)[0];
    if (!audio || !video) {
        setTimeout(() => {
            initPlayer()
        }, 50);
        return;
    }

    state.mix.subscribe(() => {
        $("#audio").html("");
        $("#video_loader").html(LOADING_TEMPLATE);
        $("#video").attr("data-plyr-embed-id", video.provider.videoId);
        $("#audio").attr("data-plyr-embed-id", audio.provider.videoId);

        const defaultOptions = {
            debug: false,
            autoplay: !detectmob(),
            autopause: false,
            height: 300,
            width: 300,
            loop: {
                active: true
            }
        };

        if (!videoPlayer){
            videoPlayer = new Plyr('#video', {
                ...defaultOptions,
                muted: true
            });
            videoPlayer.on("pause", () => {
                audioPlayer.pause();
            });
            videoPlayer.on("play", () => {
                audioPlayer.play();
            });

            videoPlayer.on("ended", () => {
                audioPlayer.currentTime = 0;
                videoPlayer.currentTime = 0;
                videoPlayer.play();
            });

            videoPlayer.on("seeked", () => {
                audioPlayer.currentTime = videoPlayer.currentTime;
            });
            videoPlayer.on("ready", onVideoPlayerReady);

        } else {
            videoPlayer.source = {
                type: 'video',
                sources: [
                    {
                        src: video.provider.videoId,
                        provider: 'youtube',
                    },
                ],
            };
        }



        if (!audioPlayer){
            audioPlayer = new Plyr('#audio', {
                ...defaultOptions,
            });

            audioPlayer.on("ready", onAudioPlayerReady);
        } else {
            audioPlayer.source = {
                type: 'audio',
                    sources: [
                {
                    src: audio.provider.videoId,
                    provider: 'youtube',
                },
            ],
            };
        }
    });
};