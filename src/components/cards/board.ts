import { Library } from "../../api/Settings";
import { AudioCard } from "./audio-card";
import ArrayUtils from "../../utils/array-utils";

interface Status {
    passed: number,
    total: number,
}

class Board {
    private readonly maxCards = 4;

    private readonly allCards: AudioCard[];
    private readonly passedCards: AudioCard[] = [];

    cards: AudioCard[];
    correctCard: AudioCard;

    constructor(libraries: Library[]) {
        this.allCards = libraries.flatMap(l => l.cards.map(c => new AudioCard(c.name, l.name)));
        this.createNewBoard();
    }

    addPassedCard(card: AudioCard) {
        if (this.passedCards.indexOf(card) < 0) {
            this.passedCards.push(card);
        }
    }

    createNewBoard() {
        if (this.allCards.length === this.passedCards.length) {
            return;
        }

        let shuffledCards = ArrayUtils.shuffle(this.allCards);
        this.correctCard = shuffledCards.find(c => this.passedCards.indexOf(c) < 0);

        shuffledCards.sort((c1, c2) => {
            return compareByCommonPart(this.correctCard, c2) - compareByCommonPart(this.correctCard, c1);
        });

        this.cards = shuffledCards.filter(c => c !== this.correctCard).slice(0, this.maxCards - 1).concat(this.correctCard);
        this.cards = ArrayUtils.shuffle(this.cards);

        this.correctCard.play();
    }

    getStatus(): Status {
        return {
            passed: this.passedCards.length,
            total: this.allCards.length,
        };
    }
}

function compareByCommonPart(card1: AudioCard, card2: AudioCard): number {
    let result = 0;
    for (let i = 0; i < card1.name.length; i++) {
        if (card1.name.charAt(i) === card2.name.charAt(i)) {
            result++;
        } else {
            break;
        }
    }
    return result;
}

export { Board, Status };