import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import styles from "src/commons/styles/Profile.module.css";
import { updateName } from "src/modules/utils/user";
import { getProfileAction } from "src/redux/actions/user";

function PersonalInfo() {
  const userData = useSelector((state) => state.user.userData);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.authUser);

  const editFirstName = (e) => {
    e.preventDefault();
    // console.log(e.target.firstName);
    const body = {
      firstName: e.target.firstName.value,
    };
    updateName(user.id, body, user.token)
      .then((res) => {
        dispatch(getProfileAction(user.token, user.id));
        setShow(false);
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

  const editLastName = (e) => {
    e.preventDefault();

    const body = {
      lastName: e.target.lastName.value,
    };
    updateName(user.id, body, user.token)
      .then((res) => {
        dispatch(getProfileAction(user.token, user.id));
        setShow(false);
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
      <div className={`card border-0 shadow ps-3 vh-100 ${styles.card}`}>
        <div className="card-body">
          <h4 className="fw-bold mb-3 pt-3">Personal Information</h4>
          <p className="text-muted">
            We got your personal information from the sign <br />
            up process. If you want to make changes on <br />
            your information, contact our support.
          </p>
          <div className="pt-3">
            <div className={`card border-0 shadow mb-3 rounded-3`}>
              <div className={`${styles["card-body"]}`}>
                {!show ? (
                  <>
                    <div className="d-flex">
                      <div className="col justify-content-between">
                        <p className="text-muted">First Name</p>
                        <h5 className={`fw-bold ${styles.userInfo}`}>
                          {userData.firstName}
                        </h5>
                      </div>
                      <div
                        className={`align-self-center ${styles["icon-input"]}`}
                        onClick={() => setShow(true)}
                      >
                        <span className="bi bi-pencil"></span> Edit
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <form onSubmit={editFirstName}>
                      <div className="d-flex">
                        <div className="col justify-content-between">
                          <p className="text-muted">First Name</p>

                          <input
                            type="text"
                            name="firstName"
                            defaultValue={userData.firstName}
                            className={`me-3 ${styles.inputStyle}`}
                          />
                        </div>
                        <button
                          className={`align-self-center ${styles["icon-input"]}`}
                          type="submit"
                        >
                          <span className="bi bi-check2"></span> Save
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
            <div className="card border-0 shadow mb-3">
              <div className={`${styles["card-body"]}`}>
                {!show ? (
                  <>
                    <div className="d-flex">
                      <div className="col justify-content-between">
                        <p className="text-muted">Last Name</p>
                        <h5 className={`fw-bold m-0 ${styles.userInfo}`}>
                          {userData.lastName}
                        </h5>
                      </div>
                      <div
                        className={`align-self-center ${styles["icon-input"]}`}
                        onClick={() => setShow(true)}
                      >
                        <span className="bi bi-pencil"></span> Edit
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <form onSubmit={editLastName}>
                      <div className="d-flex">
                        <div className="col justify-content-between">
                          <p className="text-muted">Last Name</p>
                          <input
                            type="text"
                            name="lastName"
                            defaultValue={userData.lastName}
                            className={`me-3 ${styles.inputStyle}`}
                          />
                        </div>
                        <button
                          className={`align-self-center ${styles["icon-input"]}`}
                          type="submit"
                        >
                          <span className="bi bi-check2"></span> Save
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
            <div className="card border-0 shadow mb-3">
              <div className={`${styles["card-body"]}`}>
                <p className="text-muted">Verified E-mail</p>
                <h5 className={`fw-bold m-0 ${styles.userInfo}`}>
                  {userData.email}
                </h5>
              </div>
            </div>
            <div className="card border-0 shadow mb-3">
              <div className={`${styles["card-body"]}`}>
                <p className="text-muted">Phone Number</p>
                <div className="d-flex justify-content-between">
                  <h5 className={`fw-bold m-0 ${styles.userInfo}`}>
                    {userData.noTelp !== null && userData.noTelp !== ""
                      ? userData.noTelp
                      : "-"}
                  </h5>

                  <Link
                    href="/profile/personal-information/manage-number"
                    passHref
                  >
                    <a className="text-primary text-decoration-none fw-bold">
                      Manage
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PersonalInfo;
