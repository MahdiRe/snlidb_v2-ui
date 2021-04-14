import { Component } from 'react';
import '../styles/generate-query.css';
import '../styles/styles.css'
import axios from 'axios';
import { JsonToTable } from "react-json-to-table";

class GenerateQuery extends Component {
    constructor() {
        super();
        this.state = {
            query: '',
            sql: '',
            result: '',
            isText: false
        };
        this.handleQueryChange = this.handleQueryChange.bind(this);
        this.handleSqlResultChange = this.handleSqlResultChange.bind(this);
        this.generateSql = this.generateSql.bind(this);
        this.executeSql = this.executeSql.bind(this);
        this.fakeJson = [
            { "RESULTS": "no results found!" }
        ]
    }

    handleQueryChange(event) {
        this.setState({ query: event.target.value });
    }

    handleSqlResultChange(event) {
        this.setState({ sql: event.target.value });
    }

    generateSql(event) {
        event.preventDefault();
        console.log(this.state.query)
        let jsonObj = { query: this.state.query };
        axios.post('http://localhost:5000/query/generate', jsonObj)
            .then(response => {
                this.setState({ sql: response.data })
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    executeSql(event) {
        this.setState({ result: [] })
        event.preventDefault();
        let jsonObj = { sql: this.state.sql };
        axios.post('http://localhost:5000/query/execute', jsonObj)
            .then(response => {
                console.log(response.data)
                if (Array.isArray(response.data)) {
                    if (response.data.length > 0) {
                        this.setState({ result: response.data });
                        this.setState({ isText: false });
                    } else {
                        this.setState({ result: "Executed successfully!" });
                        this.setState({ isText: true });
                    }
                } else if (response.data == 'Exception found!') {
                    this.setState({ result: "Exception, Please check your SQL format!" });
                    this.setState({ isText: true });
                }else{
                    this.setState({ result: response.data });
                    this.setState({ isText: true });
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    render() {
        const isText = this.state.isText;
        console.log(isText)
        return (
            <div className="container">
                <div className="A">
                    <form>
                        <label className="label">කුමක්ද ඔබ සොයන්නේ?</label>
                        <input type="text" value={this.state.query} onChange={this.handleQueryChange}
                            placeholder='උ.දා: ලකුනු 75ට වැඩි සිසුන්ගේ විස්තර ලබාදෙන්න' />
                        <input type="submit" value="SQL ලෙස පරිවර්තනය කරන්න" onClick={this.generateSql} />
                        <br></br>
                        <input type="text" value={this.state.sql} onChange={this.handleSqlResultChange} />
                        <input type="submit" value="දත්ත ලබාගන්න" onClick={this.executeSql} />
                    </form>
                </div>
                <div className="B">
                    {isText ? (
                        <input type="text" value={this.state.result} />
                    ) : (
                        <JsonToTable json={this.state.result} />
                    )}
                </div>
            </div>
        );
    }
}

export default GenerateQuery;