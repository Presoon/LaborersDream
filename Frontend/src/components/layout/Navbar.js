import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import AuthService from "../../services/auth.service";

class Navbar extends Component {
  user = AuthService.getCurrentUser();

  toggleNavBarCollapsed = () => {
    const el = document.getElementById("navCollapsed");
    if (!el.classList.contains("toggled")) {
      el.classList.add("toggled");
    } else {
      el.classList.remove("toggled");
    }
  };

  render() {
    return (
      <>
        <nav
          id="navCollapsed"
          className="navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0"
        >
          <div className="container-fluid d-flex flex-column p-0">
            <Link
              className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0"
              to="/home"
            >
              <div className="sidebar-brand-icon ">
                <img className="logoimg" src="assets/img/logo.png" alt="sd" />
              </div>
              <div className="sidebar-brand-text mx-3">
                <span>
                  Marzenie <br />
                  Laboranta
                </span>
              </div>
            </Link>
            <hr className="sidebar-divider my-0" />
            <ul className="nav navbar-nav text-light" id="accordionSidebar">
              <li className="nav-item" role="presentation">
                <NavLink className="nav-link" exact to="/home">
                  <i className="fas fa-home" style={{ minWidth: 20 }} />
                  <span>Strona główna</span>
                </NavLink>
              </li>
              {this.user.role === 0 ? ( //lab technik
                <>
                  <li className="nav-item" role="presentation">
                    <NavLink className="nav-link" to="/newticket">
                      <i className="fas fa-bug" style={{ minWidth: 20 }} />
                      <span>Utwórz zgłoszenie</span>
                    </NavLink>
                  </li>
                  <li className="nav-item" role="presentation">
                    <NavLink className="nav-link" to="/check">
                      <i
                        className="fas fa-question-circle"
                        style={{ minWidth: 20 }}
                      />
                      <span>Sprawdź sprzęt</span>
                    </NavLink>
                  </li>
                </>
              ) : this.user.role === 1 ? ( //serwis
                  <>
                    <li className="nav-item" role="presentation">
                      <NavLink className="nav-link" to="/check">
                        <i
                          className="fas fa-question-circle"
                          style={{ minWidth: 20 }}
                        />
                        <span>Sprawdź sprzęt</span>
                      </NavLink>
                    </li>
                    <li className="nav-item" role="presentation">
                      <NavLink className="nav-link" to="/tickets">
                        <i className="fas fa-book" style={{ minWidth: 20 }} />
                        <span>System zgłoszeń</span>
                      </NavLink>
                    </li>
                  </>
              ) : ( //admin
                <>
                  <li className="nav-item" role="presentation">
                    <NavLink className="nav-link" to="/newticket">
                      <i className="fas fa-bug" style={{ minWidth: 20 }} />
                      <span>Utwórz zgłoszenie</span>
                    </NavLink>
                  </li>
                  <li className="nav-item" role="presentation">
                    <NavLink className="nav-link" to="/tickets">
                      <i className="fas fa-book" style={{ minWidth: 20 }} />
                      <span>System zgłoszeń</span>
                    </NavLink>
                  </li>
                  <li className="nav-item" role="presentation">
                    <NavLink className="nav-link" to="/inventory">
                      <i className="fas fa-cubes" style={{ minWidth: 20 }} />
                      <span>Inwentarz</span>
                    </NavLink>
                  </li>
                  <li className="nav-item" role="presentation">
                      <NavLink className="nav-link" to="/check">
                        <i
                          className="fas fa-question-circle"
                          style={{ minWidth: 20 }}
                        />
                        <span>Sprawdź sprzęt</span>
                      </NavLink>
                    </li>
                  <li className="nav-item" role="presentation">
                    <NavLink className="nav-link" to="/users">
                      <i className="fas fa-users" style={{ minWidth: 20 }} />
                      <span>Użytkownicy</span>
                    </NavLink>
                  </li>
                  <li className="nav-item" role="presentation">
                    <NavLink className="nav-link" to="/localizations">
                      <i className="fas fa-globe" style={{ minWidth: 20 }} />
                      <span>Lokalizacje</span>
                    </NavLink>
                  </li>
                </>
              )} 
              <li className="nav-item" role="presentation">
                <NavLink
                  className="nav-link"
                  to="/login"
                  onClick={() => {
                    AuthService.logout();
                    window.location.reload();
                  }}
                >
                  <i className="fas fa-user-circle" style={{ minWidth: 20 }} />
                  <span>Wyloguj</span>
                </NavLink>
              </li>
            </ul>
            <div className="text-center d-none d-md-inline">
              <button
                className="btn rounded-circle border-0"
                id="sidebarToggle"
                type="button"
                onClick={this.toggleNavBarCollapsed}
              />
            </div>
          </div>
        </nav>
      </>
    );
  }
}

export default Navbar;
