import React, { Component } from 'react';
import './App.css';

class Signup extends Component {
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
    console.log('회원가입:', username, password);
    localStorage.setItem('loggedInUser', username);
    this.props.onSignupSuccess();
  };

  render() {
    return (
      <div>
        <h2>회원가입</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="username">사용자 이름:</label>
            <input type="text" id="username" onChange={this.handleChange} />
          </div>
          <div>
            <label htmlFor="password">비밀번호:</label>
            <input type="password" id="password" onChange={this.handleChange} />
          </div>
          <button type="submit">가입하기</button>
        </form>
      </div>
    );
  }
}

export default Signup;
