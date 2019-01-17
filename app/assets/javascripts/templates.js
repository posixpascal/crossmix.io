const ADD_TRACK_TEMPLATE = (track) => {
    return $(`
    <div data-index="${track.index}" id="track-${track.index}" class="input-group input-group-alternative py-1">
      <input class="form-control" data-input="url" value="${track.url}" placeholder="Any Youtube URL">
       <div class="input-group-append">
            <span class="input-group-text"><i class="fa fa-${track.provider.icon}" data-icon></i></span>
          </div>
    </div>`);
};

const LOADING_TEMPLATE = () => {
    return `
          <div class="loader">
              <div class="inner one"></div>
              <div class="inner two"></div>
              <div class="inner three"></div>
            </div>

    `;
};