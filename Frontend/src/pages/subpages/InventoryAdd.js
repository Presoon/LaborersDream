import React from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import required from "../../components/required";
import Select from "react-validation/build/select";
import API from "../../services/APIcontext";
import AuthService from "../../services/auth.service";
import { Link } from "react-router-dom";

class InventoryAdd extends React.Component {
  constructor(props) {
    super(props);

    this.handleNewResource = this.handleNewResource.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeSeriesNumber = this.onChangeSeriesNumber.bind(this);
    this.onChangeInstalationKey = this.onChangeInstalationKey.bind(this);
    this.onChangeDateOfPurchase = this.onChangeDateOfPurchase.bind(this);
    this.onChangeLocalization = this.onChangeLocalization.bind(this);
    this.onChangeType = this.onChangeType.bind(this);

    const user = AuthService.getCurrentUser();

    this.state = {
      name: null,
      seriesNumber: null,
      instalationKey: null,
      dateOfPurchase: null,
      localization: null,
      userId: user.id,
      type: "Hardware",

      loading: false,
      message: null,
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }
  onChangeSeriesNumber(e) {
    this.setState({
      seriesNumber: e.target.value,
    });
  }
  onChangeInstalationKey(e) {
    this.setState({
      instalationKey: e.target.value,
    });
  }

  onChangeDateOfPurchase(e) {
    this.setState({
      dateOfPurchase: e.target.value,
    });
  }
  onChangeLocalization(e) {
    this.setState({
      localization: e.target.value,
    });
  }
  onChangeType(e) {
    this.setState({
      type: e.target.value,
    });
  }

  async handleNewResource(e) {
    e.preventDefault();

    this.setState({
      message: null,
      loading: true,
    });

    this.form.validateAll();

    const resource = {
      Specification: this.state.name,
      InstalationKey: this.state.instalationKey,
      DateOfPurchase: this.state.dateOfPurchase,
      LocalizationId: parseInt(this.state.localization),
      Type: this.state.type === "Hardware" ? 0 : 1,
    };

    if (this.checkBtn.context._errors.length === 0) {
      await API.addNewResource(resource).then(
        () => {
          this.setState({
            loading: false,
            message: "Dodano sprzęt",
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
        <h1>Dodawanie nowego sprzętu</h1>
        <Link to="/inventory">
          <button id="buttonAdd" className="ml-auto mt-5">
            Wróć
          </button>
        </Link>
        <div className="container mt-5">
          <div className="row">
            <div className="col-sm-6 p-4">
              <Form
                className="user"
                onSubmit={this.handleNewResource}
                ref={(c) => {
                  this.form = c;
                }}
              >
                <div className="form-group">
                  <label>Nazwa sprzętu</label>
                  <Input
                    type="text"
                    className="form-control form-control-user"
                    name="name"
                    placeholder="Podaj nazwę sprzętu"
                    value={this.state.name}
                    onChange={this.onChangeName}
                    validations={[required]}
                  />
                </div>
                {/*
                <div className="form-group">
                  <label>Numer seryjny</label>
                  <Input
                    type="text"
                    className="form-control form-control-user"
                    name="seriesNumber"
                    placeholder="Podaj numer seryjny..."
                    value={this.state.seriesNumber}
                    onChange={this.onChangeSeriesNumber}
                    validations={[required]}
                  />
                </div>
                */}
                <div className="form-group">
                  <label>Klucz instalacji</label>
                  <Input
                    type="text"
                    className="form-control form-control-user"
                    name="instalationKey"
                    placeholder="Podaj klucz instalacji"
                    value={this.state.instalationKey}
                    onChange={this.onChangeInstalationKey}
                    validations={[required]}
                  />
                </div>
                <div className="form-group">
                  <label>Data zakupu</label>
                  <Input
                    type="datetime-local"
                    className="form-control form-control-user"
                    name="dateOfPurchase"
                    //placeholder="Podaj datę zakupu..."
                    value={this.state.dateOfPurchase}
                    onChange={this.onChangeDateOfPurchase}
                    validations={[required]}
                  />
                </div>
                <div className="form-group">
                  <label>Lokalizacja</label>
                  <Input
                    type="number"
                    className="form-control form-control-user"
                    name="localization"
                    placeholder="Podaj id lokalizacji"
                    min="0"
                    value={this.state.localization}
                    onChange={this.onChangeLocalization}
                    validations={[required]}
                  />
                </div>
                <div className="form-group">
                  <label>Typ</label>
                  <Select
                    type="text"
                    className="form-control"
                    name="type"
                    placeholder="Podaj typ"
                    value={this.state.type}
                    onChange={this.onChangeType}
                    //validations={[required]}
                    >
                    <option>Hardware</option>
                    <option>Software</option>
                  </Select>
                </div>

                <div className="form-group">
                  <label>Identyfikator dodającego</label>
                  <Input
                    type="number"
                    disabled
                    className="form-control form-control-user"
                    name="userId"
                    placeholder="...oraz swój identyfikator"
                    value={this.state.userId}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label> </label>
                  <button
                    className="btn btn-primary btn-block text-white btn-user"
                    disabled={this.state.loading}
                  >
                    {this.state.loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Dodaj sprzęt</span>
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

export default InventoryAdd;
