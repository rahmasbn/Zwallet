import Footer from "src/commons/components/Footer";
import Header from "src/commons/components/Header";
import Layout from "src/commons/components/Layout";
import PersonalInfo from "src/commons/components/PersonalInfo";
import Sidebar from "src/commons/components/Sidebar";

function PersonalInformation() {
  return (
    <>
      <Layout title={`Personal Information | Zwallet`} />
      <Header />
      <div className="container">
        <div className="row py-5">
          <div className="col-sm-12 col-md-4 col-lg-3 mb-4">
            <Sidebar />
          </div>
          <div className="col">
            <PersonalInfo />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default PersonalInformation;
