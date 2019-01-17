const PATTERNS = {
    'youtube': /^https?:\/\/(?:www\.)?(?:youtube\.com|youtu\.be)(?:\/[^?]+\?v=|)([\w|-]+)/
};

class Provider {
    constructor(){
        this.icon = "link";
        this.name = "generic";
    }

    update(input){
        input.find("[data-icon]").addClass(`fa-${this.icon}`);
    }

    static for(url){
        const providers = Object.keys(PATTERNS);
        let provider = new Provider(url);

        for (let i = 0; i < providers.length; i++){
            const providerName = providers[i];
            const pattern = PATTERNS[providerName];
            const matches = url.match(pattern);
            if (!matches) {
                continue;
            }

            provider = Provider.create(providerName, matches[0]);
        }

        return provider;
    }

    static create(name, url){
        switch (name){
            case YOUTUBE:
                return new YoutubeProvider(url);
            default:
                return new Provider();
        }
    }
}

