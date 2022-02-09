import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "src/commons/styles/Profile.module.css";
import { profile } from "src/modules/utils/user";

function PersonalInfo() {
  // const router = useRouter();
  const userData = useSelector((state) => state.user.userData);
  // const [userData, setUserData] = useState({});

  // const getProfile = () => {
  //   const id = JSON.parse(localStorage["zwallet-idUser"]);
  //   const token = JSON.parse(localStorage["zwallet-token"]);
  //   profile(token, id)
  //     .then((res) => {
  //       // console.log(res.data);
  //       setUserData(res.data.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // useEffect(() => {
  //   getProfile();
  // }, []);

  // const { firstName, lastName, noTelp, email } = userData;
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
                <p className="text-muted">First Name</p>
                <h5 className={`fw-bold m-0 ${styles.userInfo}`}>
                  {userData.firstName}
                </h5>
              </div>
            </div>
            <div className="card border-0 shadow mb-3">
              <div className={`${styles["card-body"]}`}>
                <p className="text-muted">Last Name</p>
                <h5 className={`fw-bold m-0 ${styles.userInfo}`}>
                  {userData.lastName}
                </h5>
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
