import React, { Component } from 'react';
import './App.css';

class Login extends Component {
  state = {
    username: '',
    password: ''
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    console.log('로그인:', username, password);
    localStorage.setItem('loggedInUser', username);
    this.props.onLoginSuccess();
  };

  render() {
    return (
      <div>
        <h2>로그인</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="loginUsername">사용자 이름:</label>
            <input type="text" id="loginUsername" onChange={this.handleChange} />
          </div>
          <div>
            <label htmlFor="loginPassword">비밀번호:</label>
            <input type="password" id="loginPassword" onChange={this.handleChange} />
          </div>
          <button type="submit">로그인</button>
        </form>
      </div>
    );
  }
}

export default Login;
