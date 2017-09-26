import { render, Component } from 'preact';


export default class Message extends Component {
    render({ props }, { state }) {
        return (
            <div>
                <p><i>{ this.props.username }</i>:</p>
                <span style="border-radius: 5px; border: 1px solid blue; padding: 5px">
                    { this.props.msg }
                </span>
            </div>
        );
    }
}
