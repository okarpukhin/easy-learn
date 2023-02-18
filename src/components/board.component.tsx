import React from 'react';
import CardComponent from './card.component';
import HeartsComponent from './hearts.component';
import { Board } from "./board.model";
import { Library } from '../api/Settings';

interface Props {
    library: Library;
}

interface State {
    board: Board;
    hearts: number;
    boardId: number;
}

class BoardComponent extends React.Component<Props, State> {
    readonly library: Library;

    constructor(props: Props) {
        super(props);

        this.library = props.library;

        this.state = ({ board: new Board(this.library), hearts: 0, boardId: new Date().getTime() });

        this.onSuccess = this.onSuccess.bind(this);
        this.onFail = this.onFail.bind(this);
    }

    onSuccess() {
        setTimeout(() => {
            this.setState(prevState => ({ board: new Board(this.library), hearts: prevState.hearts + 1, boardId: new Date().getTime() }));
        }, 1000);
    }

    onFail() {
        this.setState(prevState => ({ board: prevState.board, hearts: prevState.hearts > 0 ? prevState.hearts - 1 : 0, boardId: prevState.boardId }));
    }

    render() {
        const listItems = this.state.board.cards.map(card => (
            <CardComponent
                key={this.state.boardId + ".card." + card.name}
                card={card}
                isCorrect={card === this.state.board.correctCard}
                onSuccess={this.onSuccess}
                onFail={this.onFail} />
        ));

        const hearts: any[] = [];
        for (let i = 0; i < this.state.hearts; i++) {
            hearts.push(<span>💖</span>);
        }

        return (
            <div key={this.state.boardId}>
                <ul>{listItems}</ul>
                <HeartsComponent key={"hearts_" + this.state.hearts} hearts={this.state.hearts}/>
            </div>
        );
    }
}

export default BoardComponent;