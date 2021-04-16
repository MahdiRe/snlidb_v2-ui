import { Component } from 'react';
import '../styles/generate-query.css';
import '../styles/styles.css'
import axios from 'axios';
import { JsonToTable } from "react-json-to-table";
import TableJson from '../component/table-json';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

class GenerateQuery extends Component {
    constructor() {
        super();
        this.state = {
            query: '',
            sql: '',
            result: 'Nothing is executed!',
            isText: true,
            isAuth: false,
            modifySQL: false,
            updateButtonText: "SQL වෙනස් කරන්න"
        };
        this.handleQueryChange = this.handleQueryChange.bind(this);
        this.handleSqlResultChange = this.handleSqlResultChange.bind(this);
        this.generateSql = this.generateSql.bind(this);
        this.executeSql = this.executeSql.bind(this);
        this.modifySQL = this.modifySQL.bind(this);
    }

    componentDidMount() {
        let user = localStorage.getItem('auth_user');
        console.log("user: " + user);
        console.log(user)
        if (user != null) {
            this.setState({ isAuth: true });
        } else {
            this.setState({ isAuth: false });
        }
    }

    handleQueryChange(event) {
        this.setState({ query: event.target.value });
    }

    handleSqlResultChange(event) {
        this.setState({ sql: event.target.value });
    }

    loginAlert() {
        confirmAlert({
            title: 'Require Login',
            message: 'This requirres login! Redirect to login page?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.props.history.push('/profile')
                },
                {
                    label: 'No'
                }
            ]
        });
    }

    generateSql(event) {
        event.preventDefault();
        if (this.state.isAuth) {
            console.log(this.state.query)
            let jsonObj = { query: this.state.query };
            axios.post('http://localhost:5000/query/generate', jsonObj)
                .then(response => {
                    this.setState({ sql: response.data })
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        } else {
            this.loginAlert();
        }
    }

    executeSql(event) {
        this.setState({ result: [] })
        event.preventDefault();
        if (this.state.isAuth) {
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
                    } else {
                        this.setState({ result: response.data });
                        this.setState({ isText: true });
                    }
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        } else {
            this.loginAlert();
        }
    }

    modifySQL(event) {
        event.preventDefault();
        this.setState({modifySQL: !this.state.modifySQL});
        if (this.state.modifySQL){
            this.setState({updateButtonText: "SQL වෙනස් කරන්න"});
        }else{
            this.setState({updateButtonText: "SQL වෙනස් නොකරන්න"})
        }
        
    }

    render() {
        const isText = this.state.isText;
        console.log(isText)
        return (
            <div className="container">
                <div className="A">
                    <form>
                        <label className="sin-big-label">කුමක්ද ඔබ සොයන්නේ?</label>
                        <input type="text" value={this.state.query} onChange={this.handleQueryChange}
                            placeholder='උ.දා: ලකුනු 75ට වැඩි සිසුන්ගේ විස්තර ලබාදෙන්න' />
                        <input className="button-A" type="submit" value="SQL ලෙස පරිවර්තනය කරන්න" onClick={this.generateSql} />
                        <br></br>
                        <input disabled={!this.state.modifySQL} type="text" value={this.state.sql} onChange={this.handleSqlResultChange} />
                        <input className="button-B" type="submit" value={this.state.updateButtonText} onClick={this.modifySQL} />
                        <input className="button-C" type="submit" value="දත්ත ලබාගන්න" onClick={this.executeSql} />
                    </form>
                </div>
                <div className="B">
                    {isText ? (
                        <input type="text" value={this.state.result} />
                    ) : (
                        <TableJson data={this.state.result} />
                    )}
                </div>
            </div>
        );
    }
}

export default GenerateQuery;