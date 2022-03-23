import React from "react";
import { NavLink, withRouter } from "react-router-dom";

import menuItems from "../../configs/menuItems.config.json";

class SideMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleClass: "",
      isLoading: true
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: false
    });
  }

  activeRoute = routeName => {
    return "";
    // return this.props.router.pathname.indexOf(routeName) > -1 ? "active" : "";
  };

  toggleMenu = () => {
    if (this.state.toggleClass == "hidden") {
      this.setState({
        toggleClass: ""
      });
    } else {
      this.setState({
        toggleClass: "hidden"
      });
    }
  };

  signOut = () => {
    this.props.history.push("/login");
  };

  render() {
    const { isLoading } = this.state;

    return (
      <>
        <div className={`sidemenu ${this.state.toggleClass}`}>
          <ul className={`menu ${this.state.toggleClass}`}>
            {menuItems.map((menuItem, index) => {
              return (
                <li className={"menu-item"} key={index}>
                  <NavLink
                    to={menuItem.pathname}
                    className="menu-link"
                    activeClassName="active"
                    exact
                  >
                    {/* <a className="menu-link"> */}
                    <i className="material-icons">{menuItem.icon}</i>
                    <span className="menu-label">{menuItem.label}</span>
                    {/* </a> */}
                  </NavLink>
                </li>
              );
            })}
            <li onClick={this.signOut} className="menu-item">
              <div className="menu-link">
                <i className="material-icons">{"power_settings_new"}</i>
                <span className="menu-label">{"ออกจากระบบ"}</span>
              </div>
            </li>
          </ul>
        </div>
        <div onClick={this.toggleMenu} className="menu-toggle">
          <i className="material-icons">{"clear_all"}</i>
        </div>
      </>
    );
  }
}

export default withRouter(SideMenu);
