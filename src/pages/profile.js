import { Component } from 'react';
import '../styles/profile.css';
import '../styles/styles.css';
import axios from 'axios';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      role: 'user',
      l_username: '',
      l_password: '',
      isAuth: false,
      auth_user: '',
      auth_role: ''
    };
    this.userNameChange = this.userNameChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.roleChange = this.roleChange.bind(this);
    this.lNameChange = this.lNameChange.bind(this);
    this.lPwdChange = this.lPwdChange.bind(this);
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    console.log(localStorage)
    let user = localStorage.getItem('auth_user');
    let role = localStorage.getItem('auth_role');
    console.log("user: " + user + "& role: " + role);
    console.log(user)
    if (user != null) {
      this.setState({
        isAuth: true,
        auth_user: user,
        auth_role: role
      });
    } else {
      this.setState({
        isAuth: false,
        auth_user: '',
        auth_role: ''
      });
    }
  }

  handleOnClick(e) {
    this.setState({ table: e.target.innerHTML });
    axios.get('http://localhost:5000/tables/' + e.target.innerHTML)
      .then(response => {
        this.setState({ table_data: response.data })
        if (!response.data) {
          this.setState({ table_status: 'Table is empty!' })
        }
      })
      .catch(error => {
        console.error('There was an error!', error);
      })
  }

  userNameChange(event) {
    this.setState({ username: event.target.value });
  }


  passwordChange(event) {
    this.setState({ password: event.target.value });
  }

  roleChange(event) {
    this.setState({ role: event.target.value });
  }

  lNameChange(event) {
    this.setState({ l_username: event.target.value });
  }

  lPwdChange(event) {
    this.setState({ l_password: event.target.value });
  }

  register(event) {
    event.preventDefault();
    let jsonObj = { username: this.state.username, password: this.state.password, role: this.state.role };
    console.log(jsonObj)
    axios.post('http://localhost:5000/profile/register', jsonObj)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
    console.log(JSON.parse(localStorage.getItem('auth')))
    localStorage.clear();
  }

  login(event) {
    event.preventDefault();
    let jsonObj = { username: this.state.l_username, password: this.state.l_password };
    console.log(jsonObj)
    axios.post('http://localhost:5000/profile/login', jsonObj)
      .then(response => {
        console.log(response);
        if (Array.isArray(response.data) && response.data.length != 0) {
          console.log('Valid username or password!');
          localStorage.setItem('auth_user', response.data[0].user_name);
          localStorage.setItem('auth_role', response.data[0].role);
          this.setState({ isAuth: true, auth_user: response.data[0].user_name, auth_role: response.data[0].role });
          window.location.reload();
        } else {
          console.log('Invalid username or password!')
        }
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }

  logout(event) {
    event.preventDefault();
    this.setState({ isAuth: false, auth_user: '', auth_role: '' });
    localStorage.clear();
    window.location.reload();
  }

  render() {

    const isAuth = this.state.isAuth;

    return (
      <div>
        { isAuth ? (
          <div className="container">
            <div className="A">
              <form>
                <label className="label">Username</label>
                <input disabled type="text" value={this.state.auth_user} onChange={this.userNameChange} />

                <label className="label">Role</label>
                <input disabled type="text" value={this.state.auth_role} onChange={this.userNameChange} />

                {/* <button onClick={this.logout}>Log out</button> */}
                <input className="logout-btn" type="submit" value="Logout කරන්න" onClick={this.logout} />

              </form>
            </div>
          </div>

        ) : (
          <div className="container">
            <div className="A">
              <form>
                <label className="label">පරිශීලක නාමය/Username</label>
                <input type="text" value={this.state.username} onChange={this.userNameChange} placeholder='උ.දා: ලකුනු' />

                <label className="label">මුරපදය/Password</label>
                <input type="password" value={this.state.password} onChange={this.passwordChange} placeholder='උ.දා: 15' />

                <label className="label">කාර්යභාරය/Role</label>
                <select name="roles" onChange={this.roleChange}>
                  <option value="admin">admin/පරිපාලක</option>
                  <option selected value="user">user/පරිශීලක</option>
                </select>

                <input className="register-btn" type="submit" value="ලියාපදිංචි වන්න" onClick={this.register} />
              </form>
            </div>
            <div className="B">
              <form>
                <label className="label">පරිශීලක නාමය/Name</label>
                <input type="text" value={this.state.l_username} onChange={this.lNameChange} placeholder='උ.දා: ලකුනු' />

                <label className="label">මුරපදය/Password</label>
                <input type="text" value={this.state.l_password} onChange={this.lPwdChange} placeholder='උ.දා: 15' />

                <input className="login-btn" type="submit" value="ඇතුල් වන්න" onClick={this.login} />
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;