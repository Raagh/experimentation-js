import React from 'react';
import ReactDOM from 'react-dom';


const Stars = (props) => {
    let stars = [];
    for (let i = 0; i < props.numberOfStars; i++) {
        stars.push(<i className="fa fa-star"></i>);
    }

    return (
        <div className="col-5">
            {stars}
        </div>
    );
}

const Button = (props) => {
    return (
        <div className="col-2">
            <button>=</button>
        </div>
    );
}

const Answer = (props) => {
    return (
        <div className="col-5">
            {props.selectedNumbers.map((number, i) =>
                <span onClick={() => props.unSelectNumber(number)} key={i}>{number}</span>
            )}
        </div>
    );
}

const Numbers = (props) => {
    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    const numberClassName = (number) => {
        if (props.selectedNumbers.indexOf(number) >= 0) {
            return 'selected';
        }
    }

    return (
        <div className="card text-center">
            <div>
                {numbers.map((number, i) =>
                    <span onClick={() => props.selectNumber(number)} key={i} className={numberClassName(number)}>{number}</span>
                )}
            </div>
        </div>
    );
}


class Game extends React.Component {
    state = {
        selectedNumbers: [],
        numberOfStars: 1 + Math.floor(Math.random() * 9)
    };

    selectNumber = (clickedNumber) => {
        if (this.state.selectedNumbers.indexOf(clickedNumber) >= 0) { return 0; }
        this.setState(prevState => ({
            selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
        }));
    };

    unSelectNumber = (clickedNumber) => {
        this.setState(prevState => ({
            selectedNumbers: prevState.selectedNumbers.filter(number => number !== clickedNumber)
        }));
    };

    render() {
        const { selectedNumbers, numberOfStars } = this.state;
        return (
            <div className="container">
                <h3>Play Nine</h3>
                <hr />
                <div className="row">
                    <Stars numberOfStars={this.state.numberOfStars} />
                    <Button />
                    <Answer unSelectNumber={this.unSelectNumber} selectedNumbers={this.state.selectedNumbers} />
                </div>
                <br />
                <Numbers selectNumber={this.selectNumber} selectedNumbers={this.state.selectedNumbers} />
            </div>
        );
    }
}


class App extends React.Component {
    render() {
        return (
            <div>
                <Game />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));