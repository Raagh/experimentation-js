import React from 'react';
import ReactDOM from 'react-dom';

const Card = (props) => {
    return (
        <div>
            <img width="75" src={props.avatar_url} />
            <div style={{ display: 'inline-block', marginLeft: 10 }}>
                <div style={{ fontSize: '1.25em', fontWeight: 'bold' }}>
                    {props.name}
                </div>
                <div>{props.company}</div>
            </div>
        </div>
    );
}

const CardList = (props) => {
    return (
        <div>
            {props.cards.map(card => <Card {...card} />)}
        </div>
    );
};

class Form extends React.Component {
    handleSubmit = (event) => {
        event.preventDefault();
        console.log('Event: Form Submit');
    };


    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" placeholder="GitHub Username" required />
                <button type="submit">Add a Card!</button>
            </form>
        );
    }
}

class App extends React.Component {
    state = {
        cards: [
            {
                name: "Raagh",
                avatar_url: "https://avatars2.githubusercontent.com/u/8405459?v=3",
                company: "Coke && Code"
            },
            {
                name: "Raagh",
                avatar_url: "https://avatars2.githubusercontent.com/u/8405459?v=3",
                company: "Coke && Code"
            }
        ]
    };

    render() {
        return (
            <div>
                <Form />
                <CardList cards={this.state.cards} />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));