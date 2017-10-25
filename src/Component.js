import React, { Component } from 'react';

class MyComponent extends Component {
    render() {
        return(
            <h1>{this.props.title}</h1> // dans le return, il faut tjrs que ça soit du html, JSX
        )
    }
}

export default MyComponent