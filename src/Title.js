import React, { Component } from 'react';

class Title extends Component {
    render() {
        return(
            <h4>{this.props.title}</h4> // dans le return, il faut tjrs que ça soit du html, JSX
        )
    }
}

export default Title
