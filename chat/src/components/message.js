import { render, Component } from 'preact';


export const Message = ({msg, username, date, ...props}) => {
    return (
        <div {...props} title={ date }>
            <div style="padding: 1px; margin-bottom: 20px">
                <p><i>{ username }</i>:</p>
                <span className="alert alert-success">
                    { msg }
                </span>
            </div>
        </div>
    );
}
