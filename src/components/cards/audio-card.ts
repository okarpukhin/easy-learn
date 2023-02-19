class AudioCard {
    readonly name: string;
    readonly library: string;

    constructor(name: string, library: string) {
        this.name = name;
        this.library = library;
    }

    play():void {
        window.electronAPI.playAudio(this.library + "/" + this.name + ".mp3");
    }
}

export { AudioCard };