import { Library } from "../../api/Settings";
import { AudioCard } from "./audio-card";
import ArrayUtils from "../../utils/array-utils";

interface Status {
    passed: number,
    total: number,
}

class Board {
    private readonly libraries: Library[];
    private readonly maxCards = 4;

    private readonly allShuffledCards: AudioCard[];
    private readonly passedCards: AudioCard[] = [];

    cards: AudioCard[];
    correctCard: AudioCard;

    constructor(libraries: Library[]) {
        this.libraries = libraries;

        let allCards = this.libraries.flatMap(l => l.cards.map(c => new AudioCard(c.name, l.name)));
        this.allShuffledCards = ArrayUtils.shuffle(allCards);

        this.createNewBoard();
    }

    addPassedCard(card: AudioCard) {
        if (this.passedCards.indexOf(card) < 0) {
            this.passedCards.push(card);
        }
    }

    createNewBoard() {
        if (this.allShuffledCards.length === this.passedCards.length) {
            return;
        }

        this.correctCard = this.allShuffledCards.find(c => this.passedCards.indexOf(c) < 0);

        this.cards = this.allShuffledCards.filter(c => c !== this.correctCard).slice(0, this.maxCards - 1).concat(this.correctCard);
        this.cards = ArrayUtils.shuffle(this.cards);

        this.correctCard.play();
    }

    getStatus(): Status {
        return {
            passed: this.passedCards.length,
            total: this.allShuffledCards.length,
        };
    }
}

export { Board, Status };