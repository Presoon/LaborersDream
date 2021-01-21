import React from "react";
import API from "../services/APIcontext";
import { Link } from "react-router-dom";
import InventoryEdit from "./subpages/InventoryEdit";
import { format } from "date-fns";

class Resources extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editVisibility: false,
      editResource: null,
      allResources: null,
      reload: null,
      message: null,
    };
  }

  async getResources() {
    await API.getAllResources().then((res) => {
      const resources = res.data;
      this.setState({
        allResources: resources,
      });
    });
  }

  async componentDidMount() {
    this.getResources();
  }

  async deleteResource(id) {
    await API.deleteResource(id).then((res) => {
      this.setState({ message: "Pomyślnie usunięto przedmiot" });
      this.getResources();
    });
  }

  editResource(resource) {
    this.setState({
      editVisibility: true,
      editResource: resource,
    });
  }

  render() {
    const { allResources, editVisibility, editResource } = this.state;
    return (
      <>
        <h1 id="title">Inwentarz</h1>
        <InventoryEdit
          visible={editVisibility}
          resource={editResource}
          reloadResources={this.getResources.bind(this)}
        />
        <Link to="/inventory/add">
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
                <th>NAZWA</th>
                <th>NUMER SERYJNY</th>
                <th>KLUCZ INSTALACJI</th>
                <th>DATA ZAKUPU</th>
                <th>LOKALIZACJA</th>
                <th>TYP</th>
                <th>DZIAŁANIE</th>
              </tr>
            </thead>
            <tbody>
              {allResources &&
                allResources.map((resource) => {
                  return (
                    <tr key={resource.id}>
                      <td>{resource.id}</td>
                      <td>{resource.specification}</td>
                      <td>{resource.seriesNumber}</td>
                      <td>{resource.instalationKey}</td>
                      <td>
                        {format(
                          new Date(resource.dateOfPurchase),
                          "dd/MM/yyyy kk:mm"
                        )}
                      </td>
                      <td>{resource.localization}</td>
                      <td>{resource.type === 1 ? "Software" : "Hardware"}</td>
                      <td className="operation">
                        <button
                          id="buttonScrap"
                          onClick={this.deleteResource.bind(this, resource.id)}
                        >
                          Usuń
                        </button>
                        <button
                          id="buttonEdit"
                          onClick={this.editResource.bind(this, resource)}
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

export default Resources;

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import API from "../services/APIcontext";

// const Table = () => {
//   const [resources, setResources] = useState([]);

//   useEffect(() => {
//     getData();
//   }, []);

//   const getData = async () => {
//     const response = await API.getAllResources();
//     setResources(response.data);
//   };

//   const renderHeader = () => {
//     let headerElement = [
//       "id",
//       "nazwa",
//       "numer seryjny",
//       "klucz instalacji",
//       "data zakupu",
//       "lokalizacja",
//       "działanie",
//     ];

//     return headerElement.map((key, index) => {
//       return <th key={index}>{key.toUpperCase()}</th>;
//     });
//   };

//   const renderBody = () => {
//     return (
//       resources &&
//       resources.map(
//         ({
//           id,
//           specification,
//           seriesNumber,
//           instalationKey,
//           dateOfPurchase,
//           localization,
//           isScrapped,
//         }) => {
//           if(isScrapped===false)
//           return (
//             <tr key={id}>
//               <td>{id}</td>
//               <td>{specification}</td>
//               <td>{seriesNumber}</td>
//               <td>{instalationKey}</td>
//               <td>{dateOfPurchase}</td>
//               <td>{localization}</td>
//               <td className="operation">
//                 <button id="buttonScrap">Zezłomuj</button>
//                 <button id="buttonEdit">Edytuj</button>
//               </td>
//             </tr>
//           );
//         }
//       )
//     );
//   };

//   return (
//     <>
//       <div id="top-bar">
//         <h1 id="title">Inwentarz</h1>
//       </div>
//       <div id="buttons">
//       <Link to="/inventory/add">
//         <button id="buttonAdd" className="ml-auto mt-5">
//           Dodaj
//         </button>
//       </Link>
//       <Link to="/inventory/scrapped">
//         <button id="buttonScrapped" className="ml-auto mt-5">
//           Zezłomowane
//         </button>
//       </Link>
//       </div>
//       <br />
//       <div
//         className="table-responsive table mt-2"
//         id="dataTable"
//         role="grid"
//         aria-describedby="dataTable_info"
//       >
//         <table id="dataTable" className="table my-0 inventory">
//           <thead>
//             <tr>{renderHeader()}</tr>
//           </thead>
//           <tbody>{renderBody()}</tbody>
//         </table>
//       </div>
//     </>
//   );
// };

// export default Table;
