import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { logout } from "../../services/auth";
import "./Navbar.css";
import logo from "../../images/LOGO_1.png";
import LogInModal from "../LogInModal/LogInModal";
import SignUpModal from "../SignUpModal/SignUpModal";
import MenuMobile from "../MenuMobile/MenuMobile";
// import ArtistOpen from "../LandingPages/ArtistOpen/ArtistOpen";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLogin: false,
      showSignup: false,
      user: props.user,
      showMenu: false,
    };
    this.setUser = this.setUser.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  handleLogout = () => {
    logout().then(() => {
      this.setState({ user: null });
    });
  };

  showLoginModal = () => {
    this.setState({ showLogin: true });
  };

  showSignupModal = () => {
    this.setState({ showSignup: true });
  };

  showMenuMobile = () => {
    this.state.showMenu
      ? this.setState({ showMenu: false })
      : this.setState({ showMenu: true });
  };

  hideModal = () => {
    this.setState({ showLogin: false });
    this.setState({ showSignup: false });
    this.setState({ showMenu: false });
  };

  setUser = (user) => {
    this.setState({
      user: user,
    });
  };

  componentDidMount() {
    const user = localStorage.getItem("user");
    this.setState({
      user: user,
    });
  }

  render() {
    return (
      <div>
        <div id="navbar">
          <a href="/">
            <img src={logo} alt="ORA" width="auto" height="50px" />
          </a>
          <ul id="navtitles">
            <li>
              <NavLink
                className="link"
                activeClassName="activeLink"
                to="/what-is-ora"
              >
                WHAT IS ORA?
              </NavLink>
            </li>
            <li>
              <NavLink
                className="link"
                activeClassName="activeLink"
                to="/artist-open-call"
              >
                ARTIST OPEN CALL
              </NavLink>
            </li>
            <li>
              <NavLink
                className="link"
                activeClassName="activeLink"
                to="/collector-space"
              >
                COLLECTOR SPACE
              </NavLink>
            </li>
            <li>
              <NavLink
                className="link"
                activeClassName="activeLink"
                to="/support-an-artist-project"
              >
                SUPPORT AN ARTIST PROJECT
              </NavLink>
            </li>
            {this.state.user ? (
              <>
                <li>
                  {this.state.user.userType === "gallery" ? (
                    <Link className="link" to="/gallery/profile">
                      MY PROFILE
                    </Link>
                  ) : (
                    <Link className="link" to="/collector/profile">
                      MY PROFILE
                    </Link>
                  )}
                  <Link
                    className="link"
                    to="/"
                    onClick={() => this.handleLogout()}
                  >
                    / LOG OUT
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <button className="btnAuth" onClick={this.showSignupModal}>
                    SIGN UP
                  </button>
                  <SignUpModal
                    show={this.state.showSignup}
                    handleClose={this.hideModal}
                    setUser={this.setUser}
                  />
                  {/* <Link className ="link" to='/signup'>SIGN UP</Link> */}
                  <button className="btnAuth" onClick={this.showLoginModal}>
                    / LOG IN
                  </button>
                  <LogInModal
                    showLogin={this.state.showLogin}
                    handleClose={this.hideModal}
                    setUser={this.setUser}
                  />
                </li>
              </>
            )}
          </ul>
          <button onClick={this.showMenuMobile} id="btnMenuMobile">
            {this.state.showMenu ? "CLOSE" : "MENU"}{" "}
          </button>
        </div>
        <MenuMobile
          showMenu={this.state.showMenu}
          handleClose={this.hideModal}
        ></MenuMobile>
      </div>
    );
  }
}

export default Navbar;
