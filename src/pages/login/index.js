import Link from "next/link";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

import styles from "src/commons/styles/Starter.module.css";
import StarterLeft from "src/commons/components/StarterLeft";
import Layout from "src/commons/components/Layout";
// import { login } from "src/modules/utils/auth";
import { useRouter } from "next/router";
import { validateLogin } from "src/modules/helpers/validation";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { loginAction } from "src/redux/actions/auth";
import { getProfileAction } from "src/redux/actions/user";
import Swal from "sweetalert2";
import { getChartAction } from "src/redux/actions/chart";

function Login() {
  const router = useRouter();
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.auth.authUser);
  const dispatch = useDispatch();

  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(faEyeSlash);
  const [values, setValues] = useState({
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

    setErrors(validateLogin(values));

    const validateBody = validateLogin(values);

    const body = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    if (Object.keys(validateBody).length === 0) {
      // login(body)
      //   .then((res) => {
      //     console.log(res.data);
      //     setIsSubmit(true);
      //     const token = res.data.data.token;
      //     const idUser = res.data.data.id;

      //     localStorage.setItem("zwallet-token", JSON.stringify(token));
      //     localStorage.setItem("zwallet-idUser", JSON.stringify(idUser));

      //     toast.success("Login successful", {
      //       position: toast.POSITION.TOP_RIGHT,
      //       autoClose: 3000,
      //     });
      //     router.push("/dashboard");
      //   })
      //   .catch((err) => {
      //     // console.log(err.response.data.msg);
      //     toast.error(err.response.data.msg, {
      //       position: toast.POSITION.TOP_RIGHT,
      //     });
      //   });
      dispatch(loginAction(body));
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmit) {
      console.log("isSubmit", isSubmit);
      console.log("useEff error", errors);
    }
    if (auth.isFulfilled === true) {
      dispatch(getProfileAction(user.token, user.id));
      // dispatch(getChartAction(id, token));
      // getChart(id, token)
      // .then((res) => {
      //   // console.log("chart", res.data.data.listExpense);
      //   const totalIncome = res.data.data.totalIncome;
      //   const totalExpense = res.data.data.totalExpense;
      //   const listIncome = res.data.data.listIncome;
      //   const listExpense = res.data.data.listExpense;
      //   const data = {
      //     totalIncome,
      //     totalExpense,
      //     listIncome,
      //     listExpense,
      //   }
      //   // setChart(res.data.data);
      //   // setListExpense(res.data.data.listExpense);
      //   // setListIncome(res.data.data.listIncome);
      //   dispatch(getChartAction(data))
      // })
      // .catch((err) => {
      //   console.log(err);
      // });
      if (user.pin !== null) {
        router.push("/dashboard");
        toast.success("Login successful", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      } else {
        Swal.fire({
          icon: "warning",
          text: "Please create your PIN to continue",
          showCancelButton: false,
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result.isConfirmed) {
            router.push("/createpin");
            setTimeout(() => {
              window.location.reload(false);
            }, 5000);
          }
        });
      }
    }
    if (auth.isRejected === true) {
      // console.log(auth.err.response.data.msg)
      toast.error("Invalid email/password", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    }
  }, [errors, isSubmit, auth, router, dispatch, user]);

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
      <Layout title={"Login | Zwallet"} />

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
                <form className={`mt-5 ${styles.form}`} onSubmit={handleSubmit} noValidate>
                  <div className="form-group">
                    <div className={`${styles["input-icon1"]}`}>
                      <span
                        className={`${
                          errors.email
                            ? `${styles["icon-error"]}`
                            : `${styles["icon-envelope"]}`
                        }`}
                      >
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
                      <span
                        className={`${
                          errors.password
                            ? `${styles["icon-lock-error"]}`
                            : `${styles["icon-lock"]}`
                        }`}
                      >
                        <FontAwesomeIcon icon={faLock} />
                      </span>
                    </div>
                    <div className={`${styles["form-input"]}`}>
                      <input
                        type={type}
                        name="password"
                        id="password"
                        placeholder="Enter your password"
                        value={values.password}
                        onChange={handleChange}
                        className={`mb-0 ${
                          errors.password && `${styles.error}`
                        }`}
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
                    <div
                      className={`text-end mt-3 ${styles["forgot-password"]}`}
                    >
                      <Link href={`/forgot-password`}>Forgot Password?</Link>
                    </div>
                    <button
                      disabled={!values.email}
                      className={`btn mt-5 mb-4 ${styles.button}`}
                    >
                      Login
                    </button>
                    <div className={`text-center mb-5 ${styles.signup}`}>
                      {`Don't have an account? Let's `}
                      <Link href={"/register"}>Sign Up</Link>
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

export default Login;
