import React, {useState, useContext, useReducer, useEffect} from 'react'
import {Card} from 'antd'

// useState()
export function UseState() {
    const [buttonText, setButtonText] = useState('click me,palease')

    function handleClick() {
        return setButtonText('thanks,been clicked')
    }

    return (
        <Card title="Hooks—useState">
            <button onClick={handleClick}>{buttonText}</button>
        </Card>
    )
}


// useContext()
const AppContext = React.createContext({});

export function UseContext() {
    return (
        <AppContext.Provider
            value={{
                username: 'Tom'
            }}
        >
            <Card title="Hooks-useContext">
                <PublicHeader/>
                <br/>
                <PublicFooter/>
            </Card>
        </AppContext.Provider>

    )
}

const PublicHeader = () => {
    const {username} = useContext(AppContext);
    return (
        <div style={{border: '1px solid #aaa'}}>
            <h2>头部公共组件</h2>
            <p>The name comes from the father，<span style={{color: '#f00'}}>{username}</span></p>
        </div>
    )
};

const PublicFooter = () => {
    const {username} = useContext(AppContext);
    return (
        <div style={{border: '1px solid #aaa'}}>
            <h2>页脚公共组件</h2>
            <p>The name comes from the father，<span style={{color: '#f00'}}>{username}</span></p>
        </div>
    )
};


// useReducer()
export function UseReducer() {
    const [state, dispatch] = useReducer(myReducer, {count: 0});

    function handleClick(type) {
        dispatch({type})
    }

    return (
        <Card title="Hooks-useReducer">
            <button onClick={() => dispatch({type: 'add'})}>+1</button>
            <button onClick={() => handleClick('minus')}>-1</button>
            <span>Count：<span style={{color: '#f00'}}>{state.count}</span></span>
        </Card>
    )
}

const myReducer = (state, action) => {
    switch (action.type) {
        case ('add'):
            return {
                ...state,
                count: state.count + 1
            };
        case ('minus'):
            return {
                ...state,
                count: state.count - 1
            };
        default:
            return state;

    }
}


// useEffect()用来引入具有副作用的操作，最常见的就是向服务器请求数据。
// 以前，放在componentDidMount里面的代码，现在可以放在useEffect()。
export function UseEffect() {
    const [show, setShow] = useState("0");
    return (
        <Card title="Hooks-useEffect">
            <Person pernsonId={show}/>
            setShow:
            <button onClick={() => setShow("1")}>Add singular</button>
            <button onClick={() => setShow("2")}>Add double</button>
        </Card>
    )
}

const Person = ({personId}) => {
    console.log(personId)
    const [loading, setLoading] = useState(false);
    const [person, setPerson] = useState({});

    useEffect(() => {
        setLoading(true);
        fetch('https://www.easy-mock.com/mock/5d5ec2393da1210743354970/v1/city/open').then(res => {
            if (res.ok) {
                setPerson({
                    name: 'Luck',
                    singular: 51,
                    double: 52
                });
                setLoading(false)
            }
        })
    }, [personId]);

    if (loading === true) {
        return <p>Loading ...</p>
    }

    return (
        <div>
            <p>You're viewing: {person.name}</p>
            <p>单数: {person.singular}</p>
            <p>双数: {person.double}</p>
        </div>
    )
}