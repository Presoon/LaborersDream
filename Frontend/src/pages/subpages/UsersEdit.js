import React, { Component } from "react";
import API from "../../services/APIcontext";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Select from "react-validation/build/select";
import required from "../../components/required";

class UsersEdit extends Component {
  constructor(props) {
    super(props);

    this.handleEditUser = this.handleEditUser.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeSurname = this.onChangeSurname.bind(this);
    this.onChangeLogin = this.onChangeLogin.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeRole = this.onChangeRole.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      loading: false,
      message: null,
      visible: false,
      user: {
        id: null,
        login: null,
        password: null,
        name: null,
        surname: null,
        role: "Administrator",
      },
    };
  }

  componentDidUpdate() {
    if (this.state.visible === this.props.visible) return;
    if (this.state.user.id === this.props.user.id) return;
    this.setState({
      visible: this.props.visible,
      user: {
        id: this.props.user.id,
        login: this.props.user.login,
        password: null,
        name: this.props.user.name,
        surname: this.props.user.surname,
        role:
          this.props.user.role === 2
            ? "Administrator"
            : this.props.user.role === 0
            ? "Lab Technik"
            : "Serwisant",
      },
    });
  }

  handleClose() {
    this.setState({
      visible: false,
    });
  }

  onChangeName(e) {
    this.setState({
      user: {
        ...this.state.user,
        name: e.target.value,
      },
    });
  }
  onChangeSurname(e) {
    this.setState({
      user: {
        ...this.state.user,
        surname: e.target.value,
      },
    });
  }
  onChangeLogin(e) {
    this.setState({
      user: {
        ...this.state.user,
        login: e.target.value,
      },
    });
  }
  onChangePassword(e) {
    this.setState({
      user: {
        ...this.state.user,
        password: e.target.value,
      },
    });
  }
  onChangeRole(e) {
    this.setState({
      user: {
        ...this.state.user,
        role: e.target.value,
      },
    });
  }

  async handleEditUser(e) {
    e.preventDefault();

    this.setState({
      message: null,
      loading: true,
    });

    this.form.validateAll();

    const userx = {
      Name: this.state.user.name,
      Surname: this.state.user.surname,
      Login: this.state.user.login,
      Password: this.state.user.password,
      Role:
        this.state.user.role === "Administrator"
          ? 2
          : this.state.user.role === "Lab Technik"
          ? 0
          : 1,
    };

    if (this.checkBtn.context._errors.length === 0) {
      await API.updateUser(this.state.user.id, userx).then(
        () => {
          this.setState({
            loading: false,
            message: "Użytkownik został edytowany!",
          });
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage,
          });
        }
      );
    } else {
      this.setState({
        loading: false,
      });
    }
    this.props.reloadUsers();
  }

  render() {
    const { visible, user } = this.state;
    return (
      <>
        <div
          className="modal"
          tabIndex="-1"
          role="dialog"
          style={{ display: visible ? "block" : "none" }}
        >
          {user && (
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    Edytowanie użytkownika o id {user.id}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={this.handleClose}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <Form
                    className="user"
                    onSubmit={this.handleEditUser}
                    ref={(c) => {
                      this.form = c;
                    }}
                  >
                    <div className="form-group">
                      <label>Login</label>
                      <Input
                        type="text"
                        className="form-control form-control-user"
                        name="login"
                        placeholder="Login"
                        value={user.login}
                        onChange={this.onChangeLogin}
                        validations={[required]}
                      />
                    </div>
                    <div className="form-group">
                      <label>Hasło</label>
                      <Input
                        type="password"
                        className="form-control form-control-user"
                        name="password"
                        placeholder="Hasło"
                        value={user.password}
                        onChange={this.onChangePassword}
                        validations={[required]}
                      />
                    </div>
                    <div className="form-group">
                      <label>Imię</label>
                      <Input
                        type="text"
                        className="form-control form-control-user"
                        name="name"
                        placeholder="imię"
                        value={user.name}
                        onChange={this.onChangeName}
                        validations={[required]}
                      />
                    </div>
                    <div className="form-group">
                      <label>Surname</label>
                      <Input
                        type="text"
                        className="form-control form-control-user"
                        name="surname"
                        placeholder="nazwisko"
                        value={user.surname}
                        onChange={this.onChangeSurname}
                        validations={[required]}
                      />
                    </div>
                    <div className="form-group">
                      <label>Rola</label>
                      <Select
                        type="text"
                        className="form-control"
                        name="role"
                        value={user.role}
                        onChange={this.onChangeRole}
                      >
                        <option>Administrator</option>
                        <option>Lab Technik</option>
                        <option>Serwisant</option>
                      </Select>
                    </div>
                    <div className="form-group">
                      <button
                        className="btn btn-primary btn-block text-white btn-user"
                        disabled={this.state.loading}
                      >
                        {this.state.loading && (
                          <span className="spinner-border spinner-border-sm"></span>
                        )}
                        <span>Zapisz zmiany</span>
                      </button>
                    </div>
                    {this.state.message && (
                      <div className="form-group">
                        <div className="alert alert-danger" role="alert">
                          {this.state.message}
                        </div>
                      </div>
                    )}
                    <CheckButton
                      style={{ display: "none" }}
                      ref={(c) => {
                        this.checkBtn = c;
                      }}
                    />
                    <hr />
                  </Form>
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
}

export default UsersEdit;
