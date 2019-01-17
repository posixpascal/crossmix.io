function getVideoTracks(tracks){
    return tracks.filter(track => track.type === VIDEO_TYPE);
}

function getAudioTracks(tracks){
    return tracks.filter(track => track.type === AUDIO_TYPE);
}

function selectElementContents(el) {
    var range = document.createRange();
    range.selectNodeContents(el);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
}

function detectmob() {
    if( navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)
    ){
        return true;
    }
    else {
        return false;
    }
}

function copy(el){
    var sel = window.getSelection();
    document.execCommand('copy');
    sel.removeAllRanges();

    const original = el.textContent;
    el.textContent = 'Copied!';
    el.classList.add('text-success');

    setTimeout(() => {
        el.textContent = original;
        el.classList.remove('text-success');
    }, 800);
}