import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Switch } from 'react-router-dom';
import '../styles/common.less';

const AnimatedSwitch = children => {
    return (
        <TransitionGroup>
            <CSSTransition classNames="fade" timeout={300}>
                <Switch>{children}</Switch>
            </CSSTransition>
        </TransitionGroup>
    );
};

export default AnimatedSwitch;
