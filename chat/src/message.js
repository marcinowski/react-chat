import { render, Component } from 'preact';


export const Message = ({msg, username, date, ...props}) => {
    return (
        <div {...props} title={ date }>
            <div style="padding: 1px; margin-bottom: 5px">
                <p style="margin: 0px 0px 1px 0px"><i>{ username }</i>:</p>
                <span style="border-radius: 5px; border: 1px solid blue; padding: 5px">
                    { msg }
                </span>
            </div>
        </div>
    );
}
