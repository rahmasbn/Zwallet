import Image from "next/image";
import Footer from "src/commons/components/Footer";
import Header from "src/commons/components/Header";
import Layout from "src/commons/components/Layout";
import Sidebar from "src/commons/components/Sidebar";
import styles from "src/commons/styles/History.module.css";
import avatar from "public/avatar.jpg";
import success from "public/success.svg";
import failed from "public/failed.svg";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { exportHistory, historyById } from "src/modules/utils/transaction";
import Link from "next/link";

function HistoryDetail() {
  const router = useRouter();
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth.authUser);
  const user = useSelector((state) => state.user.userData);
  const [detailHistory, setDetailHistory] = useState({});
  const formatAmount = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  })
    .format(detailHistory.amount)
    .replace(/(\.|,)00$/g, "");
  const formatBalance = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  })
    .format(user.balance)
    .replace(/(\.|,)00$/g, "");

  const moment = require("moment");
  let date = moment(detailHistory.createdAt).format("YYYY-MM-DD - hh:mm:ss");

  const onDownload = () => {
    const { id } = router.query;
    exportHistory(id, authUser.token)
      .then((res) => {
        //   console.log(res.data);
        // setUrl(res.data.data.url);
        window.open(res.data.data.url, "_blank");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const { id } = router.query;
    historyById(id, authUser.token)
      .then((res) => {
        // console.log(res.data.data[0]);
        setDetailHistory(res.data.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [router, dispatch, detailHistory, authUser.token]);
  //   console.log('history', detailHistory)
  return (
    <>
      <Layout title={`Transaction Detail | Zwallet`} />
      <Header />
      <div className="container">
        <div className="row py-5">
          <div className="col-sm-12 col-md-4 col-lg-3 mb-4">
            <Sidebar />
          </div>
          <div className="col">
            <div
              className={`card border-0 shadow py-2 px-3 ${styles.overflow} ${styles.card}`}
            >
              <div className="card-body">
                <div className={`ms-auto me-auto mb-3 ${styles["status-img"]}`}>
                  <Image
                    src={detailHistory.status === "success" ? success : failed}
                    alt="status"
                  />
                </div>
                <h5 className="fw-bold text-center mb-5">
                  {detailHistory.status === "success"
                    ? "Transaction Success"
                    : "Transaction Failed"}
                </h5>
                {detailHistory.type === "send" ||
                detailHistory.type === "accept" ? (
                  <>
                    <div className="card border-0 shadow mb-2">
                      <div className={`${styles["card-body"]}`}>
                        <p className="text-muted mb-2">Amount</p>
                        <p className={`fw-bold m-0 ${styles.detail}`}>
                          {formatAmount}
                        </p>
                      </div>
                    </div>
                    <div className="card border-0 shadow mb-2">
                      <div className={` ${styles["card-body"]}`}>
                        <p className="text-muted mb-2">Balance Left</p>
                        <p className={`fw-bold m-0 ${styles.detail}`}>
                          {formatBalance}
                        </p>
                      </div>
                    </div>
                    <div className="card border-0 shadow mb-2">
                      <div className={`${styles["card-body"]}`}>
                        <p className="text-muted mb-2">{`Date & Time`}</p>
                        <p className={`fw-bold m-0 ${styles.detail}`}>{date}</p>
                      </div>
                    </div>
                    <div className="card border-0 shadow mb-5">
                      <div className={` ${styles["card-body"]}`}>
                        <p className="text-muted mb-2">Notes</p>
                        <p className={`fw-bold m-0 ${styles.detail}`}>
                          {detailHistory.notes}
                        </p>
                      </div>
                    </div>
                    <h5 className="fw-bold mb-3">
                      {detailHistory.type === "accept"
                        ? "Transfer From"
                        : "Transfer To"}
                    </h5>
                    <div className="card border-0 shadow mb-4">
                      <div className={`d-flex ${styles["card-body"]}`}>
                        <div className="align-self-center d-flex">
                          <div className={`${styles["wrapper-img"]} me-5`}>
                            <Image
                              src={avatar}
                              alt="user"
                              layout="responsive"
                              className={`${styles["img-user"]}`}
                            />
                          </div>
                          <div className="align-self-center">
                            <h6 className="fw-bold">
                              {detailHistory.firstName} {detailHistory.lastName}
                            </h6>
                            <p className="text-muted m-0">
                              {detailHistory.noTelp
                                ? detailHistory.noTelp
                                : "-"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="card border-0 shadow mb-2">
                      <div className={`${styles["card-body"]}`}>
                        <p className="text-muted mb-2">Amount</p>
                        <p className={`fw-bold m-0 ${styles.detail}`}>
                          {formatAmount}
                        </p>
                      </div>
                    </div>
                    <div className="card border-0 shadow mb-2">
                      <div className={` ${styles["card-body"]}`}>
                        <p className="text-muted mb-2">Balance Left</p>
                        <p className={`fw-bold m-0 ${styles.detail}`}>
                          {formatBalance}
                        </p>
                      </div>
                    </div>
                    <div className="card border-0 shadow mb-2">
                      <div className={`${styles["card-body"]}`}>
                        <p className="text-muted mb-2">{`Date & Time`}</p>
                        <p className={`fw-bold m-0 ${styles.detail}`}>{date}</p>
                      </div>
                    </div>
                    <div className="card border-0 shadow mb-5">
                      <div className={` ${styles["card-body"]}`}>
                        <p className="text-muted mb-2">Type</p>
                        <p className={`fw-bold m-0 ${styles.detail}`}>
                          {detailHistory.type}
                        </p>
                      </div>
                    </div>
                  </>
                )}
                {detailHistory.type !== "topup" ? (
                  <div className="pt-3 d-flex justify-content-end">
                    <button
                      type="button"
                      onClick={onDownload}
                      className={`btn btn-lg me-3 ${styles["btn-download"]}`}
                    >
                      <span className="bi bi-download"></span>
                      <small className="col-12 ps-1 fw-bold">
                        Download PDF
                      </small>
                    </button>
                    <Link href={"/dashboard"} passHref>
                      <button
                        type="button"
                        className={`btn btn-lg ${styles["btn-back"]}`}
                      >
                        <small className="col-12">Back to Home</small>
                      </button>
                    </Link>
                  </div>
                ) : (
                  <div className="pt-3 d-flex justify-content-end">
                    <Link href={"/dashboard"} passHref>
                      <button
                        type="button"
                        className={`btn btn-lg ${styles["btn-back"]}`}
                      >
                        <small className="col-12">Back to Home</small>
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default HistoryDetail;
