interface Card {
    name: string;
    audio?: string;
}

interface Library {
    name: string; 
    cards: Card[];
}

interface Settings {
    libraries: Library[];
}

export { Card, Library, Settings };