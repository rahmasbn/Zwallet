import styles from "src/commons/styles/Starter.module.css";
import StarterLeft from "src/commons/components/StarterLeft";
import Layout from "src/commons/components/Layout";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useSelector } from "react-redux";
import { changePin } from "src/modules/utils/user";
import { toast } from "react-toastify";

function CreatePIN() {
  const ReactCodeInput = dynamic(import("react-code-input"));
  const props = {
    className: ReactCodeInput,
    inputStyle: {
      fontFamily: "Nunito Sans",
      marginRight: "18px",
      marginBottom: "5px",
      MozAppearance: "textfield",
      width: "40px",
      borderRadius: "6px",
      fontSize: "20px",
      height: "45px",
      backgroundColor: "white",
      color: "#6379f4",
      border: "2px solid #c6c9dd",
      textAlign: "center",
    },
  };

  const [pinCode, setPinCode] = useState("")
  const [isSuccess, setIsSuccess] = useState(false);
  const token = useSelector((state) => state.auth.authUser.token);
  const id = useSelector((state) => state.auth.authUser.id);

  // const handleChange = (e, pinCode) => {
  //   // const pinCode = e.target.value;
  //   setPinCode(e.target.pinCode)
  // //   // pi

  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("pincode", pinCode);
    const body = {
      pin: pinCode
    };
    console.log("body", body);

    // changePin(body, token, id)
    // .then(res=> {
    //   console.log(res.data)
    //   setIsSuccess(true);
    // })
    // .catch(err=> {
    //   console.log(err);
    //   toast.error(err.response.data.msg, {
    //     position: toast.POSITION.TOP_RIGHT,
    //     autoClose: 3000,
    //   });
    // })
  };
  return (
    <>
      <Layout title={"Create PIN | Zwallet"} />

      <div className="container-fluid px-0">
        <div className="row mx-0 my-0">
          <StarterLeft />
          <section className={`col-md-6 col-lg-5 ${styles["right-side"]}`}>
            <div className="row h-100">
              {!isSuccess ? (
                <>
                  <div className={`col-lg-10 mb-2 ${styles.wrapper}`}>
                    <p className={`${styles.desc}`}>
                      Secure Your Account, Your Wallet, and Your Data With 6
                      Digits PIN That You Created Yourself.
                    </p>
                    <p className={`mt-4 ${styles.text}`}>
                      {`Create 6 digits pin to secure all your money and your data in Zwallet app. 
                  Keep it secret and don't tell anyone about your Zwallet account password and the PIN.`}
                    </p>
                    <form className={`mt-5`} onSubmit={handleSubmit}>
                      {/* <div className="form-group"> */}
                      <div className={`form-input mb-2`}>
                        <ReactCodeInput
                          type="password"
                          fields={6}
                          onChange={(e) => e.target.value}
                          name="pin"
                          value={pinCode}
                          id="pinCode"
                          {...props}
                        />
                      </div>
                      <div className="col-12">
                        <button
                          className={`btn mt-5 mb-4 ${styles.button}`}
                          type="submit"
                        >
                          Confirm
                        </button>
                      </div>
                    </form>
                  </div>
                </>
              ) : (
                <p>Lol</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default CreatePIN;
