import Footer from "src/commons/components/Footer";
import Header from "src/commons/components/Header";
import Layout from "src/commons/components/Layout";
import Sidebar from "src/commons/components/Sidebar";
import styles from "src/commons/styles/Transfer.module.css";
import { checkPin, profile } from "src/modules/utils/user";
import avatar from "public/avatar.jpg";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { Modal } from "react-bootstrap";
import PinInput from "react-pin-input";
import { toast } from "react-toastify";
import { transfer } from "src/modules/utils/transaction";
import LoadingComponent from "src/commons/components/LoadingComponent";

function Confirmation() {
  const props = {
    className: PinInput,
    inputStyle: {
      marginRight: "5px",
      marginTop: "5px",
      MozAppearance: "textfield",
      width: "40px",
      borderRadius: "6px",
      height: "45px",
      backgroundColor: "white",
      color: "black",
      border: "1px solid #6d7499",
    },
  };
  const router = useRouter();
  const id = useSelector((state) => state.transfer.data.receiverId);
  const token = useSelector((state) => state.auth.authUser.token);
  const dataUser = useSelector((state) => state.user.userData);
  const detailTrf = useSelector((state) => state.transfer.data);

  const [userData, setUserData] = useState({});
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [pinCode, setPinCode] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const formatAmount = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  })
    .format(detailTrf.amount)
    .replace(/(\.|,)00$/g, "");

  const balanceLeft = dataUser.balance - detailTrf.amount;
  const formatBalance = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  })
    .format(balanceLeft)
    .replace(/(\.|,)00$/g, "");

  const handleChange = (e) => {
    setPinCode(e);
  };

  const handlePIN = () => {
    // console.log('pin', pinCode)
    checkPin(pinCode, token)
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          const body = {
            receiverId: id,
            amount: detailTrf.amount,
            notes: detailTrf.notes,
          };
          transfer(body, token)
            .then((res) => {
              console.log(res.data);
              toast.success(res.data.msg, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
              });
              router.push("/dashboard/history/" + res.data.data.id);
            })
            .catch((err) => {
              console.log(err);
              toast.error(err.response.data.msg, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
              });
            });
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.msg, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      });
  };

  useEffect(() => {
    setIsLoading(true);
    profile(token, id)
      .then((res) => {
        setUserData({ ...res.data.data });
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token, id]);

  return (
    <>
      <Layout title={`Transfer Confirmation | Zwallet`} />
      <Header />
      <div className="container">
        <div className="row py-5">
          <div className="col-sm-12 col-md-4 col-lg-3 mb-4">
            <Sidebar />
          </div>
          <div className="col">
            <div className={`card border-0 shadow py-2 px-3 ${styles.card}`}>
              <div className="card-body">
                {/* <form onSubmit={onContinue}> */}
                <h5 className="fw-bold mb-3">Transfer To</h5>
                {!isLoading ? (
                  <>
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
                            <h6 className="fw-bold">{`${userData.firstName} ${userData.lastName}`}</h6>
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
                    <h5 className="col-12 mb-3 fw-bold">Details</h5>
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
                        <h5 className="fw-bold m-0">{formatBalance}</h5>
                      </div>
                    </div>
                    <div className="card border-0 shadow mb-2">
                      <div className={`${styles["card-body"]}`}>
                        <p className="text-muted mb-2">{`Date & Time`}</p>
                        <h5 className="fw-bold m-0">{detailTrf.dateTime}</h5>
                      </div>
                    </div>
                    <div className="card border-0 shadow mb-3">
                      <div className={` ${styles["card-body"]}`}>
                        <p className="text-muted mb-2">Notes</p>
                        <h5 className="fw-bold m-0">
                          {detailTrf.notes ? detailTrf.notes : ""}
                        </h5>
                      </div>
                    </div>
                    <div className="pt-3 d-flex justify-content-end">
                      <button
                        type="button"
                        onClick={handleShow}
                        className={`btn btn-lg ${styles["btn-amount"]}`}
                      >
                        <small className="p-3">Continue</small>
                      </button>
                    </div>
                    {/* </form> */}
                  </>
                ) : (
                  <LoadingComponent />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <Modal show={show} className={`${styles["modal-topup"]}`}>
        <Modal.Body className="mx-3">
          <h5 className="fw-bold mt-2 mb-4">
            Enter PIN to Transfer
            <p
              className={`btn-close position-absolute ${styles["btn-close"]}`}
              onClick={handleClose}
            ></p>
          </h5>
          <p className={`${styles.desc} mb-4`}>
            Enter your 6 digits PIN for confirmation to continue transferring
            money.
          </p>
          <div className={`form-input mb-2 text-center`}>
            <PinInput
              length={6}
              secret
              type="numeric"
              inputMode="number"
              regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
              autoSelect={true}
              onChange={handleChange}
              {...props}
            />
          </div>
          <div
            className={`col-md-12 text-center mt-5 mb-2 d-flex justify-conten-end `}
          >
            <button
              className={`btn text-white ${styles.topup}`}
              onClick={handlePIN}
            >
              Submit
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Confirmation;
