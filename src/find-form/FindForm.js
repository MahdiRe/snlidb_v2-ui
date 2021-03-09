import { Component } from 'react';
import './FindForm.css';
import axios from 'axios';

class FindForm extends Component {
    constructor() {
        super();
        this.state = { value: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.value)
        let jsonObj = { query: this.state.value};
        axios.post('http://localhost:5000/query', jsonObj)
        .then(response => {
            // this.setState({ articleId: response.data.id })
            console.log(response);
        })
        .catch(error => {
            // this.setState({ errorMessage: error.message });
            console.error('There was an error!', error);
        });
    }

    render() {
        return (
            <div className="formDiv">
                <form onSubmit={this.handleSubmit}>
                    <label className="label">What do you want?</label>
                    <input type="text" value={this.state.value} onChange={this.handleChange} />

                    <input type="submit" value="Submit" />
                </form>
            </div>

        );
    }
}

export default FindForm;