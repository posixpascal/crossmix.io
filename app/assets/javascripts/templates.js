const ADD_TRACK_TEMPLATE = (track) => {
    return $(`
    <div data-index="${track.index}" id="track-${track.index}" class="input-group input-group-alternative py-1">
      <input class="form-control" data-input="url" value="${track.url}" placeholder="">
       <div class="input-group-append">
            <span class="input-group-text"><i class="fa fa-${track.provider.icon}" data-icon></i></span>
          </div>
    </div>`);
};