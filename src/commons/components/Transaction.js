// import Image from "next/image";
import Link from "next/link";
import styles from "src/commons/styles/Dashboard.module.css";
// import samuel from "public/samuel.png";
// import christine from "public/christine.png";
// import netflix from "public/netflix.svg";
// import topup from "public/topup.svg";
import { useState, useEffect } from "react";
import TransactionCard from "src/commons/components/TransactionCard";
import { useSelector } from "react-redux";
import { transactionHistory } from "src/modules/utils/transaction";

function Transaction() {
  const [history, setHistory] = useState(null);
  const token = useSelector((state) => state.auth.authUser.token);

  const showTransaction = (data) => {
    const card = [];
    const limit = data.length < 5 ? data.length : 4;
    for (let i = 0; i < data.length; i++) {
      const element = <TransactionCard data={data[i]} key={i} />;
      card.push(element);
    }
    return card;
  };

  useEffect(() => {
    if (history === null) {
      const filter = "?page=1&limit=4&filter=YEAR";
      transactionHistory(filter, token)
        .then((res) => {
          setHistory({
            dataTransaction: res.data.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [history, token]);
  console.log(history);

  return (
    <>
      <div className={`card shadow bg-0 border-0 ${styles.card}`}>
        <div className="card-body d-flex flex-column">
          <div className="d-flex py-3 ps-2 mb-4 justify-content-between pb-0 mb-3">
            <h5 className={`fw-bold ${styles.title}`}>Transaction History</h5>
            <Link href={"/dashboard/history"}>
              <a className="text-primary text-decoration-none">See All</a>
            </Link>
          </div>
          {/* item */}
          <div className="py-2">
            {/* <div className="d-flex ps-4 justify-content-between pb-0 mb-2">
              <div className="col-md-2">
                <div className={`${styles["img-wrapper"]}`}>
                  <Image
                    src={samuel}
                    alt="user"
                    layout="responsive"
                    width={30}
                    height={30}
                    className={`${styles["img-user"]}`}
                  />
                </div>
              </div>
              <div className="col-md-6 ms-2">
                <div className="align-self-center">
                  <p className={`fw-bold ${styles.font}`}>Samuel Suhi</p>
                  <p className="text-muted">Accept</p>
                </div>
              </div>
              <div className="col-md-4">
                <p className={`mt-3 text-success fw-bold ${styles.font}`}>
                  +Rp50.000
                </p>
              </div>
            </div>
            <div className="d-flex ps-4 justify-content-between pb-0 mb-2">
              <div className="col-md-2">
                <div className={`${styles["img-wrapper"]}`}>
                  <Image
                    src={netflix}
                    alt="user"
                    layout="responsive"
                    width={30}
                    height={30}
                    className={`${styles["img-user"]}`}
                  />
                </div>
              </div>
              <div className="col-md-6 ms-2">
                <div className="align-self-center">
                  <p className={`fw-bold ${styles.font}`}>Netflix</p>
                  <p className="text-muted">Transfer</p>
                </div>
              </div>
              <div className="col-md-4">
                <p className={`mt-3 text-danger fw-bold ${styles.font}`}>
                  -Rp149.000
                </p>
              </div>
            </div>
            <div className="d-flex ps-4 justify-content-between pb-0 mb-2">
              <div className="col-md-2">
                <div className={`${styles["img-wrapper"]}`}>
                  <Image
                    src={christine}
                    alt="user"
                    layout="responsive"
                    width={30}
                    height={30}
                    className={`${styles["img-user"]}`}
                  />
                </div>
              </div>
              <div className="col-md-6 ms-2">
                <div className="align-self-center">
                  <p className={`fw-bold ${styles.font}`}>Christine Mar..</p>
                  <p className="text-muted">Accept</p>
                </div>
              </div>
              <div className="col-md-4">
                <p className={`mt-3 text-success fw-bold ${styles.font}`}>
                  +Rp150.000
                </p>
              </div>
            </div>
            <div className="d-flex ps-4 justify-content-between pb-0 mb-2">
              <div className="col-md-2">
                <div className={`${styles["img-wrapper"]}`}>
                  <Image
                    src={topup}
                    alt="user"
                    layout="responsive"
                    width={30}
                    height={30}
                    className={`${styles["img-user"]}`}
                  />
                </div>
              </div>
              <div className="col-md-6 ms-2">
                <div className="align-self-center">
                  <p className={`fw-bold ${styles.font}`}>Robert Chandler</p>
                  <p className="text-muted">Topup</p>
                </div>
              </div>
              <div className="col-md-4">
                <p className={`mt-3 text-danger fw-bold ${styles.font}`}>
                  +Rp249.000
                </p>
              </div>
            </div> */}
            {history !== null && history.dataTransaction.length > 0 ? (
              showTransaction(history.dataTransaction)
            ) : (
              <>
                <div className={`text-center py-5 my-5 d-flex ${styles.empty}`}>
                  <div className="align-self-center w-100">
                    <h4 className="fw-bold my-3">It&apos;s Clear!</h4>
                    <p className="text-muted">
                      You&apos;ve never done a transaction so far
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Transaction;
