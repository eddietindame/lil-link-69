import React, { Component } from 'react'

export default class Result extends Component {
    render() {
        const { value } = this.props
        return (
            <div className="result">
                <pre>
                    { value
                        ? JSON.stringify(value)
                        : ''
                    }
                </pre>
            </div>
        )
    }
}
