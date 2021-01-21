import React from "react";
import API from "../services/APIcontext";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import required from "../components/required";

class Localizations extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allLocalizations: null,
      reload: null,
      message: null,
      localizationName: null,
    };

    this.handleNewLocalization = this.handleNewLocalization.bind(this);
    this.onChangeLocalizationName = this.onChangeLocalizationName.bind(this);
  }

  async getLocalizations() {
    await API.getAllLocalizations().then((res) => {
      const ress = res.data;
      this.setState({
        allLocalizations: ress,
      });
    });
  }

  async componentDidMount() {
    this.getLocalizations();
  }

  onChangeLocalizationName(e) {
    this.setState({
      localizationName: e.target.value,
    });
  }

  async handleNewLocalization(e) {
    e.preventDefault();

    this.setState({
      message: null,
      loading: true,
    });

    this.form.validateAll();

    const locc = {
      Name: this.state.localizationName,
    };

    if (this.checkBtn.context._errors.length === 0) {
      await API.addNewLocalization(locc).then(
        () => {
          this.setState({
            loading: false,
            message: "Lokalizacja została dodana!",
            localizationName: "Lokalizacja",
          });
          this.getLocalizations();
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
    const { allLocalizations } = this.state;
    return (
      <>
        <h1>Lokalizacje</h1>

        <div className="container row">
          <div
            className="table-responsive table mt-2 col-sm-12 col-md-6"
            id="dataTable"
            role="grid"
            aria-describedby="dataTable_info"
          >
            <table id="dataTable" className="table my-0 inventory">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAZWA</th>
                </tr>
              </thead>
              <tbody>
                {allLocalizations &&
                  allLocalizations.map((loc) => {
                    return (
                      <tr key={loc.id}>
                        <td>{loc.id}</td>
                        <td>{loc.name}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <div className="col-sm-12 col-md-6 px-5 mt-4">
            <Form
              className="user"
              onSubmit={this.handleNewLocalization}
              ref={(c) => {
                this.form = c;
              }}
            >
              <h4>Dodawanie nowej lokalizacji</h4>
              <div className="form-group">
                <label>Nazwa lokalizacji</label>
                <Input
                  type="text"
                  className="form-control form-control-user"
                  name="name"
                  placeholder="Podaj nazwę lokalizacji..."
                  value={this.state.localizationName}
                  onChange={this.onChangeLocalizationName}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <button
                  className="btn btn-primary btn-block text-white btn-user"
                  disabled={this.state.loading}
                >
                  {this.state.loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Dodaj lokalizację</span>
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
      </>
    );
  }
}

export default Localizations;
