// import Amount from "src/commons/components/Amount";
import Footer from "src/commons/components/Footer";
import Header from "src/commons/components/Header";
import Layout from "src/commons/components/Layout";
import Receiver from "src/commons/components/Receiver";
// import MyProfile from "src/commons/components/MyProfile";
import Sidebar from "src/commons/components/Sidebar";

function Profile() {
  return (
    <>
      <Layout title={`Transfer | Zwallet`} />
      <Header />
      <div className="container">
        <div className="row py-5">
          <div className="col-sm-12 col-md-4 col-lg-3 mb-4">
            <Sidebar />
          </div>
          <div className="col">
            <Receiver/>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Profile;
