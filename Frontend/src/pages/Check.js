import React from "react";
import API from "../services/APIcontext";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

class Check extends React.Component {
  constructor(props) {
    super(props);
    this.handleCheck = this.handleCheck.bind(this);
    this.onChangeSnb = this.onChangeSnb.bind(this);
  }

  state = {
    displayinfo: null,
    message: {},
    loading: false,
    seriesnumber: null,
  };

  onChangeSnb(e) {
    this.setState({
      seriesnumber: e.target.value,
    });
  }

  handleCheck(e) {
    e.preventDefault();

    this.setState({
      message: {},
      loading: true,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      API.getQRCodeInfo(this.state.seriesnumber).then(
        (response) => {
          this.setState({
            displayinfo: response.data,
            loading: false,
          });
        },
        (error) => {
          this.setState({
            message:
              (error.response && error.response.data) ||
              error.message ||
              error.toString(),
            loading: false,
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
    const { displayinfo } = this.state;
    return (
      <>
        <h1>Sprawdzanie sprzętu</h1>
        <div className="container mt-5">
          <div className="row">
            <div className="col-sm-6 p-4">
              <Form
                onSubmit={this.handleCheck}
                ref={(c) => {
                  this.form = c;
                }}
              >
                <div className="form-group">
                  <label>Wprowadź numer seryjny obiektu:</label>
                  <Input
                    type="text"
                    className="form-control form-control-user"
                    name="snb"
                    placeholder="series-number..."
                    value={this.state.seriesnumber}
                    onChange={this.onChangeSnb}
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
                    <span>Sprawdź dane sprzętu</span>
                  </button>
                </div>
                {this.state.message.title && (
                  <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                      {this.state.message.title
                        ? "Wprowadzono niepoprawny numer seryjny"
                        : ""}
                    </div>
                  </div>
                )}
                <CheckButton
                  style={{ display: "none" }}
                  ref={(c) => {
                    this.checkBtn = c;
                  }}
                />
              </Form>
            </div>

            <div className="col-sm-6 p-4">
              {displayinfo && <DisplayInfo info={displayinfo} />}
            </div>
          </div>
        </div>
      </>
    );
  }
}

const DisplayInfo = (props) => (
  <>
    <div>
      <br />
      <h2>Informacje o sprzęcie:</h2>
      <br />
      <p>
        <span>ID: </span>
        <b>{props.info.id}</b>
      </p>
      <p>
        <span>Name: </span>
        <b>{props.info.specification}</b>
      </p>
      <p>
        <span>Series Number: </span>
        <b>{props.info.seriesNumber}</b>
      </p>
    </div>
  </>
);

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger mt-2" role="alert">
        To pole jest wymagane!
      </div>
    );
  }
};

export default Check;
