import React from "react";
import API from "../../services/APIcontext";
import { Link } from "react-router-dom";
import UsersEdit from "./UsersEdit";

class Users extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allUsers: null,
      reload: null,
      message: null,
      editVisibility: false,
      editUser: null,
    };
  }

  async getUsers() {
    await API.getAllUsers().then((res) => {
      const users = res.data;
      this.setState({
        allUsers: users,
      });
    });
  }

  async componentDidMount() {
    this.getUsers();
  }

  async deleteUser(idUser) {
    await API.deleteUser(idUser).then((res) => {
      this.setState({ message: "Pomyślnie usunięto użytkownika" });
      this.getUsers();
    });
  }

  editUser(user) {
    console.log("Zmieniono state");
    this.setState({
      editVisibility: true,
      editUser: user,
    });
  }
  render() {
    const { allUsers, editVisibility, editUser } = this.state;
    return (
      <>
        <h1>Użytkownicy</h1>
        <UsersEdit
          visible={editVisibility}
          user={editUser}
          reloadUsers={this.getUsers.bind(this)}
        />
        <Link to="users/add">
          <button id="buttonAdd" className="ml-auto mt-5">
            Dodaj
          </button>
        </Link>
        {this.state.message && (
          <div className="alert alert-danger" role="alert">
            {this.state.message}
          </div>
        )}
        <div
          className="table-responsive table mt-2"
          id="dataTable"
          role="grid"
          aria-describedby="dataTable_info"
        >
          <table id="dataTable" className="table my-0 inventory">
            <thead>
              <tr>
                <th>ID</th>
                <th>LOGIN</th>
                <th>IMIĘ</th>
                <th>NAZWISKO</th>
                <th>ROLA</th>
                <th>AKCJE</th>
              </tr>
            </thead>
            <tbody>
              {allUsers &&
                allUsers.map((user) => {
                  return (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.login}</td>
                      <td>{user.name}</td>
                      <td>{user.surname}</td>
                      <td>
                        {user.role === 2
                          ? "Administrator"
                          : user.role === 0
                          ? "Technik"
                          : "Serwisant"}
                      </td>
                      <td className="operation">
                        <button
                          onClick={this.deleteUser.bind(this, user.id)}
                          id="buttonScrap"
                        >
                          Usuń
                        </button>
                        <button
                          id="buttonEdit"
                          onClick={this.editUser.bind(this, user)}
                        >
                          Edytuj
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

export default Users;
