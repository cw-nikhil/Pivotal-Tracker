import React from 'react';
import {useState, useEffect, memo} from "react";

export default memo(function Demo1(props) {
    const [text, setText] = useState(props.text);
    useEffect(() => {
        setText(props.text);
    })
    return (
        <div>
            {text}
            <button onClick = {() => props.setJust(0)}>demo1</button>
        </div>
    )
});


// import React, { PureComponent } from 'react';

// export default class Demo1 extends PureComponent {
//     constructor(props) {
//         super();
//         this.state = {
//             text: props.text
//         }
//     }
//     componentWillUnmount() {
//         console.log("demo1 unmounted");
//     }
//     componentDidMount() {
//         console.log("demo1 mounted");
//     }
//     componentDidUpdate() {
//         console.log("demo1 updated");
//         this.setState(this.props);
//     }
//     render() {
//         return (
//             <div>
//                 {this.state.text}
//                 {this.props.text}
//                 <button onClick = {() => this.props.setJust(0)}>demo1</button>
//             </div>
//         )
//     }
// }
