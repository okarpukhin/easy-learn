import React from 'react';
import { Status } from './cards/board';

interface Props {
    hearts: number;
    status: Status;
}

class HeaderComponent extends React.Component<Props> {
    readonly hearts: number;
    readonly status: Status;

    constructor(props: Props) {
        super(props);

        this.hearts = props.hearts;
        this.status = props.status;
    }

    render() {
        const items: any[] = [];
        for (let i = 0; i < this.hearts; i++) {
            items.push(<span>💖</span>);
        }

        return (
            <div className="header">
                <div className="hearts">{items}</div>
                {this.status &&
                    <div className="status">{this.status.passed}/{this.status.total}</div>
                }
            </div>
        );
    }
}

export default HeaderComponent;