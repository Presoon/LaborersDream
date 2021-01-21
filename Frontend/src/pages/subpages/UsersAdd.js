import React from "react";
import { Link } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Select from "react-validation/build/select";
import required from "../../components/required";
import API from "../../services/APIcontext";

class UsersAdd extends React.Component {
  constructor(props) {
    super(props);

    this.handleNewUser = this.handleNewUser.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeSurname = this.onChangeSurname.bind(this);
    this.onChangeLogin = this.onChangeLogin.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeRole = this.onChangeRole.bind(this);

    this.state = {
      name: null,
      surname: null,
      login: null,
      password: null,
      role: "Administrator",

      loading: false,
      message: null,
    };
  }
  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }
  onChangeSurname(e) {
    this.setState({
      surname: e.target.value,
    });
  }
  onChangeLogin(e) {
    this.setState({
      login: e.target.value,
    });
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }
  onChangeRole(e) {
    this.setState({
      role: e.target.value,
    });
  }

  async handleNewUser(e) {
    e.preventDefault();

    this.setState({
      message: null,
      loading: true,
    });

    this.form.validateAll();

    const userx = {
      Name: this.state.name,
      Surname: this.state.surname,
      Login: this.state.login,
      Password: this.state.password,
      Role:
        this.state.role === "Administrator"
          ? 2
          : this.state.role === "Lab Technik"
          ? 0
          : 1,
    };

    if (this.checkBtn.context._errors.length === 0) {
      await API.createNewUser(userx).then(
        () => {
          this.setState({
            loading: false,
            message: "Użytkownik został dodany!",
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
  }
  render() {
    return (
      <>
        <Link to="/users">
          <button id="buttonAdd" className="ml-auto mt-5">
            Wróć
          </button>
        </Link>
        <div className="container mt-5">
          <div className="row">
            <div className="col-sm-6 p-4">
              <h3 className="mb-4">Dodawanie użytkownika</h3>
              <Form
                className="user"
                onSubmit={this.handleNewUser}
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
                    placeholder="Podaj login użytkownika..."
                    value={this.state.login}
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
                    placeholder="jego hasło logowania"
                    value={this.state.password}
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
                    value={this.state.name}
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
                    value={this.state.surname}
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
                    value={this.state.role}
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
                    <span>Utwórz użytkownika</span>
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
      </>
    );
  }
}

export default UsersAdd;
