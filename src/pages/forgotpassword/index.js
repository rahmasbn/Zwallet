import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

import styles from "src/commons/styles/Starter.module.css";
import StarterLeft from "src/commons/components/StarterLeft";
import Layout from "src/commons/components/Layout";


function ForgotPass() {
  return (
    <>
      <Layout title={'Forgot Password | Zwallet'} />

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
                <form className={`mt-5 ${styles.form}`}>
                  <div className="form-group">
                    <div className={`${styles["input-icon1"]}`}>
                      <span className={`${styles["icon-envelope"]}`}>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </span>
                    </div>
                    <div className="form-input">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter your e-mail"
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <button className={`btn mt-5 mb-4 ${styles.button}`}>
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
