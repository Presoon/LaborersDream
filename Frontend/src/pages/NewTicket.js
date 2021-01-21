import React from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import required from "../components/required";
import API from "../services/APIcontext";
import AuthService from "../services/auth.service";

class NewTicket extends React.Component {
  constructor(props) {
    super(props);

    this.handleNewTicket = this.handleNewTicket.bind(this);
    this.onChangeFailDesc = this.onChangeFailDesc.bind(this);
    this.onChangeResId = this.onChangeResId.bind(this);

    const user = AuthService.getCurrentUser();

    this.state = {
      failureDescription: null,
      resourceId: null,
      reporterId: user.id,

      loading: false,
      message: null,
    };
  }

  onChangeFailDesc(e) {
    this.setState({
      failureDescription: e.target.value,
    });
  }
  onChangeResId(e) {
    this.setState({
      resourceId: e.target.value,
    });
  }

  async handleNewTicket(e) {
    e.preventDefault();

    this.setState({
      message: null,
      loading: true,
    });

    this.form.validateAll();

    const ticket = {
      FailureDescription: this.state.failureDescription,
      ResourceId: parseInt(this.state.resourceId),
      ReporterId: parseInt(this.state.reporterId),
    };

    if (this.checkBtn.context._errors.length === 0) {
      await API.createNewTicket(ticket).then(
        () => {
          this.setState({
            loading: false,
            message: "Twoje zgłoszenie zostało wysłane!",
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
        <h1>Utwórz zgłoszenie</h1>
        <div className="container mt-5">
          <div className="row">
            <div className="col-sm-6 p-4">
              <h3 className="mb-4">Zgłoszenie usterki sprzętu</h3>
              <Form
                className="user"
                onSubmit={this.handleNewTicket}
                ref={(c) => {
                  this.form = c;
                }}
              >
                <div className="form-group">
                  <label>Opis usterki</label>
                  <Input
                    type="text"
                    className="form-control form-control-user"
                    name="failureDescription"
                    placeholder="Podaj opis usterki..."
                    value={this.state.failureDescription}
                    onChange={this.onChangeFailDesc}
                    validations={[required]}
                  />
                </div>
                <div className="form-group">
                  <label>Identyfikator urządzenia</label>
                  <Input
                    type="number"
                    className="form-control form-control-user"
                    name="resourceId"
                    placeholder="identyfikator urządzenia"
                    min="0"
                    value={this.state.resourceId}
                    onChange={this.onChangeResId}
                    validations={[required]}
                  />
                </div>
                <div className="form-group">
                  <label>Identyfikator zgłaszającego</label>
                  <Input
                    type="number"
                    disabled
                    className="form-control form-control-user"
                    name="reporterId"
                    placeholder="...oraz swój identyfikator"
                    value={this.state.reporterId}
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
                    <span>Utwórz zgłoszenie</span>
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

export default NewTicket;
