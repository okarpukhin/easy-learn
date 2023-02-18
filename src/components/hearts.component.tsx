import React from 'react';

interface Props {
    hearts: number;
}

class HeartsComponent extends React.Component<Props> {
    readonly hearts: number;

    constructor(props: Props) {
        super(props);

        this.hearts = props.hearts;
    }

    render() {
        const items: any[] = [];
        for (let i = 0; i < this.hearts; i++) {
            items.push(<span>💖</span>);
        }

        return (<div className="hearts">{items}</div>);
    }
}

export default HeartsComponent;