import { h, render, Component } from 'preact';


var client = new WebSocket('ws://127.0.0.1:8000/');


class Message extends Component {
        constructor() {
            super();
            this.state.msg = '';
            this.state.username = 'anonymous';
        }
        render({ props }, { state }) {
            return (
                <p><i>{ props.username }</i>:</p>
                <span style="border-radius: 5px; border: 1px solid blue; padding: 5px">
                    { props.msg }
                </span>
            );
        }
}


class Chat extends Component {
    constructor() {
        super();
        this.state.msg = '';
        this.state.username = 'anonymous';
        this.state.messages = [];
        this.state.authenticated = false;
    }

    componentDidMount() {
        client.onmessage = evt => {
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
        if (this.state.authenticated == false) {
            this.setState({ username: e.target.value });
        }
    };

    sendUsername = () => {
        if (this.state.authenticated == false) {
            client.send(JSON.stringify({
                date: new Date(),
                username: this.state.username,
            }))
            this.setState({ authenticated: true });
        }
    }

    sendMessage = () => {
        // to be improved
        if (this.state.authenticated == true) {
            client.send(
                JSON.stringify({
                    date: new Date(),
                    msg: this.state.msg
                })
            );
            this.setState({ msg: '' });
        } else {
            alert("You must be authenticated in order to send messages.")
        }
    };

    render({ }, { msg, messages, username }) {
        return (
            <div style="width: 50vw;">
                <form onSubmit={this.sendUsername} action="javascript:">
                    <label for="username">Your nick</label>
                    <input id="username" value={username} onInput={this.setUsername}/>
                    <button type="submit">Set username</button>
                </form>
                <h3>You are logged in as <i>{username}</i>.</h3>
                <div id="messages" style="border: 1px solid black; height: 20vh; border-radius: 10px; overflow-y: scroll; padding: 10px;">
                    { messages.map(m => {
                        if (m.username == this.state.username) {
                            return (
                                <div style="width: 50%; text-align: right; margin-left: 50%" title={ m.date }>
                                    <p><i>You</i>:</p>
                                    <span style="border-radius: 5px; border: 1px solid blue; padding: 5px">
                                        { m.msg }
                                    </span>
                                </div>
                            )
                        } else {
                            return (
                                <div style="width: 50%;" title={ m.date }>
                                    <p><i>{ m.username }</i>:</p>
                                    <span style="border-radius: 5px; border: 1px solid blue; padding: 5px;">
                                        { m.msg }
                                    </span>
                                </div>
                            )
                        };
                    })}
                </div>
                <form onSubmit={this.sendMessage} action="javascript:">
                    <label for="msg">Type your message</label>
                    <br></br>
                    <textarea style="width: 100%;" id="msg" onInput={this.setMessage}>{msg}</textarea>
                    <button type="submit">Send message</button>
                </form>
            </div>
        );
    }
}

// render an instance of Clock into <body>:
render(<Chat />, document.body);
