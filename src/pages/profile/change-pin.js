import React from "react";
import Footer from "src/commons/components/Footer";
import Header from "src/commons/components/Header";
import Layout from "src/commons/components/Layout";
import ChangePIN from "src/commons/components/ChangePIN";
import Sidebar from "src/commons/components/Sidebar";

function UpdatePIN() {
  return (
    <>
      <Layout title={`Change PIN | Zwallet`} />
      <Header />
      <div className="container">
        <div className="row py-5">
          <div className="col-sm-12 col-md-4 col-lg-3 mb-4">
            <Sidebar />
          </div>
          <div className="col">
            <ChangePIN />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default UpdatePIN;
