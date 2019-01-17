class YoutubeProvider extends Provider {
    constructor(url){
        super();
        this.icon = "youtube";


        const pattern = PATTERNS.youtube;
        const matches = url.match(pattern);

        this.videoId = matches[1];
    }
}