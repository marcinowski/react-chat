import { h, render, Component } from 'preact';

export default class AuthForm extends Component {

    constructor() {
        super();
        this.state.username = '';
        this.state.authenticated = false;
    };

    sendUsername = () => {
        // sends username to the server if the user hasn't authenticated himself
        this.props.authenticate(this.state.username);
        this.setState({ authenticated: true });
    };

    setUsername = e => {
        // saves username into the state
        if ( this.state.authenticated == false ) {
            this.setState({ username: e.target.value });
        }
    };

    render({props}, { username, authenticated }) {
        return (
            <form onSubmit={this.sendUsername} action="javascript:">
                <label for="username">Your nick</label>
                <br></br>
                <input id="username" value={username} onInput={this.setUsername} type="text" required/>
                &nbsp;
                <button className="btn btn-success btn-small" disabled={ authenticated } type="submit">
                    Log In!
                </button>
            </form>
        )
    }
}
