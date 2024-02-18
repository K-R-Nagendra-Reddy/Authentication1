import {Redirect} from 'react-router-dom'

import {Component} from 'react'
import './index.css'

class Login extends Component {
  state = {
    userId: '',
    pinNo: '',
    showErrorMsg: false,
    errorMsg: '',
  }

  onChangeUserID = event => {
    this.setState({userId: event.target.value})
  }

  onChangePin = event => {
    this.setState({pinNo: event.target.value})
  }

  renderUserIdInput = () => {
    const {userId} = this.state
    return (
      <div className="input-container">
        <label htmlFor="userId" className="label">
          User ID
        </label>
        <input
          type="text"
          className="input-element"
          value={userId}
          onChange={this.onChangeUserID}
          placeholder="Enter User ID"
        />
      </div>
    )
  }

  renderPinInput = () => {
    const {pinNo} = this.state
    return (
      <div className="input-container">
        <label htmlFor="userId" className="label">
          PIN
        </label>
        <input
          type="text"
          className="input-element"
          value={pinNo}
          onChange={this.onChangePin}
          placeholder="Enter PIN"
        />
      </div>
    )
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {userId, pinNo} = this.state
    const userDetails = {user_id: userId, pin: pinNo}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch('https://apis.ccbp.in/ebank/login', options)
    const data = await response.json()
    console.log(data)
  }

  render() {
    const {showErrorMsg, errorMsg} = this.state
    return (
      <div className="bg-container">
        <div className="login-form">
          <div className="login-logo">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
              className="website-logo"
            />
          </div>
          <form className="form-container" onSubmit={this.onSubmitForm}>
            <h1 className="login-heading">Welcome Back!</h1>
            {this.renderUserIdInput()}
            {this.renderPinInput()}
            <button type="submit" className="login-button">
              Login
            </button>
            {showErrorMsg && <p className="error-message">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
