import React from 'react';
import ReactDOM from 'react-dom';


class Button extends React.Component {
    handleClick = () => {
        this.props.onClickFunction(this.props.incrementValue);
    };

    render() {
        return (
            <button onClick={this.handleClick}>
                +{this.props.incrementValue}
            </button>
        );
    }
}

const Result = (props) => {
    return (
        <div>{props.counter}</div>
    );
};

class App extends React.Component {
    state = { counter: 0 };

    incrementCounter = (incrementValue) => {
        this.setState((prevState) => ({
            counter: prevState.counter + incrementValue
        }));
    };

    render() {
        return (
            <div>
                <Button onClickFunction={this.incrementCounter} incrementValue={1} />
                <Button onClickFunction={this.incrementCounter} incrementValue={5} />
                <Button onClickFunction={this.incrementCounter} incrementValue={10} />
                <Button onClickFunction={this.incrementCounter} incrementValue={100} />
                <Result counter={this.state.counter} />
            </div>
        );
    }
}



ReactDOM.render(<App />, document.getElementById('app'));