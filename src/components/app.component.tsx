import React from 'react';
import ReactDOM from 'react-dom/client';
import { Library } from '../api/Settings';
import { Status } from './cards/board';
import CardsComponent from './cards/cards.component';
import HeaderComponent from './header.component';
import { uniqueId } from './utils';

interface Props {
    libraries: Library[]
}

interface State {
    selectedLibraries: Library[];
    hearts: number;
    status: Status;
    page: "game" | "gameover" | "win"
}

class AppComponent extends React.Component<Props, State> {
    private readonly libraries: Library[];

    constructor(props: Props) {
        super(props);

        this.libraries = props.libraries;


        this.state = ({ selectedLibraries: this.libraries, hearts: 5, page: "game", status: null });

        this.newGame = this.newGame.bind(this);
        this.onFail = this.onFail.bind(this);
        this.onStatusChange = this.onStatusChange.bind(this);
    }

    onStatusChange(status: Status) {
        this.modifyState(s => {
            s.status = status;
            if (status.passed === status.total) {
                s.page = "win";
            }
        });
    }

    onFail() {
        this.modifyState(s => {
            s.hearts = Math.max(0, s.hearts - 1);
            if (s.hearts === 0) {
                s.page = "gameover";
            }
        });
    }

    newGame() {
        this.setState(prevState => ({ selectedLibraries: this.libraries, hearts: 5, page: "game", status: null }));
    }

    render() {

        return (
            <div>
                <HeaderComponent key={uniqueId()} hearts={this.state.hearts} status={this.state.status} />
                {this.state.page === "game" &&
                    <CardsComponent libraries={this.state.selectedLibraries} onFail={this.onFail} onStatusChange={this.onStatusChange} />
                }
                {(this.state.page === "gameover" || this.state.page === "win") &&
                    <div className="finish">
                        <div className={this.state.page}></div>
                        <button onClick={this.newGame}>New Game</button>
                    </div>
                }
            </div>
        );
    }

    private modifyState(stateModifier: (prevState: State) => void) {
        this.setState(prevState => {
            stateModifier(prevState);
            return (prevState);
        });
    }
}

window.bridge.sendSettings((event, settings) => {
    const libraries = [settings.libraries[0]];

    const root = ReactDOM.createRoot(document.getElementById("root"));

    root.render(<AppComponent libraries={libraries} />);
});

window.electronAPI.getSettings();
