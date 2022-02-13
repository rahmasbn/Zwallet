import React from "react";
import Footer from "src/commons/components/Footer";
import Header from "src/commons/components/Header";
import Layout from "src/commons/components/Layout";
import ChangePassword from "src/commons/components/ChangePassword";
import Sidebar from "src/commons/components/Sidebar";

function UpdatePassword() {
  return (
    <>
      <Layout title={`Change Password | Zwallet`} />
      <Header />
      <div className="container">
        <div className="row py-5">
          <div className="col-sm-12 col-md-4 col-lg-3 mb-4">
            <Sidebar />
          </div>
          <div className="col">
            <ChangePassword />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default UpdatePassword;
