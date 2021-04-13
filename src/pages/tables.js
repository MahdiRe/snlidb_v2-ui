import { Component } from 'react';
import '../styles/tables.css';
import '../styles/styles.css';
import { JsonToTable } from "react-json-to-table";

class Tables extends Component {
  constructor() {
      super();
      this.state = { table: '' };
      this.handleOnClick = this.handleOnClick.bind(this);
      // this.generateSql = this.generateSql.bind(this);
      // this.fakeJson = [
      //     {"fruit": "Apple", "cost": 100},
      //     {"fruit": "Orange", "cost": 50},
      //     {"fruit": "Banana", "cost": 35},
      //     {"fruit": "Mango", "cost": 70},
      //     {"fruit": "Pineapple", "cost": 45},
      //     {"fruit": "Papaya", "cost": 40},
      //     {"fruit": "Watermelon", "cost": 35}
      //     ]
      this.fakeJson = {"TABLES": [ "a", "b", "c"]};
      console.log(this.fakeJson["TABLES"]);
  }

  handleOnClick(event) {
      // this.setState({ table: event.target });
      console.log(event.target.innerHTML)
  }

  // generateSql(event) {
  //     event.preventDefault();
  //     console.log(this.state.query)
  //     let jsonObj = { query: this.state.query };
  //     axios.post('http://localhost:5000/query', jsonObj)
  //         .then(response => {
  //             // this.setState({ articleId: response.data.id })
  //             console.log(response);
  //             this.setState({ sql_result: response.data })
  //         })
  //         .catch(error => {
  //             // this.setState({ errorMessage: error.message });
  //             console.error('There was an error!', error);
  //         });
  // }

  render() {
      const isText = false;
      const listOfTables = this.fakeJson["TABLES"].map((table) => 
              <li key={table} onClick={this.handleOnClick}>{table}</li> 
            );
      return (
          <div className="container">
              <div className="A">
                  <h2>List of all tables</h2>
                  <ul>{listOfTables}</ul>

              </div>
              <div className="B">
                  { isText ? (
                      <input type="text" value={this.state.query} onChange={this.handleQueryChange}
                          placeholder='No results!' />
                  ) : (
                      <JsonToTable json={this.fakeJson} />
                  )}
              </div>
          </div>
      );
  }
}

export default Tables;