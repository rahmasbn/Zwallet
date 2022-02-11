import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Image from "next/image";

import styles from "src/commons/styles/History.module.css";
import { transactionHistory } from "src/modules/utils/transaction";
import avatar from "public/avatar.jpg";

function History() {
  const router = useRouter();
  const token = useSelector((state) => state.auth.authUser.token);
  const [history, setHistory] = useState(null);
  // const [filter, setFilter] = useState("")
  // const [page, setPage] = useState(null);

  const showTransaction = (data) => {
    const card = [];
    const limit = data.length < 5 ? data.length : 5;
    for (let i = 0; i < data.length; i++) {
      if (data[i].status !== "pending") {
        const element = <HistoryCard data={data[i]} key={i} />;
        card.push(element);
      }
    }
    return card;
  };

  useEffect(() => {
    let page = router.query.page || 1;
    let filter = router.query.filter || "WEEK";
    
    if (history === null) {
      transactionHistory(page, 5, filter, token)
        .then((res) => {
          setHistory({
            dataTransaction: res.data.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [history, token, router.query.page, router.query.filter]);
  // console.log('history', history.dataTransaction);

  return (
    <div className={`card shadow border-0 ps-3 ${styles.card}`}>
      <div className="card-body">
        <div className="d-flex flex-wrap">
          <h5 className="fw-bold mb-3 pt-3 col-lg-9">Transaction History</h5>
          <div className="col-lg-3 mt-4">
            <select
              name="filter"
              id="filter"
              className={`${styles["select-filter"]}`}
              onChange={(e) => 
              router.push(`?filter=${e.target.value}`)
            }
            >
              <option value="" disable="true" hidden className="filter">
                -- Select Filter --
              </option>
              <option value="WEEK" className="week">
                Week
              </option>
              <option value="MONTH" className="month">
                Month
              </option>
              <option value="YEAR" className="year">
                Years
              </option>
            </select>
          </div>
        </div>
        <div className="pt-5">
          {history !== null && history.dataTransaction.length > 0 ? (
            showTransaction(history.dataTransaction)
          ) : (
            <>
              <div className={`text-center d-flex ${styles.empty}`}>
                <div className="mt-5 w-100">
                  <h4 className="fw-bold">It&apos;s Clear!</h4>
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
  );
}

function HistoryCard(props) {
  const { fullName, amount, image, type } = props.data;
  const formatAmount = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  })
    .format(amount)
    .replace(/(\.|,)00$/g, "");

  return (
    <>
      <div className={`d-flex ps-4 pb-0 mb-2`}>
        {/* <div className="col-md-2"> */}
        <div className={`${styles["img-wrapper"]}`}>
          <Image
            src={image !== null ? image : avatar}
            alt="user"
            layout="responsive"
            width={30}
            height={30}
            className={`${styles["img-user"]}`}
          />
        </div>
        {/* </div> */}
        {/* <div className="col-md-6 ms-2"> */}
        <div className="ps-5">
          <p className={`fw-bold ${styles.font}`}>{fullName}</p>
          <p className="text-muted">{type}</p>
        </div>
        {/* </div> */}
        {/* <div className="col-md-4"> */}
        <p
          className={`mt-3 fw-bold ms-auto pe-4 ${styles.font} ${
            type === "accept" || type === "topup"
              ? "text-success"
              : "text-danger"
          }`}
        >
          {`${
            type === "accept" || type == "topup"
              ? `+${formatAmount}`
              : `-${formatAmount}`
          }`}
        </p>
        {/* </div> */}
      </div>
    </>
  );
}

export default History;
