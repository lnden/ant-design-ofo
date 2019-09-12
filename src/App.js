import React, { Fragment } from 'react';
import './index.less';

export default function App(props){
    return (
        <Fragment>
            {props.children}
        </Fragment>
    )
}