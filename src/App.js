import React from 'react';
import {UseState, UseContext, UseReducer, UseEffect} from './pages/Hooks.js'
import Container from './pages/order/Detail'

function App() {
    return (
        <div className="App">
            {/*<Container />*/}
            <UseState/>
            <UseContext/>
            <UseReducer/>
            <UseEffect />
        </div>
    );
}

export default App;
