import Balance from "src/commons/components/Balance";
import Footer from "src/commons/components/Footer";
import Graph from "src/commons/components/Graph";
import Header from "src/commons/components/Header";
import Layout from "src/commons/components/Layout";
import Sidebar from "src/commons/components/Sidebar";
import Transaction from "src/commons/components/Transaction";

function Dashboard() {
  return (
    <>
      <Layout title={`Dashboard | Zwallet`} />
      <Header />
      <div className="container">
        <div className="row py-5">
          <div className="col-sm-12 col-md-4 col-lg-3 mb-4">
            <Sidebar />
          </div>
          <div className="col">
            <Balance />
            <div className="row pt-3 pt-lg-4">
              <div className="col-lg-7 mb-md-0 d-none d-lg-block">
                <Graph />
              </div>
              <div className="col">
                <Transaction />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Dashboard;
