import styles from "src/commons/styles/Transfer.module.css";
import avatar from "public/avatar.jpg";
import Image from "next/image";
import Layout from "src/commons/components/Layout";
import Header from "src/commons/components/Header";
import Sidebar from "src/commons/components/Sidebar";
import Footer from "src/commons/components/Footer";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { profile } from "src/modules/utils/user";
import { detailTransfer } from "src/redux/actions/transfer";

function Amount() {
  const router = useRouter();
  const dispatch = useDispatch();
  const id = router.query.id;
  const [userData, setUserData] = useState({});
  const token = useSelector((state) => state.auth.authUser.token);
  const dataUser = useSelector((state) => state.user.userData);
  const formatBalance = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  })
    .format(dataUser.balance)
    .replace(/(\.|,)00$/g, "");
  // console.log('balance', dataUser.balance)

  const onContinue = (e) => {
    e.preventDefault();
    const dateTime =
      new Date().toLocaleDateString() +
      " - " +
      new Date().toLocaleTimeString("id-ID", {
        hour: "numeric",
        minute: "numeric",
      });
    const receiverId = router.query.id;
    const amount = e.target.amount.value;
    const notes = e.target.notes.value;
    const data = {
      dateTime,
      receiverId,
      amount,
      notes,
    };
    console.log("transfer", data);
    dispatch(detailTransfer(data));
    router.push("/transfer/confirmation");
  };

  useEffect(() => {
    profile(token, id)
      .then((res) => {
        setUserData({ ...res.data.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token, id]);

  // console.log("user", userData);
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
            <div
              className={`card border-0 shadow min py-3 px-3 ${styles.card}`}
            >
              <div className="card-body">
                <form onSubmit={onContinue}>
                  <h4 className="fw-bold mb-5">Transfer Money</h4>
                  {userData !== null && (
                    <div className="card border-0 shadow mb-4">
                      <div className="card-body d-flex">
                        <div className="align-self-center d-flex">
                          <div className={`${styles["img-wrapper"]} me-5`}>
                            <Image
                              // src={avatar}
                              src={
                                userData.image !== null
                                  ? `${process.env.NEXT_PUBLIC_HOST}/uploads/${userData.image}`
                                  : avatar
                              }
                              placeholder="blur"
                              blurDataURL={avatar}
                              onError={() => {
                                avatar;
                              }}
                              alt="user"
                              width={30}
                              height={30}
                              layout="responsive"
                              className={`${styles["img-user"]}`}
                            />
                          </div>
                          <div className="align-self-center">
                            <h5 className="fw-bold">{`${userData.firstName} ${userData.lastName}`}</h5>
                            <p className="text-muted m-0">
                              {userData.noTelp !== null &&
                              userData.noTelp !== ""
                                ? userData.noTelp
                                : "-"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="transfer">
                    <p className="text-muted d-none d-md-block">
                      Type the amount you want to transfer and then
                      <br />
                      press continue to the next steps.
                    </p>
                    <div className="form-input d-flex justify-content-center mt-4">
                      <input
                        type="number"
                        name="amount"
                        placeholder="0.00"
                        max={userData.balance}
                        className={`form-control text-center fw-bold border-0 mb-2 ${styles["form-control"]}`}
                      />
                    </div>
                    <p className="fw-bold text-center mb-5">
                      {userData.balance > 0 ? formatBalance : `Rp` + 0}{" "}
                      Available
                    </p>
                    <div className="row w-100 d-flex justify-content-center">
                      <div className="col-lg-6">
                        <div className={`${styles.form}`}>
                          <div className={`${styles.icon}`}>
                            <span className="bi bi-pencil"></span>
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Add some notes"
                            name="notes"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pt-3 d-flex justify-content-end">
                    <button
                      type="submit"
                      className={`btn btn-lg ${styles["btn-amount"]}`}
                    >
                      <small className="p-3">Continue</small>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Amount;
