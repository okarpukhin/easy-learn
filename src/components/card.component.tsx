import React from 'react';
import { Card } from '../api/Settings';

interface Props {
  card: Card;
  isCorrect: boolean;
  onSuccess: () => void;
  onFail: () => void;
}

interface State {
  isActive: boolean;
}

class CardComponent extends React.Component<Props, State> {
  readonly card: Card;
  readonly isCorrect: boolean;
  readonly onSuccess: () => void
  readonly onFail: () => void;
  constructor(props: Props) {
    super(props);

    this.card = props.card;
    this.isCorrect = props.isCorrect;
    this.onSuccess = props.onSuccess;
    this.onFail = props.onFail;

    this.state = ({ isActive: false });

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => {
      if (!prevState.isActive) {
        if (this.isCorrect) {
          this.onSuccess();
        } else {
          this.onFail();
        }
      }
      return {
        isActive: true
      };
    });
  }

  render() {
    return (<li onClick={this.handleClick} className={(this.isCorrect ? "correct" : "") + (this.state.isActive ? " active" : "")}>
      {this.card.name.toUpperCase()}
    </li>
    );
  }
}

export default CardComponent;