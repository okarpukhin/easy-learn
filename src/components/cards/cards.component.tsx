import React from 'react';
import CardComponent from './card.component';
import { Board, Status } from "./board";
import { AudioCard } from "./audio-card";
import { Library } from '../../api/Settings';
import { uniqueId } from '../utils';

interface Props {
    libraries: Library[];
    onFail: () => void;
    onStatusChange: (status: Status) => void;
}

interface State {
    cards: AudioCard[];
    boardId: string;
}

class BoardComponent extends React.Component<Props, State> {
    readonly board: Board;
    readonly props: Props;

    constructor(props: Props) {
        super(props);

        this.board = new Board(props.libraries);
        this.state = ({ cards: this.board.cards, boardId: uniqueId() });

        this.onSuccess = this.onSuccess.bind(this);
        this.onFail = this.onFail.bind(this);

        this.props.onStatusChange(this.board.getStatus());
    }

    onSuccess() {
        setTimeout(() => {
            this.board.addPassedCard(this.board.correctCard);
            this.board.createNewBoard();
            this.setState(prevState => ({ cards: this.board.cards, boardId: uniqueId() }));

            this.props.onStatusChange(this.board.getStatus());
        }, 1000);
    }

    onFail() {
        this.props.onFail();
        this.setState(prevState => ({ cards: prevState.cards, boardId: prevState.boardId }));
    }

    render() {
        const listItems = this.state.cards.map(card => (
            <CardComponent
                key={this.state.boardId + ".card." + card.name}
                card={card}
                isCorrect={card === this.board.correctCard}
                onSuccess={this.onSuccess}
                onFail={this.onFail} />
        ));

        return (
            <div className='cards'>
                <ul key={this.state.boardId}>{listItems}</ul>
                <button onClick={this.board.correctCard.play}>Listen</button>
            </div>
        );
    }
}

export default BoardComponent;