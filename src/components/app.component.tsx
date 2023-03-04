import React from 'react';
import ReactDOM from 'react-dom/client';
import { Library } from '../api/Settings';
import { Status } from './cards/board';
import CardsComponent from './cards/cards.component';
import HeaderComponent from './header.component';
import Libraries from './settings/libraries.component';
import { uniqueId } from './utils';

interface Props {
    libraries: Library[]
}

interface State {
    selectedLibraries: Library[];
    hearts: number;
    status: Status;
    page: "game" | "gameover" | "win" | "settings"
}

class AppComponent extends React.Component<Props, State> {
    private readonly libraries: Library[];

    constructor(props: Props) {
        super(props);

        this.libraries = props.libraries;


        this.state = ({ selectedLibraries: [], hearts: 5, page: "settings", status: null });

        this.startGame = this.startGame.bind(this);
        this.openSettings = this.openSettings.bind(this);
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

    openSettings() {
        this.modifyState(s => {
            s.hearts = 5;
            s.page = "settings";
            s.status = null;
        });
    }

    startGame(selectedLibraries: Library[]) {
        console.log("startGame: " + selectedLibraries);
        this.modifyState(s => {
            s.hearts = 5;
            s.page = "game";
            s.selectedLibraries = selectedLibraries;
            s.status = null;
        });
    }

    render() {
        return (
            <div>
                {this.state.page === "settings" &&
                    <Libraries libraries={this.libraries} onSave={this.startGame} selectedLibraries={this.state.selectedLibraries} />
                }
                {this.state.page !== "settings" &&
                    <HeaderComponent key={uniqueId()} hearts={this.state.hearts} status={this.state.status} />
                }
                {this.state.page === "game" &&
                    <CardsComponent libraries={this.state.selectedLibraries} onFail={this.onFail} onStatusChange={this.onStatusChange} />
                }
                {(this.state.page === "gameover" || this.state.page === "win") &&
                    <div className="finish">
                        <div className={this.state.page}></div>
                        <button onClick={this.openSettings}>New Game</button>
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
    const libraries = settings.libraries;

    const root = ReactDOM.createRoot(document.getElementById("root"));

    root.render(<AppComponent libraries={libraries} />);
});

window.electronAPI.getSettings();
