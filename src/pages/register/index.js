import Link from "next/link";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
// import "react-toastify/dist/ReactToastify.css";

import { validateSignup } from "src/modules/helpers/validation";
import styles from "src/commons/styles/Starter.module.css";
import StarterLeft from "src/commons/components/StarterLeft";
import Layout from "src/commons/components/Layout";
import { register } from "src/modules/utils/auth";

function Register() {
  const router = useRouter();

  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(faEyeSlash);
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log('before', errors);
    setErrors(validateSignup(values));
    // console.log('after', errors);
    
    const validateBody = validateSignup(values);
    // console.log('validate', validateBody);
    // console.log('lenght', Object.keys(validateBody).length)

    const body = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };

    if (Object.keys(validateBody).length === 0) {
      register(body)
        .then((res) => {
          console.log(res.data);
          setIsSubmit(true);
          toast.success(`Registration successful!
           Please Check Your Email`, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: false,
          });
          router.push("/login");
        })
        .catch((err) => {
          // console.log(err.response.data.msg);
          toast.error(err.response.data.msg, {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
    }
    // console.log("errors", errors);
    // console.log("isSubmit1", isSubmit);
    // }
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmit) {

      console.log("isSubmit", isSubmit);
      console.log("useEff error", errors);
    }
  }, [errors, isSubmit]);

  const handleToggle = () => {
    if (type === "password") {
      setIcon(faEye);
      setType("text");
    } else {
      setIcon(faEyeSlash);
      setType("password");
    }
  };

  return (
    <>
      <Layout title={"Register | Zwallet"} />

      <div className="container-fluid px-0">
        <div className="row mx-0 my-0">
          <StarterLeft />
          <section className={`col-md-6 col-lg-5 ${styles["right-side"]}`}>
            <div className="row h-100">
              <div className={`col-lg-10 ${styles.wrapper}`}>
                <p className={`${styles.desc}`}>
                  Start Accessing Banking Needs With All Devices and All
                  Platforms With 30.000+ Users
                </p>
                <p className={`${styles.text}`}>
                  Transfering money is easier than ever, you can access Zwallet
                  wherever you are. Desktop, laptop, mobile phone? We cover all
                  of that for you!
                </p>
                <form className={`mt-5 ${styles.form}`} onSubmit={handleSubmit}>
                  <div className="form-group">
                    <div className={`${styles["input-icon1"]}`}>
                      <span className={`${errors.firstName ? `${styles["icon-error"]}` : `${styles["icon-envelope"]}`}`}>
                        <FontAwesomeIcon icon={faUser} />
                      </span>
                    </div>
                    <div className="form-input">
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        placeholder="Enter your firstname"
                        value={values.firstName}
                        onChange={handleChange}
                        className={`${errors.firstName && `${styles.error}`}`}
                      />
                      {errors.firstName && (
                        <p className={`text-danger ${styles["mt-n1"]}`}>
                          {errors.firstName}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="form-group">
                    <div className={`${styles["input-icon1"]}`}>
                      <span className={`${errors.lastName ? `${styles["icon-error"]}` : `${styles["icon-envelope"]}`}`}>
                        <FontAwesomeIcon icon={faUser} />
                      </span>
                    </div>
                    <div className="form-input">
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        placeholder="Enter your lastname"
                        value={values.lastName}
                        onChange={handleChange}
                        className={`${errors.lastName && `${styles.error}`}`}
                      />
                      {errors.lastName && (
                        <p className={`text-danger ${styles["mt-n1"]}`}>
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="form-group">
                    <div className={`${styles["input-icon1"]}`}>
                      <span className={`${errors.email ? `${styles["icon-error"]}` : `${styles["icon-envelope"]}`}`}>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </span>
                    </div>
                    <div className="form-input">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter your e-mail"
                        value={values.email}
                        onChange={handleChange}
                        className={`${errors.email && `${styles.error}`}`}
                      />
                      {errors.email && (
                        <p className={`text-danger ${styles["mt-n1"]}`}>
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="form-group">
                    <div className={`${styles["input-icon2"]}`}>
                      <span className={`${errors.password ? `${styles["icon-lock-error"]}` : `${styles["icon-lock"]}`}`}>
                        <FontAwesomeIcon icon={faLock} />
                      </span>
                    </div>
                    <div className={`${styles["form-input"]}`}>
                      <input
                        type={type}
                        name="password"
                        id="password"
                        placeholder="Create your password"
                        value={values.password}
                        onChange={handleChange}
                        className={`mb-0 ${errors.password && `${styles.error}`}`}
                      />
                      <span onClick={handleToggle}>
                        <FontAwesomeIcon icon={icon} />
                      </span>
                    </div>
                    {errors.password && (
                      <p className={`text-danger mt-2`}>{errors.password}</p>
                    )}
                  </div>
                  <div className="col-12">
                    <button disabled={!values.firstName} className={`btn mt-5 mb-4 ${styles.button}`}>
                      Sign Up
                    </button>
                    <div className={`text-center mb-5 ${styles.signup}`}>
                      {`Already have an account? Let's `}
                      <Link href={"/login"}>Login</Link>
                    </div>
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

export default Register;
