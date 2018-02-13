import React from 'react';
import ReactDOM from 'react-dom';
import './main.css';

class NavBar extends React.Component {
    render() {
        return (
            <div id="nav">
                <a href="/" className="nav-item" id="home">Home</a>
            </div>
        );
    }
}

ReactDOM.render(
    <NavBar />,
    document.getElementsByTagName('body')[0]
);
