import React, { Component } from 'react'
import axios from 'axios'

const regex = {
    protocol: /^(http|https):\/\//i,
    url: /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/i
}

export default class Form extends Component {
    constructor(props) {
        super(props)
        this.state = {
          value: ''
        }
    
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
      }

    handleChange(event) {
        this.setState({ value: event.target.value })
    }

    handleSubmit(event) {
        const { handleResult } = this.props
        const { value } = this.state

        regex.url.test(this.state.value)
            ? axios.get(`/new/${value}`)
                .then(res => { handleResult(res.data) })
                .catch(error => {
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        handleResult(error.response.status, true)
                    } else if (error.request) {
                        // The request was made but no response was received
                        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                        // http.ClientRequest in node.js
                        handleResult(error.request, true)
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        handleResult(error.message, true)
                    }
                })
            : handleResult({ error: `'${value}' is not a valid Url` })

        event.preventDefault()
    }

    render() {
        return (
            <form
                id="input"
                className="input"
                onSubmit={ this.handleSubmit }
            >
                <input
                    type="text"
                    value={ this.state.value }
                    onChange={ this.handleChange }
                    placeholder="http://myreallylonglink/thispartisok?propsAreTrimmedTho"
                    id="input__field"
                    className="input__field"
                />
                <input
                    type="submit"
                    value="shorten"
                    className="input__submit"
                />
            </form>
        )
    }
}
