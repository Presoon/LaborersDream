import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <>
        <footer className="bg-white sticky-footer">
          <div className="container my-auto">
            <div className="text-center my-auto copyright">
              <span>
                Copyright © Laborer's Dream | 2020-2021 <br />
                K.Szpak & P. Magdziarz & A. Dzierżawa & A. Giza
              </span>
            </div>
          </div>
        </footer>
      </>
    );
  }
}

export default Footer;
