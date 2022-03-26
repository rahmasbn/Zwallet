import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

import styles from "src/commons/styles/Starter.module.css";
import StarterLeft from "src/commons/components/StarterLeft";
import Layout from "src/commons/components/Layout";
import { useState } from "react";
import { forgotPassword } from "src/modules/utils/auth";
import { toast } from "react-toastify";

function ForgotPass() {
  // const [input, setInput] = useState({
  //   email: "",
  // });
  // const [error, setError] = useState("");
  // const [val, setVal] = useState();

  // const validate = () => {
  //   let errors = {};
  //   const validEmail = new RegExp(
  //     /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
  //   );
  //   if (!input.email) {
  //     errors.email = "Email required";
  //   } else if (!validEmail.test(input.email)) {
  //     errors.email = "Email address is invalid";
  //   }

  //   setError(errors);
  // };

  // const handleChange = (e) => {
  //   setInput({
  //     ...input,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (validate()) {
      const body = {
        email: e.target.email.value,
        linkDirect: "https://zwallet-xi.vercel.app/reset-password",
      };
      console.log(body);
      forgotPassword(body)
        .then((res) => {
          // console.log(res.data);
          toast.success(res.data.msg, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: false,
          });
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data.msg, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          });
        });
      // setInput({
      //   email: ""
      // })
    // }
  };

  return (
    <>
      <Layout title={"Forgot Password | Zwallet"} />

      <div className="container-fluid px-0">
        <div className="row mx-0 my-0">
          <StarterLeft />
          <section className={`col-md-6 col-lg-5 ${styles["right-side"]}`}>
            <div className="row h-100">
              <div className={`col-lg-10 mb-2 ${styles.wrapper}`}>
                <p className={`${styles.desc}`}>
                  {`Did You Forgot Your Password? Don't Worry, You Can Reset Your Password In a Minutes`}
                </p>
                <p className={`mt-4 ${styles.text}`}>
                  To reset your password, you must type your e-mail and we will
                  send a link to your email and you will be directed to the
                  reset password screens.
                </p>
                <form className={`mt-5 ${styles.form}`} onSubmit={handleSubmit}>
                  <div className="form-group">
                    <div className={`${styles["input-icon1"]}`}>
                      <span
                        // className={`${
                        //   error.email
                        //     ? `${styles["icon-error"]}`
                        //     : `${styles["icon-envelope"]}`
                        // }`}
                        className={`${styles["icon-envelope"]}`}
                      >
                        <FontAwesomeIcon icon={faEnvelope} />
                      </span>
                    </div>
                    <div className="form-input">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        // value={input.email}
                        placeholder="Enter your e-mail"
                        // onChange={handleChange}
                        // className={error.email && `${styles.error}`}
                      />
                      {/* {error.email && (
                        <p className={`text-danger ${styles["mt-n1"]}`}>
                          {error.email}
                        </p>
                      )} */}
                    </div>
                  </div>
                  <div className="col-12">
                    <button
                      // disabled={!input.email}
                      type="submit"
                      className={`btn mt-5 mb-4 ${styles.button}`}
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

export default ForgotPass;
