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