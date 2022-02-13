import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import avatar from "public/avatar.jpg";
import styles from "src/commons/styles/Dashboard.module.css";
import { transactionHistory } from "src/modules/utils/transaction";

function Transaction() {
  const [history, setHistory] = useState(null);
  const token = useSelector((state) => state.auth.authUser.token);

  const showTransaction = (data) => {
    const card = [];
    const limit = data.length < 5 ? data.length : 4;
    for (let i = 0; i < limit; i++) {
      if (data[i].status === "success") {
        const element = <TransactionCard data={data[i]} key={i} />;
        card.push(element);
      }
    }
    return card;
  };

  useEffect(() => {
    if (history === null) {
      transactionHistory(1, 4, "YEAR", token)
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
  // console.log('transaction',history);

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

function TransactionCard(props) {
  const { fullName, amount, image, type, id } = props.data;
  const formatAmount = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  })
    .format(amount)
    .replace(/(\.|,)00$/g, "");

  return (
    <>
      <Link href={`/dashboard/history/${id}`} passHref>
        <summary className={`d-flex ps-4 justify-content-between pb-0 mb-2`}>
          <div className="col-md-2">
            <div className={`${styles["img-wrapper"]}`}>
              <Image
                src={
                  image !== null
                    ? `${process.env.NEXT_PUBLIC_HOST}/uploads/${image}`
                    : avatar
                }
                placeholder="blur"
                blurDataURL={avatar}
                onError={() => {
                  avatar;
                }}
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
              <p className={`fw-bold ${styles.font}`}>{fullName}</p>
              <p className="text-muted">{type}</p>
            </div>
          </div>
          <div className="text-right ms-auto">
            <p
              className={`mt-3 fw-bold ${styles.font} ${
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
          </div>
        </summary>
      </Link>
    </>
  );
}

export default Transaction;
