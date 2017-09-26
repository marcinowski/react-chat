import { h, render, Component } from 'preact';
import {Message} from './components/message';
import AuthForm from './components/authform';
import styles from 'bootstrap/dist/css/bootstrap.css';

var client = new WebSocket('ws://127.0.0.1:8000/');
const anon = 'anonymous';

class Chat extends Component {
    constructor() {
        super();
        this.state.msg = '';
        this.state.username = anon;
        this.state.messages = [];
        this.state.authenticated = false;
    };

    componentDidMount() {
        client.onmessage = evt => {
            let data = JSON.parse(evt.data);
            this.setState({ messages: this.state.messages.concat(data)});
        };
    };

    componentDidUpdate () {
        let w = document.getElementById('messages')
        w.scrollTop = w.scrollHeight;
    };

    setMessage = e => {
        // saves message into the state
        this.setState({ msg: e.target.value });
    };

    sendUsername = (name) => {
        // sends username to the server if the user hasn't authenticated himself
        if (this.state.authenticated == false) {
            client.send(JSON.stringify({
                date: new Date(),
                username: name,
            }))
            this.setState({ authenticated: true });
            this.setState({ username: name });
        }
    };

    sendMessage = () => {
        // sends message to the server if user is authenticated
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
            <div style="width: 50vw; margin: 20px;">
                <AuthForm authenticate={this.sendUsername} />
                <div>{(() => {
                    if (username == anon) {
                        return (<h3>You are not logged in.</h3>)
                    } else {
                        return (<h3>You are logged in as <i>{ username }</i>.</h3>)
                    }
                })()}</div>
                <div id="messages" style="border: 1px solid black; height: 70vh; border-radius: 10px; overflow-y: scroll; padding: 10px;">
                    { messages.map(m => {
                        if (m.username == this.state.username) {
                            return (
                                <Message username="You" msg={m.msg} date={m.date} style="width: 50%; text-align: right; margin-left: 50%" />
                            )
                        } else {
                            return (
                                <Message username={ m.username } msg={m.msg} date={m.date} style="width: 50%;"/>
                            )
                        };
                    })}
                </div>
                <form onSubmit={this.sendMessage} action="javascript:">
                    <label for="msg">Type your message</label>
                    <br></br>
                    <textarea style="width: 100%;" id="msg" onInput={this.setMessage}>{msg}</textarea>
                    <button className="btn btn-info btn-small pull-right" type="submit">Send message</button>
                </form>
            </div>
        );
    }
}

render(<Chat />, document.body);
