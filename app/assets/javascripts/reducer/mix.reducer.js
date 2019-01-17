const initialState = {
    tracks: [],
    title: "",
    private: false,
    ...window.MIX
};

/**
 * Interface von Track:
 *
 * interface Track {
 *     title: string;
 *     url: ""
 *     provider: "youtube",
 *     ready: boolean
 * }
 * @param state
 * @param action
 * @returns {*}
 * @constructor
 */
const Mix = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_SET_PRIVATE:
            state.private = action.payload;
            return state;
        case ACTION_SET_TITLE:
            state.title = action.payload;
            localStorage.setItem("title", state.title);
            return state;

        case ACTION_ADD_TRACK:
            action.payload.index = state.tracks.length + 1;
            return {...state, tracks: [...state.tracks, action.payload]};

        case ACTION_UPDATE_TRACK:
            const track = state.tracks[action.payload.index - 1];
            localStorage.setItem(action.payload.type + "_value", action.payload.url);
            state.tracks[action.payload.index - 1] = {...track, ...action.payload};
            return state;
        default:
            return state
    }
};