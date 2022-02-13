import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import styles from "src/commons/styles/Starter.module.css";
import StarterLeft from "src/commons/components/StarterLeft";
import Layout from "src/commons/components/Layout";
import { useRouter } from "next/router";
import { resetPassword } from "src/modules/utils/auth";
import { toast } from "react-toastify";

function ResetPassword() {
  const router = useRouter();
  // console.log(router)
  const [input, setInput] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const [visible, setVisible] = useState({
    type1: "password",
    type2: "password",
  });
  const [icons, setIcons] = useState({
    icon1: faEyeSlash,
    icon2: faEyeSlash,
  });

  const handleToggle1 = () => {
    if (visible.type1 === "password") {
      setIcons({
        ...icons,
        icon1: faEye,
      });
      setVisible({
        ...visible,
        type1: "text",
      });
    } else {
      setIcons({
        ...icons,
        icon1: faEyeSlash,
      });
      setVisible({
        ...visible,
        type1: "password",
      });
    }
  };

  const handleToggle2 = () => {
    if (visible.type2 === "password") {
      setIcons({
        ...icons,
        icon2: faEye,
      });
      setVisible({
        ...visible,
        type2: "text",
      });
    } else {
      setIcons({
        ...icons,
        icon2: faEyeSlash,
      });
      setVisible({
        ...visible,
        type2: "password",
      });
    }
  };

  const validate = () => {
    let errors = {};
    let isValid = true;

    if (typeof input.newPassword !== "undefined") {
      const validPass = new RegExp(
        "^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).{6,}$"
      );
      if (!validPass.test(input.newPassword)) {
        isValid = false;
        errors["newPassword"] =
          "Password must be at least 6 characters, including lowercase, uppercase letter and numbers";
      }
    }

    if (
      typeof input.newPassword !== "undefined" &&
      typeof input.confirmPassword !== "undefined"
    ) {
      if (input.newPassword !== input.confirmPassword) {
        isValid = false;
        errors["confirmPassword"] = "Passwords don't match";
      }
    }
    setErrors(errors);
    return isValid;
  };

  const handlePassword = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { keys } = router.query;
    // console.log("key", keys);
    if (validate()) {
      const body = {
        keysChangePassword: keys,
        newPassword:  e.target.newPassword.value,
        confirmPassword:  e.target.confirmPassword.value,
      };
      // console.log(data);
      resetPassword(body)
        .then((res) => {
          console.log(res.data)
          toast.success(res.data.msg, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          });
          router.push("/login")
          // console.log("update success")
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data.msg, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          });
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
                <form className={`mt-5 ${styles.form}`} onSubmit={handleSubmit}>
                  <div className="form-group">
                    <div className={`${styles["input-icon2"]}`}>
                      <span
                        className={`${
                          errors.newPassword
                            ? `${styles["icon-lock-error"]}`
                            : `${styles["icon-lock"]}`
                        }`}
                      >
                        <FontAwesomeIcon icon={faLock} />
                      </span>
                    </div>
                    <div className={`${styles["form-input"]}`}>
                      <input
                        type={visible.type1}
                        name="newPassword"
                        value={input.newPassword}
                        onChange={handlePassword}
                        placeholder="Create new password"
                        className="mb-3"
                      />
                      <span onClick={handleToggle1}>
                        <FontAwesomeIcon icon={icons.icon1} />
                      </span>
                    </div>
                    {errors.newPassword && (
                      <p className={`text-danger`}>{errors.newPassword}</p>
                    )}
                  </div>
                  <div className="form-group">
                    <div className={`${styles["input-icon2"]}`}>
                      <span
                        className={`${
                          errors.newPassword
                            ? `${styles["icon-lock-error"]}`
                            : `${styles["icon-lock"]}`
                        }`}
                      >
                        <FontAwesomeIcon icon={faLock} />
                      </span>
                    </div>
                    <div className={`${styles["form-input"]}`}>
                      <input
                        type={visible.type2}
                        name="confirmPassword"
                        value={input.confirmPassword}
                        onChange={handlePassword}
                        placeholder="Confirm your new password"
                        className="mb-0"
                      />
                      <span onClick={handleToggle2}>
                        <FontAwesomeIcon icon={icons.icon2} />
                      </span>
                    </div>
                    {errors.confirmPassword && (
                      <p className={`text-danger mt-2`}>
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                  <div className="col-12">
                    <button
                      className={`btn mt-5 mb-4 ${styles.button}`}
                      disabled={!input.newPassword}
                      type="submit"
                    >
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
