import { Component } from 'react';
import './FindForm.css';
import axios from 'axios';

class FindForm extends Component {
    constructor() {
        super();
        this.state = { query: '', sql_result: '' };
        this.handleQueryChange = this.handleQueryChange.bind(this);
        this.handleSqlResultChange = this.handleSqlResultChange.bind(this);
        this.generateSql = this.generateSql.bind(this);
        this.executeSql = this.executeSql.bind(this);
    }

    handleQueryChange(event) {
        this.setState({ query: event.target.value });
    }

    handleSqlResultChange(event) {
        this.setState({ sql_result: event.target.value });
    }

    generateSql(event) {
        event.preventDefault();
        console.log(this.state.query)
        let jsonObj = { query: this.state.query};
        axios.post('http://localhost:5000/query', jsonObj)
        .then(response => {
            // this.setState({ articleId: response.data.id })
            console.log(response);
            this.setState({ sql_result: response.data})
        })
        .catch(error => {
            // this.setState({ errorMessage: error.message });
            console.error('There was an error!', error);
        });
    }

    executeSql(event) {
        event.preventDefault();
        console.log(this.state.sql_result)
        let jsonObj = { sql: this.state.sql_result};
        axios.post('http://localhost:5000/execute', jsonObj)
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
                {/* <form onSubmit={this.handleSubmit}> */}
                <form>
                    <label className="label">කුමක්ද ඔබ සොයන්නේ?</label>
                    <input type="text" value={this.state.query} onChange={this.handleQueryChange} 
                        placeholder='උ.දා: ලකුනු 75ට වැඩි සිසුන්ගේ විස්තර ලබාදෙන්න'/>
                    <input type="submit" value="SQL ලෙස පරිවර්තනය කරන්න" onClick={this.generateSql} />
                    <br></br>
                    <input type="text" value={this.state.sql_result} onChange={this.handleSqlResultChange} />
                    <input type="submit" value="දත්ත ලබාගන්න" onClick={this.executeSql} />
                </form>
            </div>

        );
    }
}

export default FindForm;