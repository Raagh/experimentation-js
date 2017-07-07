import React from 'react';
import ReactDOM from 'react-dom';

let possibleCombinationSum = function (arr, n) {
    if (arr.indexOf(n) >= 0) { return true; }
    if (arr[0] > n) { return false; }
    if (arr[arr.length - 1] > n) {
        arr.pop();
        return possibleCombinationSum(arr, n);
    }
    let listSize = arr.length, combinationsCount = (1 << listSize)
    for (let i = 1; i < combinationsCount; i++) {
        let combinationSum = 0;
        for (let j = 0; j < listSize; j++) {
            if (i & (1 << j)) { combinationSum += arr[j]; }
        }
        if (n === combinationSum) { return true; }
    }
    return false;
};


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
    let button;

    switch (props.answerIsCorrect) {
        case true:
            button = <button className="btn btn-success" onClick={props.acceptAnswer}>
                <i className="fa fa-check"></i>
            </button>;
            break;
        case false:
            button = <button className="btn btn-danger">
                <i className="fa fa-times"></i>
            </button>;
            break;
        default:
            button = <button onClick={props.checkAnswer} className="btn" disabled={props.selectedNumbers.length === 0}>=</button>;
            break;
    }

    return (
        <div className="col-2 text-center">
            {button}
            <br /><br />
            <button className="btn btn-warning btn-sm" onClick={props.redraw}>
                <i className="fa fa-refresh" disabled={props.redraws === 0}> {props.redraws}</i>
            </button>
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
        if (props.usedNumbers.indexOf(number) >= 0) {
            return 'used';
        }
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

const DoneFrame = (props) => {
    return (
        <div className="text-center">
            <h2>{props.doneStatus}</h2>
            <button className="btn btn-secondary" onClick={props.resetGame}>Play Again!</button>
        </div>
    );
}


class Game extends React.Component {
    state = Game.initialState();

    static randomNumer = () => {
        return 1 + Math.floor(Math.random() * 9);
    }

    static initialState = () => ({
        selectedNumbers: [],
        redraws: 5,
        numberOfStars: Game.randomNumer(),
        answerIsCorrect: null,
        usedNumbers: [],
        doneStatus: null
    });

    possibleSolutions = ({ numberOfStars, usedNumbers }) => {
        const possibleNumbers = _.range(1, 10).filter(number =>
            usedNumbers.indexOf(number) === -1
        );

        return possibleCombinationSum(possibleNumbers, numberOfStars);
    };

    updateDoneStatus = () => {
        this.setState(prevState => {
            if (prevState.usedNumbers.length === 9) {
                return { doneStatus: 'Done Nice!' };
            }
            if (prevState.redraws === 0 && !this.possibleSolutions(prevState)) {
                return { doneStatus: 'Game Over!' };
            }
        });
    };

    selectNumber = (clickedNumber) => {
        if (this.state.selectedNumbers.indexOf(clickedNumber) >= 0) { return 0; }
        this.setState(prevState => ({
            answerIsCorrect: null,
            selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
        }));
    };

    acceptAnswer = () => {
        this.setState(prevState => ({
            answerIsCorrect: null,
            usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
            selectedNumbers: [],
            numberOfStars: Game.randomNumer()
        }), this.updateDoneStatus);
    };

    unSelectNumber = (clickedNumber) => {
        this.setState(prevState => ({
            answerIsCorrect: null,
            selectedNumbers: prevState.selectedNumbers.filter(number => number !== clickedNumber)
        }));
    };

    checkAnswer = () => {
        this.setState(prevState => ({
            answerIsCorrect: prevState.numberOfStars === prevState.selectedNumbers.reduce((acc, n) => acc + n, 0)
        }));
    };

    redraw = () => {
        if (this.state.redraws === 0) { return 0; }
        this.setState(prevState => ({
            answerIsCorrect: null,
            selectedNumbers: [],
            numberOfStars: Game.randomNumer(),
            redraws: prevState.redraws - 1
        }), this.updateDoneStatus);
    };

    resetGame = () => {
        this.setState(Game.initialState());
    };

    render() {
        const { selectedNumbers, numberOfStars, answerIsCorrect, usedNumbers, redraws, doneStatus } = this.state;
        return (
            <div className="container">
                <h3>Play Nine</h3>
                <hr />
                <div className="row">
                    <Stars numberOfStars={numberOfStars} />
                    <Button checkAnswer={this.checkAnswer} answerIsCorrect={answerIsCorrect} selectedNumbers={selectedNumbers} acceptAnswer={this.acceptAnswer} redraw={this.redraw} redraws={redraws} />
                    <Answer unSelectNumber={this.unSelectNumber} selectedNumbers={selectedNumbers} />
                </div>
                <br />
                {doneStatus ?
                    <DoneFrame doneStatus={doneStatus} resetGame={this.resetGame} /> :
                    <Numbers selectNumber={this.selectNumber} selectedNumbers={selectedNumbers} usedNumbers={usedNumbers} />
                }


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