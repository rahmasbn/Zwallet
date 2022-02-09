import Footer from "src/commons/components/Footer";
import Header from "src/commons/components/Header";
import Layout from "src/commons/components/Layout";
import ManageNumber from "src/commons/components/ManageNumber";
import Sidebar from "src/commons/components/Sidebar";
import AddNumber from "src/commons/components/AddNumber";
import { useSelector } from "react-redux";

function ManagePhoneNumber() {

  const phone = useSelector(state=> state.user.userData.noTelp)
  // console.log(phone)

  return (
    <>
      <Layout title={`Manage Number | Zwallet`} />
      <Header />
      <div className="container">
        <div className="row py-5">
          <div className="col-sm-12 col-md-4 col-lg-3 mb-4">
            <Sidebar />
          </div>
          <div className="col">
            {phone !== null && phone !== "" ? (<ManageNumber />) : (<AddNumber />)}
            {/* <AddNumber/> */}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ManagePhoneNumber;
