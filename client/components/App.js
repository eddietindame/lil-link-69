import React, { Component } from 'react'
import Form from './Form'
import Result from './Result'

export default class App extends Component {
    state = {
        result: null
    }

    handleResult(result) {
        this.setState({
            result
        })
    }

    render() {
        const { result } = this.state
        return (
            <div className="app">
                <Form handleResult={ this.handleResult.bind(this) } />
                <Result result={ result } />
            </div>
        )
    }
}
