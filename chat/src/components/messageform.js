import { h, render, Component } from 'preact';

export default class MessageForm extends Component {
    constructor() {
        super();
        this.state.msg = '';
    };

    setMessage = e => {
        // saves message into the state
        this.setState({ msg: e.target.value });
    };

    sendMessage = () => {
        this.props.write(this.state.msg);
    };

    render({}, { msg }) {
        return (
            <form onSubmit={this.sendMessage} action="javascript:">
                <label for="msg">Type your message</label>
                <br></br>
                <textarea style="width: 100%;" id="msg" onInput={this.setMessage}>{msg}</textarea>
                <button className="btn btn-info btn-small pull-right" type="submit">Send message</button>
            </form>
        )
    }
}
