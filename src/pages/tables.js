import { Component } from 'react';
import '../styles/tables.css';
import '../styles/styles.css';
import axios from 'axios';
import TableJson from '../component/table-json';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

class Tables extends Component {
    constructor() {
        super();
        this.state = {
            tables_list: [],
            table: '',
            table_data: [],
            name: '',
            age: 0,
            marks: 0,
            table_status: 'No table selected!',
            isAuth: false,
            user: '',
            role: ''
        };
        this.handleOnClick = this.handleOnClick.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleAgeChange = this.handleAgeChange.bind(this);
        this.handleMarksChange = this.handleMarksChange.bind(this);
        this.insertData = this.insertData.bind(this);
    }

    componentDidMount() {
        this.getAllTables();
        let user = localStorage.getItem('auth_user');
        let role = localStorage.getItem('auth_role');
        if (user != null) {
            this.setState({ isAuth: true, user: user, role: role });
        } else {
            this.setState({ isAuth: false });
        }
    }

    getAllTables() {
        axios.get('http://localhost:5000/tables')
            .then(response => {
                this.setState({ tables_list: response.data });
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    handleNameChange(event) {
        this.setState({ name: event.target.value });
    }

    handleAgeChange(event) {
        this.setState({ age: event.target.value });
    }

    handleMarksChange(event) {
        this.setState({ marks: event.target.value });
    }

    handleOnClick(event) {
        event.preventDefault();
        if (this.state.isAuth) {
            this.setState({ table: event.target.innerHTML });
            axios.get('http://localhost:5000/tables/' + event.target.innerHTML)
                .then(response => {
                    if (response.data) {
                        this.setState({ table_data: response.data });
                    } else {
                        this.setState({ table_status: 'Table is empty!' })
                    }
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        } else {
            this.loginAlert();
        }
    }

    insertData(event) {
        event.preventDefault();
        if (this.state.isAuth) {
            if (this.state.role === 'admin') {
                let jsonObj = { name: this.state.name, age: this.state.age, marks: this.state.marks };
                axios.post('http://localhost:5000/tables/' + this.state.table + '/insert', jsonObj)
                    .then(response => {
                        this.insert_alert(response.data);
                    })
                    .catch(error => {
                        console.error('There was an error!', error);
                    });
            } else {
                this.roleAlert();
            }
        } else {
            this.loginAlert();
        }
    }

    roleAlert() {
        confirmAlert({
            title: 'Permission denied',
            message: 'Only admin can make database changes!',
            buttons: [
                {
                    label: 'Okay',
                }
            ]
        });
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

    insert_alert(msg) {
        confirmAlert({
            title: 'Insert Notification',
            message: msg,
            buttons: [
                {
                    label: 'Okay',
                    onClick: () => this.setState({ name: '', age: 0, marks: 0 })
                }
            ]
        });
    }

    render() {
        const isData = this.state.table_data.length <= 0;
        const listOfTables = this.state.tables_list.map((table) =>
            <li key={table['table_name']} onClick={this.handleOnClick}><a href="">{table['table_name']}</a></li>
        );

        return (
            <div>
                <div className="container">
                    <div className="C">
                        <h2>List of all tables</h2>
                        <ul>{listOfTables}</ul>

                    </div>
                    <div className="D">
                        {isData ? (
                            <input type="text" value={this.state.table_status} />
                        ) : (
                            <TableJson data={this.state.table_data} />
                        )}
                    </div>
                    <div className="E">
                        {isData ? (
                            <input type="text" value={this.state.table_status} />
                        ) : (
                            <form>
                                <label className="label">Name</label>
                                <input type="text" value={this.state.name} onChange={this.handleNameChange} placeholder='???.??????: ??????????????????' />

                                <label className="label">Age</label>
                                <input type="text" value={this.state.age} onChange={this.handleAgeChange} placeholder='???.??????: 15' />

                                <label className="label">Marks</label>
                                <input type="text" value={this.state.marks} onChange={this.handleMarksChange} placeholder='???.??????: 75' />

                                <input disabled={!this.state.name} className="insert-btn" type="submit" value="INSERT ???????????????" onClick={this.insertData} />
                            </form>)}
                    </div>
                </div>
                <div className="footer">
                    <input className="guide" type="submit" value="Need help? Check the guide from here!" onClick={this.guide} />
                </div>
            </div>
        );
    }
}

export default Tables;