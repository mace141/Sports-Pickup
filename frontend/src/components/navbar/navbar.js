import React from "react";
import { render } from "react-dom";
import { Link, Redirect } from "react-router-dom";
import logo from "../../style/assets/logoB.png";

class NavBar extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      sessionChange: this.props.loggedIn,
    };

    this.handleTabClick = this.handleTabClick.bind(this);
    this.leaveTab = this.leaveTab.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleTabClick(e) {
    const currEle = e.currentTarget;
    currEle.classList.add("selected");
  }

  leaveTab(e) {
    const currEle = e.currentTarget;
    currEle.classList.remove("selected");
  }

  handleLogout() {
    this.props.logout();
    window.location.hash = "#/";
  }
  sessionLinks() {
    // conditional rendering for logged in/out
    const { openModal, currentUser } = this.props;
    if (!currentUser) {
      return (
        <nav className="login-signup">
          <button
            className="login-btn form-button"
            onClick={() => openModal("login")}
          >
            Sign In
          </button>
          <button
            className="signup-btn form-button"
            onClick={() => openModal("signup")}
          >
            Create account
          </button>
        </nav>
      );
    } else {
      // logged in display
      return (
        <nav className="login-signup">
          <button className="host-btn" onClick={() => openModal("newEvent")}>
            Host
          </button>
          <Link to={`/users/${this.props.currentUser.id}`}>Profile</Link>
          <button className="logout-btn" onClick={this.handleLogout}>
            Logout
          </button>
        </nav>
      );
    }
  }
  mainDisp() {
    const { openModal, currentUser } = this.props;
    // Display for every user
    return (
      <>
        <div className="navbar-inner">
          <div className="navbar-left">
            <div className="header-logo-container">
              <Link className="header-logo" to="/">
                <img className="header-logo" src={logo}></img>
              </Link>
            </div>
          </div>
          <div className="navbar-right">
            <Link
              to="/explore"
              onFocus={this.handleTabClick}
              onBlur={this.leaveTab}
            >
              Explore
            </Link>
            {/* <button className='host-btn' onClick={() => openModal("newEvent")}>
              Host
            </button> */}
            {this.sessionLinks()}
          </div>
        </div>
      </>
    );
  }
  render() {
    return (
      <div className="nav-background">
        <nav className="full-navbar">{this.mainDisp()}</nav>
      </div>
    );
  }
}
export default NavBar;
