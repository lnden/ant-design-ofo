import React from 'react';
import './index.css';

function App(props) {
    return (
        <div className="App">
            {props.children}
        </div>
    );
}

export default App;
