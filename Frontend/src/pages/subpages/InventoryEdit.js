import React, { Component } from "react";
import API from "../../services/APIcontext";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import required from "../../components/required";
import CheckButton from "react-validation/build/button";

class InventoryEdit extends Component {
  constructor(props) {
    super(props);

    this.handleEditResource = this.handleEditResource.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeSeriesNumber = this.onChangeSeriesNumber.bind(this);
    this.onChangeInstalationKey = this.onChangeInstalationKey.bind(this);
    this.onChangeDateOfPurchase = this.onChangeDateOfPurchase.bind(this);
    this.onChangeLocalization = this.onChangeLocalization.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      loading: false,
      message: null,
      visible: false,
      resource: {
        id: null,
        specification: null,
        seriesNumber: null,
        instalationKey: null,
        dateOfPurchase: null,
        localization: null,
        type: "Hardware",
      },
    };
  }

  componentDidUpdate() {
    if (this.state.visible === this.props.visible) return;
    if (this.state.resource.id === this.props.resource.id) return;
    this.setState({
      visible: this.props.visible,
      resource: {
        id: this.props.resource.id,
        specification: this.props.resource.specification,
        seriesNumber: this.props.resource.seriesNumber,
        instalationKey: this.props.resource.instalationKey,
        dateOfPurchase: this.props.resource.dateOfPurchase,
        localization: this.props.resource.localization,
        type: this.props.resource.type === 0 ? "Hardware" : "Software",
      },
    });
  }

  handleClose() {
    this.setState({
      visible: false,
      message: null,
    });
  }
  onChangeName(e) {
    this.setState({
      resource: {
        ...this.state.resource,
        specification: e.target.value,
      },
    });
  }
  onChangeSeriesNumber(e) {
    this.setState({
      resource: {
        ...this.state.resource,
        seriesNumber: e.target.value,
      },
    });
  }
  onChangeInstalationKey(e) {
    this.setState({
      resource: {
        ...this.state.resource,
        instalationKey: e.target.value,
      },
    });
  }
  onChangeDateOfPurchase(e) {
    this.setState({
      resource: {
        ...this.state.resource,
        dateOfPurchase: e.target.value,
      },
    });
  }
  onChangeLocalization(e) {
    this.setState({
      resource: {
        ...this.state.resource,
        localization: e.target.value,
      },
    });
  }
  onChangeType(e) {
    this.setState({
      resource: {
        ...this.state.resource,
        type: e.target.value,
      },
    });
  }

  async handleEditResource(e) {
    e.preventDefault();

    this.setState({
      message: null,
      loading: true,
    });

    this.form.validateAll();

    const resource = {
      Specification: this.state.resource.specification,
      SeriesNumber: this.state.resource.seriesNumber,
      InstalationKey: this.state.resource.instalationKey,
      DateOfPurchase: this.state.resource.dateOfPurchase,
      LocalizationId: parseInt(this.state.resource.localization),
      Type: this.state.resource.type === "Hardware" ? 0 : 1,
    };

    if (this.checkBtn.context._errors.length === 0) {
      await API.updateResource(this.state.resource.id, resource).then(
        () => {
          this.setState({
            loading: false,
            message: "Edytowano sprzęt",
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
    this.props.reloadResources();
  }

  render() {
    const { visible, resource } = this.state;
    return (
      <>
        <div
          className="modal"
          tabIndex="-1"
          role="dialog"
          style={{ display: visible ? "block" : "none" }}
        >
          {resource && (
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    Edytowanie sprzętu o numerze seryjnym{" "}
                    {resource.seriesNumber}
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
                    className="resource"
                    onSubmit={this.handleEditResource}
                    ref={(c) => {
                      this.form = c;
                    }}
                  >
                    <div className="form-group">
                      <label>Nazwa</label>
                      <Input
                        type="text"
                        className="form-control form-control-user"
                        name="nazwa"
                        placeholder="Nazwa"
                        value={resource.specification}
                        onChange={this.onChangeName}
                        validations={[required]}
                      />
                    </div>
                    <div className="form-group">
                      <label>Klucz instalacji</label>
                      <Input
                        type="text"
                        className="form-control form-control-user"
                        name="instalationkey"
                        placeholder="Klucz instalacji"
                        value={resource.instalationKey}
                        onChange={this.onChangeInstalationKey}
                        validations={[required]}
                      />
                    </div>
                    <div className="form-group">
                      <label>Numer seryjny</label>
                      <Input
                        type="text"
                        disabled
                        className="form-control form-control-user"
                        name="instalationkey"
                        placeholder="Klucz instalacji"
                        value={resource.seriesNumber}
                        onChange={this.onChangeInstalationKey}
                        validations={[required]}
                      />
                    </div>
                    <div className="form-group">
                      <label>Data zakupu</label>
                      <Input
                        type="datetime-local"
                        className="form-control form-control-user"
                        name="dateofpurchase"
                        placeholder="Data"
                        value={resource.dateOfPurchase}
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
                        placeholder="Lokalizacja"
                        min="0"
                        value={resource.localization}
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
                        placeholder="Typ"
                        value={resource.type}
                        onChange={this.onChangeType}
                        validations={[required]}
                      >
                        <option>Hardware</option>
                        <option>Software</option>
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

export default InventoryEdit;
