import React, { Component } from "react";
import API from "../services/APIcontext";
import { format } from "date-fns";

class Tickets extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tickets: null,
      tab: null,
      reload: null,
      message: null,
    };
  }

  async getAllWaitingTickets() {
    await API.getAllWaitingTickets().then((res) => {
      const users = res.data;
      this.setState({
        tickets: users,
        tab: "Oczekujące Zgłoszenia",
      });
    });
  }
  async getAllTickets() {
    await API.getAllTickets().then((res) => {
      const users = res.data;
      this.setState({
        tickets: users,
        tab: "Wszystkie Zgłoszenia",
      });
    });
  }

  async changeTicketStatus(status, ticketId) {
    await API.updateTicketStatus(ticketId, { RepairStatus: status }).then(
      (res) => {
        this.setState({ message: "Edytowano status zgłoszenia!" });
      }
    );
  }

  async componentDidMount() {
    this.getAllTickets();
  }

  async deleteTicket(idTicket) {
    await API.deleteTicket(idTicket).then((res) => {
      this.setState({ message: "Pomyślnie usunięto ticket" });
      this.getAllTickets();
    });
  }

  render() {
    const { tickets } = this.state;
    return (
      <>
        <h1>Zgłoszenia</h1>
        <button
          id="buttonAdd"
          className="ml-auto mt-5"
          onClick={this.getAllTickets.bind(this)}
        >
          Wszystkie zgłoszenia
        </button>
        <button
          id="buttonAdd"
          className="ml-auto mt-5"
          onClick={this.getAllWaitingTickets.bind(this)}
        >
          Aktywne zgłoszenia
        </button>
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
                <th>ZASÓB</th>
                <th>LOKALIZACJA</th>
                <th>OPIS USTERKI</th>
                <th>ID ZGŁASZAJĄCEGO</th>
                <th>CZAS ZGŁOSZENIA</th>
                <th>STATUS NAPRAWY</th>
                <th>DZIAŁANIA</th>
              </tr>
            </thead>
            <tbody>
              {tickets &&
                tickets.map((ticket) => {
                  return (
                    <tr key={ticket.id}>
                      <td>{ticket.id} </td>
                      <td>{ticket.resource.specification}</td>
                      <td>{ticket.resource.localizationId}</td>
                      <td>{ticket.failureDescription}</td>
                      <td>{ticket.reporterId}</td>
                      <td>
                        {format(
                          new Date(ticket.dateOfReporting),
                          "dd/MM/yyyy kk:mm"
                        )}
                      </td>
                      <td>
                        {ticket.repairStatus === 0 ? (
                          <>
                            <span className="blink_me text-danger font-weight-bold">
                              Oczekujące
                            </span>
                          </>
                        ) : ticket.repairStatus === 2 ? (
                          <>
                            <span className="text-warning font-weight-bold">
                              Do zezłomowania
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="text-success font-weight-bold">
                              Zakończone
                            </span>
                          </>
                        )}
                      </td>

                      <td className="operation">
                        {ticket.repairStatus === 0 ? (
                          <>
                            <button
                              id="buttonEdit"
                              onClick={this.changeTicketStatus.bind(
                                this,
                                1,
                                ticket.id
                              )}
                            >
                              Zakończ zgłoszenie
                            </button>
                            <br />
                            <button
                              id="buttonMid"
                              onClick={this.changeTicketStatus.bind(
                                this,
                                2,
                                ticket.id
                              )}
                            >
                              Zezłomuj zasób
                            </button>
                            <br />
                          </>
                        ) : null}
                        <button
                          onClick={this.deleteTicket.bind(this, ticket.id)}
                          id="buttonScrap"
                        >
                          Usuń zgłoszenie
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

export default Tickets;
