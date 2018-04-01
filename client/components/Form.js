import React, { Component } from 'react'
import axios from 'axios'

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
        axios.get(`/new/${this.state.value}`)
            .then(res => { this.props.handleResult(res.data) })
            .catch(error => { console.log(error) })

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
                    placeholder="http://myreallylonglink/thisnextpart?propsAreTrimmedTho"
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
