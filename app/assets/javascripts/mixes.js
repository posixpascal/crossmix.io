const updateView = () => {
    $("[data-name='video-tracks']").html("");
    $("[data-name='audio-tracks']").html("");

    const mix = state.mix.getState();
    mix.tracks.forEach((track) => {
        const $tracks = $(`[data-name='${track.type}-tracks']`);
        const $track = ADD_TRACK_TEMPLATE(track);
        $tracks.append($track);
    });

    const $addVideoBtn = $(`[data-add-track='${VIDEO_TYPE}']`);
    const $addAudioBtn = $(`[data-add-track='${AUDIO_TYPE}']`);
    const videos = mix.tracks.filter(track => track.type === VIDEO_TYPE).reverse();
    const audios = mix.tracks.filter(track => track.type === AUDIO_TYPE).reverse();


    $addVideoBtn.addClass("disabled");
    if (videos.length && videos[0].url) {
        $addVideoBtn.removeClass("disabled");
    }

    $addAudioBtn.addClass("disabled");
    if (audios.length && audios[0].url) {
        $addAudioBtn.removeClass("disabled");
    }

    if (mix.private) {
        $(".public-url").addClass("invalid");
    } else {
        $(".public-url").removeClass("invalid");
    }

    let updateTimer;
    $("[data-input='url']").on("input", function () {
        const index = $(this).closest(".input-group").data("index");
        const $input = $(`#track-${index} input`);
        const type = $input.closest(".tracks").hasClass("tracks-video") ? "video" : "audio";
        const url = $input.val();
        if (updateTimer) {
            clearTimeout(updateTimer);
        }
        updateTimer = setTimeout(() => {
            updateTrack({
                type,
                url,
                index,
                provider: Provider.for(url)
            });
            setTimeout(() => {
                const mix = state.mix.getState();
                $.ajax({
                    url: "/mixes/" + mix.name + "?key=" + (window.location.hash.substr(1) || ""),
                    method: "PATCH",
                    data: {mix},
                    success: () => {
                        console.log("saved");
                    }
                });
            }, 100);
        }, 200);
    });
}


const addTrack = (type) => {
    state.mix.dispatch({
        type: ACTION_ADD_TRACK,
        payload: {
            type,
            url: "",
            provider: {
                icon: "link"
            }
        }
    });

    if (localStorage.getItem(type + "_value")) {
        const url = localStorage.getItem(type + "_value")
        updateTrack({
            type,
            url,
            index: type === 'video' ? 1 : 2,
            provider: Provider.for(url)
        });
    }
};

const updateTrack = (payload) => {
    state.mix.dispatch({
        type: ACTION_UPDATE_TRACK,
        payload
    });
};

const addVideoTrack = () => addTrack(VIDEO_TYPE);
const addAudioTrack = () => addTrack(AUDIO_TYPE);

let inited = false;
const initMixPanel = () => {
    $(() => {
        state.mix.subscribe(() => {
            updateView();
            if (!inited) {
                inited = true;
                initPlayer();
            }
        });


        $("[data-add-track]").on("click", function () {
            const type = $(this).data("add-track");
            (type === 'video') ? addVideoTrack() : addAudioTrack();
        });

        $("[name='mix[title]']").on("change", function () {
            state.mix.dispatch({
                type: ACTION_SET_TITLE,
                payload: $(this).val()
            })
        });

        $("[data-input='private']").on("change", function () {
            state.mix.dispatch({
                type: ACTION_SET_PRIVATE,
                payload: $("[data-input='private']").is(":checked")
            })
        });

        addVideoTrack();
        addAudioTrack();
    });
};