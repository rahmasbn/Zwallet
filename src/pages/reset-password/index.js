import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import styles from "src/commons/styles/Starter.module.css";
import StarterLeft from "src/commons/components/StarterLeft";
import Layout from "src/commons/components/Layout";


function ResetPassword() {
  const [visible, setVisible] = useState({
    type1: "password",
    type2: "password"
  });
  const [icons, setIcons] = useState({
    icon1: faEyeSlash,
    icon2: faEyeSlash,
  });

  const handleToggle1 = () => {
    if (visible.type1 === "password") {
      setIcons({
        ...icons,
        icon1: faEye
      });
      setVisible({
        ...visible,
        type1: "text"
      });
      
    } else {
      setIcons({
        ...icons,
        icon1: faEyeSlash
      });
      setVisible({
        ...visible,
        type1: "password"
      });
    } 
  };

  const handleToggle2 = () => {
    if (visible.type2 === "password") {
      setIcons({
        ...icons,
        icon2: faEye
      });
      setVisible({
        ...visible,
        type2: "text"
      });
      
    } else {
      setIcons({
        ...icons,
        icon2: faEyeSlash
      });
      setVisible({
        ...visible,
        type2: "password"
      });
    } 
  };

  return (
    <>
      <Layout title={"Reset Password | Zwallet"} />
      
      <div className="container-fluid px-0">
        <div className="row mx-0 my-0">
          <StarterLeft />
          <section className={`col-md-6 col-lg-5 ${styles["right-side"]}`}>
            <div className="row h-100">
              <div className={`col-lg-10 ${styles.wrapper}`}>
                <p className={`mb-2 ${styles.desc}`}>
                  {`Did You Forgot Your Password? Don't Worry, You Can Reset Your Password In a Minutes`}
                </p>
                <p className={`mt-4 ${styles.text}`}>
                  Now you can create a new password for your Zwallet account.
                  Type your password twice so we can confirm your new password.
                </p>
                <form className={`mt-5 ${styles.form}`}>
                  <div className="form-group">
                    <div className={`${styles["input-icon2"]}`}>
                      <span className={`${styles["icon-lock"]}`}>
                        <FontAwesomeIcon icon={faLock} />
                      </span>
                    </div>
                    <div className={`${styles["form-input"]}`}>
                      <input
                        type={visible.type1}
                        name="password"
                        id="password"
                        placeholder="Create new password"
                      />
                      <span onClick={handleToggle1}>
                        <FontAwesomeIcon icon={icons.icon1} />
                      </span>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className={`${styles["input-icon2"]}`}>
                      <span className={`${styles["icon-lock"]}`}>
                        <FontAwesomeIcon icon={faLock} />
                      </span>
                    </div>
                    <div className={`${styles["form-input"]}`}>
                      <input
                        type={visible.type2}
                        name="password"
                        id="password"
                        placeholder="Confirm your new password"
                        className="mb-0"
                      />
                      <span onClick={handleToggle2}>
                        <FontAwesomeIcon icon={icons.icon2} />
                      </span>
                    </div>
                  </div>
                  <div className="col-12">
                    <button className={`btn mt-5 mb-4 ${styles.button}`}>
                      Reset Password
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

export default ResetPassword;
