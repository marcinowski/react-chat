import { h, render, Component } from 'preact';


var client = new WebSocket('ws://127.0.0.1:8000/');

class Chat extends Component {
    constructor() {
        super();
        this.state.msg = '';
        this.state.username = 'anonymous';
        this.state.messages = [];
    }

    componentDidMount() {
        client.onmessage = evt => {
            console.log(evt);
            let data = JSON.parse(evt.data);
            this.setState({ messages: this.state.messages.concat(data)});
        }
    };

    setMessage = e => {
        this.setState({ msg: e.target.value });
    };

    setUsername = e => {
        // this may be generalized to { e.target.id: e.target.value }
        // this also should be handled independently by server
        this.setState({ username: e.target.value });
    };

    sendMessage = () => {
        // to be improved
        client.send(
            JSON.stringify({
                username: this.state.username,
                date: new Date(),
                msg: this.state.msg
            })
        );
    };

    render({ }, { msg, messages, username }) {
        return (
            <div>
                <form action="javascript:">
                    <label for="username">Your nick</label>
                    <input id="username" value={username} onInput={this.setUsername}/>
                </form>
                <h3>Welcome {username}!</h3>
                    { messages.map(m => (<p title={ m.date }><i>{ m.username }</i>: { m.msg }</p>)) }
                <form onSubmit={this.sendMessage} action="javascript:">
                    <label for="msg">Type your message</label>
                    <input id="msg" value={msg} onInput={this.setMessage} />
                    <button type="submit">Send message</button>
                </form>
            </div>
        );
    }
}

// render an instance of Clock into <body>:
render(<Chat />, document.body);
