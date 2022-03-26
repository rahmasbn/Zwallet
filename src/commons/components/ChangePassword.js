import { useState } from "react";
import styles from "src/commons/styles/Profile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { editPassword } from "src/modules/utils/user";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

function ChangePassword() {
  const token = useSelector((state) => state.auth.authUser.token);
  const id = useSelector((state) => state.auth.authUser.id);
  const router = useRouter();

  const [visible, setVisible] = useState({
    type1: "password",
    type2: "password",
    type3: "password",
  });
  const [icons, setIcons] = useState({
    icon1: faEyeSlash,
    icon2: faEyeSlash,
    icon3: faEyeSlash,
  });
  const [input, setInput] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});

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

  const handleToggle3 = () => {
    if (visible.type3 === "password") {
      setIcons({
        ...icons,
        icon3: faEye,
      });
      setVisible({
        ...visible,
        type3: "text",
      });
    } else {
      setIcons({
        ...icons,
        icon3: faEyeSlash,
      });
      setVisible({
        ...visible,
        type3: "password",
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

  const changeHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {

      const body = {
        oldPassword: e.target.oldPassword.value,
        newPassword:  e.target.newPassword.value,
        confirmPassword:  e.target.confirmPassword.value,
      };

      editPassword(body, token, id)
        .then((res) => {
          // console.log(res.data)
          toast.success(res.data.msg, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          });
          router.push("/profile")
          // console.log("update success")
        })
        .catch((err) => {
          let errors = {};
          errors["oldPassword"] = "Password is invalid";
          setErrors(errors);
          console.log(err);
        });
    }
  };
// console.log('input', input)
  return (
    <div>
      <div
        className={`card shadow border-0 ps-3 vh-100 ${styles.card} ${styles["card-manage"]}`}
      >
        <div className="card-body">
          <h4 className="fw-bold mb-3 pt-3">Change Password</h4>
          <p className="text-muted py-4">
            You must enter your current password and then
            <br />
            type your new password twice.
          </p>

          <div className=" w-100 my-5">
            <div className="row d-flex justify-content-center">
              <div className="col-md-6">
                <form className={`${styles.form}`} onSubmit={handleSubmit}>
                  <div className="form-group">
                    <div className={`${styles["input-icon2"]}`}>
                      <span className={`${styles["icon-lock"]}`}>
                        <FontAwesomeIcon icon={faLock} />
                      </span>
                    </div>
                    <div className={`${styles["form-input"]}`}>
                      <input
                        type={visible.type1}
                        name="oldPassword"
                        id="password"
                        placeholder="Current password"
                        value={input.oldPassword}
                        onChange={changeHandler}
                        className="mb-2"
                      />
                      <span onClick={handleToggle1}>
                        <FontAwesomeIcon icon={icons.icon1} />
                      </span>
                    </div>
                    <p className="text-danger">{errors.oldPassword}</p>
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
                        name="newPassword"
                        id="password"
                        placeholder="New password"
                        value={input.newPassword}
                        onChange={changeHandler}
                        className="mb-4"
                      />
                      <span onClick={handleToggle2}>
                        <FontAwesomeIcon icon={icons.icon2} />
                      </span>
                    </div>
                    <div className="text-danger">{errors.newPassword}</div>
                  </div>
                  <div className="form-group">
                    <div className={`${styles["input-icon2"]}`}>
                      <span className={`${styles["icon-lock"]}`}>
                        <FontAwesomeIcon icon={faLock} />
                      </span>
                    </div>
                    <div className={`${styles["form-input"]}`}>
                      <input
                        type={visible.type3}
                        name="confirmPassword"
                        id="password"
                        placeholder="Repeat new password"
                        className="mb-0"
                        value={input.confirmPassword}
                        onChange={changeHandler}
                      />
                      <span onClick={handleToggle3}>
                        <FontAwesomeIcon icon={icons.icon3} />
                      </span>
                    </div>
                    <div className="text-danger">
                      {errors.confirmPassword}
                    </div>
                  </div>
                  <div className="col-12">
                    <button disabled={!input.oldPassword} className={`btn mt-5 mb-4 ${styles.button}`} type="submit">
                      Change Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
