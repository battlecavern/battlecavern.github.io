import React from 'react';
import ReactDOM from 'react-dom';
import Sizzle from 'sizzle';
import './main.css';

class NavBar extends React.Component {
    render() {
        return (
            <div id="nav">
                <a href="/" class="nav-item" id="home">Home</a>
            </div>
        );
    }
}

ReactDOM.render(
    <NavBar />,
    Sizzle('body')
);