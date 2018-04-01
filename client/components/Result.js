import React, { Component } from 'react'

export default class Result extends Component {
    render() {
        const { result } = this.props
        return (
            <div className="result">
            {
                result && <p><strong><em>{ result.error ? 'Error!' : 'Success!' }</em></strong> { result.error ? result.error : `New Url: ${result.newUrl}` }</p>
            }
            </div>
        )
    }
}
