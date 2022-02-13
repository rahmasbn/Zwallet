import styles from "src/commons/styles/Starter.module.css";
import StarterLeft from "src/commons/components/StarterLeft";
import Layout from "src/commons/components/Layout";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useSelector } from "react-redux";
// import OtpInput from "react-otp-input";
import PinInput from "react-pin-input";
import { changePin } from "src/modules/utils/user";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

function CreatePIN() {
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

  const [pinCode, setPinCode] = useState(0);
  const token = useSelector((state) => state.auth.authUser.token);
  const id = useSelector((state) => state.auth.authUser.id);
  const router = useRouter();

  const handleChange = (e) => {
    setPinCode(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = {
      pin: pinCode,
    };
    // console.log("body", body);

    changePin(body, token, id)
      .then((res) => {
        console.log(res.data);
        router.push("/dashboard");
        toast.success(res.data.msg, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
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
      <Layout title={"Create PIN | Zwallet"} />

      <div className="container-fluid px-0">
        <div className="row mx-0 my-0">
          <StarterLeft />
          <section className={`col-md-6 col-lg-5 ${styles["right-side"]}`}>
            <div className="row h-100">
              <div className={`col-lg-10 mb-2 ${styles.wrapper}`}>
                <p className={`${styles.desc}`}>
                  Secure Your Account, Your Wallet, and Your Data With 6 Digits
                  PIN That You Created Yourself.
                </p>
                <p className={`mt-4 ${styles.text}`}>
                  {`Create 6 digits pin to secure all your money and your data in Zwallet app. 
                  Keep it secret and don't tell anyone about your Zwallet account password and the PIN.`}
                </p>
                <form className={`mt-5`} onSubmit={handleSubmit}>
                  {/* <div className="form-group"> */}
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
                  <div className="col-12">
                    <button
                      disabled={!pinCode}
                      className={`btn mt-5 mb-4 ${styles.button}`}
                      type="submit"
                    >
                      Confirm
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default CreatePIN;
