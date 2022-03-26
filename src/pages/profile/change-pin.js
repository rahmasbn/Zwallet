import { useState } from "react";
import PinInput from "react-pin-input";
import { useSelector } from "react-redux";

import Footer from "src/commons/components/Footer";
import Header from "src/commons/components/Header";
import Layout from "src/commons/components/Layout";
import ChangePIN from "src/commons/components/ChangePIN";
import Sidebar from "src/commons/components/Sidebar";
import styles from "src/commons/styles/Profile.module.css";
import { checkPin } from "src/modules/utils/user";

function UpdatePIN() {
  const props = {
    className: PinInput,
    inputStyle: {
      fontFamily: "Nunito Sans",
      marginRight: "5px",
      marginBottom: "5px",
      MozAppearance: "textfield",
      width: "40px",
      borderRadius: "6px",
      fontSize: "20px",
      height: "45px",
      backgroundColor: "white",
      color: "black",
      border: "1px solid #6d7499",
      textAlign: "center",
    },
  };
  const [isVerify, setIsVerify] = useState(false);
  const [pin, setPin] = useState(0);
  const user = useSelector((state) => state.auth.authUser);

  const changeHandler = (e) => {
    setPin(e);
  };

  const handlePIN = (e) => {
    // console.log('pin', pinCode)
    e.preventDefault();

    checkPin(pin, user.token)
      .then((res) => {
        console.log(res);
        setIsVerify(true);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.msg, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      });
  };
  return (
    <>
      <Layout title={`Change PIN | Zwallet`} />
      <Header />
      <div className="container">
        <div className="row py-5">
          <div className="col-sm-12 col-md-4 col-lg-3 mb-4">
            <Sidebar />
          </div>
          <div className="col">
            <div
              className={`card shadow border-0 ps-3 vh-100 ${styles.card} ${styles["card-manage"]}`}
            >
              <div className="card-body">
                <h4 className="fw-bold mb-3 pt-3">Change PIN</h4>
                {!isVerify ? (
                  <>
                    <p className="text-muted py-4">
                      Enter your current 6 digits Zwallet PIN below to
                      <br />
                      continue to the next steps.
                    </p>
                    <div className=" w-100 my-5">
                      <div className="row d-flex justify-content-center">
                        <div className="col-md-6">
                          <form onSubmit={handlePIN}>
                            <div className="form-input text-center mb-5 col-12">
                              <PinInput
                                length={6}
                                secret
                                type="numeric"
                                inputMode="number"
                                regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
                                autoSelect={true}
                                onChange={changeHandler}
                                {...props}
                              />
                            </div>
                            <div className="col-12">
                              <button
                                disabled={!pin}
                                className={`btn mt-2 mb-4 ${styles.button}`}
                                type="submit"
                              >
                                Continue
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <ChangePIN />
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

export default UpdatePIN;
