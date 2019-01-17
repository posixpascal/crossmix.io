class YoutubeProvider extends Provider {
    constructor(url){
        super();
        this.icon = "youtube";
        this.name = "youtube";


        const pattern = PATTERNS.youtube;
        const matches = url.match(pattern);
        console.log(matches, url);
        this.videoId = matches[7];
    }
}