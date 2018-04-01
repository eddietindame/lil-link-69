import React, { Component } from 'react'

const Url = props => {
    const url = `${window.location.origin}/${props.value}`
    return <span>New Url: <a href={ url }>{ url }</a></span>
}

export default class Result extends Component {
    render() {
        const { result } = this.props
        return (
            <div className="result">
            {
                result &&
                    <p>
                        <strong><em>{ result.error ? 'Error! ' : 'Success! ' }</em></strong>
                        {
                            result.error
                                ? result.error
                                : <Url value={ result.newUrl } />
                        }
                    </p>
            }
            </div>
        )
    }
}
