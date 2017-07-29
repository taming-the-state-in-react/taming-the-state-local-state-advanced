import React from 'react';

class App extends React.Component {
  render() {
    return (
      <CounterContainer />
    );
  }
}

const incrementUpdate = prevState => ({
  counter: prevState.counter + 1
});

const decrementUpdate = prevState => ({
  counter: prevState.counter - 1
});

class CounterContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0
    };

    this.onIncrement = this.onIncrement.bind(this);
    this.onDecrement = this.onDecrement.bind(this);
  }

  onIncrement() {
    this.setState(incrementUpdate);
  }

  onDecrement() {
    this.setState(decrementUpdate);
  }

  render() {
    return <CounterPresenter
      counter={this.state.counter}
      onIncrement={this.onIncrement}
      onDecrement={this.onDecrement}
    />
  }
}

function CounterPresenter(props) {
  return (
    <div>
      <p>{props.counter}</p>
      <button type="button" onClick={props.onIncrement}>
        Increment
      </button>
      <button type="button" onClick={props.onDecrement}>
        Decrement
      </button>
    </div>
  );
}

export default App;
