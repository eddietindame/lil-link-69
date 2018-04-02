import React, { Component } from 'react'

const Url = props => {
    const { newUrl, deleteUrl } = props.result
    const url = `${window.location.origin}/${newUrl}`
    const deleteit = `${window.location.origin}/${deleteUrl}`

    return <span>New Url: <a href={ url } target="_blank" rel="external">{ url }</a><br />Delete this Url using: <a href={ deleteit } target="_blank" rel="external">{ window.location.origin }<wbr />{ deleteUrl }</a> (your browser may still cache the link).</span>
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
                                : <Url result={ result } />
                        }
                    </p>
            }
            </div>
        )
    }
}
