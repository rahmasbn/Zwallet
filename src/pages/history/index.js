import Footer from 'src/commons/components/Footer';
import Header from 'src/commons/components/Header';
import History from 'src/commons/components/History';
import Layout from 'src/commons/components/Layout';
import Sidebar from 'src/commons/components/Sidebar';

function transactionHistory() {
  return (
    <>
    <Layout title={`Transaction History | Zwallet`} />
    <Header />
    <div className="container">
      <div className="row py-5">
        <div className="col-sm-12 col-md-4 col-lg-3 mb-4">
          <Sidebar />
        </div>
        <div className="col">
          <History />
        </div>
      </div>
    </div>

    <Footer />
  </>
  )
}

export default transactionHistory;
