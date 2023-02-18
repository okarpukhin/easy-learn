import { Card, Library } from "../api/Settings";
import ArrayUtils from "../utils/array-utils";


class Board {
    private readonly library: Library;
    private readonly maxCards = 4;

    readonly cards: Card[];
    readonly correctCard: Card;

    constructor(library: Library){
        this.library = library;
        
        this.cards = ArrayUtils.shuffle(this.library.cards).slice(0, this.maxCards);
        this.correctCard = this.cards[Math.floor(Math.random() * this.maxCards)];

        window.electronAPI.playAudio(this.library.name + "/" + this.correctCard.name + ".mp3");
    }
}

export { Board };