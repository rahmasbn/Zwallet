import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";
// import { Modal } from "react-bootstrap";
import styles from "src/commons/styles/Dashboard.module.css";
import TopUpModal from "./TopUpModal";

function Balance() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const userData = useSelector(state=> state.user.userData)

  const formatNumber = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(userData.balance).replace(/(\.|,)00$/g, '');
  return (
    <>
      <div
        className={`card border-0 shadow text-white ${styles["bg-balance"]}`}
      >
        <div className="card-body">
          <div className="container">
            <div className="d-flex justify-content-between flex-wrap">
              <div>
                <p className={`mb-2 ${styles.balance}`}>Balance</p>
                <h2 className="fw-bold">{formatNumber}</h2>
                <p className={`mb-1 mt-2 ${styles.phone}`}>{userData.noTelp !== null ? userData.noTelp : "-"}</p>
              </div>
              <div className="d-flex col-lg-2">
                <div className="align-self-center">
                  <Link href={"/transfer"} passHref>
                    <a className="text-decoration-none">
                      <button
                        className={`btn btn-block btn-outline-light mb-3 w-100 ${styles["btn-balance"]}`}
                      >
                        <span className="bi bi-arrow-up"></span> Transfer
                      </button>
                    </a>
                  </Link>
                  <button
                    className="btn btn-block btn-outline-light w-100"
                    onClick={handleShow}
                  >
                    <span className="bi bi-plus-lg pe-2"></span>
                    Top Up
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal topup */}
        <TopUpModal show={show} handleClose={handleClose} />
      </div>
    </>
  );
}

export default Balance;
