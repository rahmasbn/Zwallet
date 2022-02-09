import Image from "next/image";
import robert from "public/robert.png";
import avatar from "public/avatar.jpg";
import styles from "src/commons/styles/Profile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
// import PersonalInfo from "./PersonalInfo";
// import { useRouter } from "next/router";
import Link from "next/link";
import Swal from "sweetalert2";
import { logout } from "src/modules/utils/auth";
import { logoutAction } from "src/redux/actions/auth";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getProfileAction } from "src/redux/actions/user";

function MyProfile() {
  const router = useRouter();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.authUser.token);
  const id = useSelector((state) => state.auth.authUser.id);
  const userData = useSelector((state) => state.user.userData);
  // console.log('user', userData)

  // const [isInfo, setIsInfo] = useState(false);

  // const getProfile = () => {
  //   // profile(token, id)
  //   //   .then((res) => {
  //   //     // console.log(res.data);
  //   //     setUserData(res.data.data);
  //   //   })
  //   //   .catch((err) => {
  //   //     console.log(err);
  //   //   });
  // };
  useEffect(()=> {

    dispatch(getProfileAction(token,id))
  }, [dispatch, token, id])


  const onLogout = () => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure you want to logout?",
      showCancelButton: true,
      confirmButtonText: "Logout",
      cancelButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        logout(token)
          .then((res) => console.log(res))
          .catch((err) => console.error(err));

        dispatch(logoutAction());
        Swal.fire({
          title: "Logout Successful",
          text: "You have successfully logged out",
          icon: "success",
        });
        setTimeout(() => {
          window.location.reload(false);
        }, 5000);
        router.push("/");
      }
    });
  };

  // const { firstName, lastName, noTelp } = userData;
  return (
    <>
      {/* {!isInfo ? ( */}
      <div className={`card border-0 shadow vh-100 ${styles.card}`}>
        <div className="card-body">
          <div className="py-3">
            <div className="container d-flex justify-content-center mb-2">
              <div className={`mb-2 ms-3 ${styles.profile}`}>
                <Image
                  src={userData.image !== null ? userData.image : avatar}
                  alt="photo profile"
                  className={`${styles.pic}`}
                />
              </div>
            </div>
            <p className="text-center text-muted">
              <span className="bi bi-pencil"></span> Edit
            </p>
            <div className="container text-center">
              <h4 className={`fw-bold ${styles.name}`}>
                {userData.firstName} {userData.lastName}
              </h4>
              <p className="text-muted m-0">{userData.noTelp !== null ? userData.noTelp : "-"}</p>
            </div>
          </div>

          <div className="d-flex align-items-start flex-column py-5 pb-4">
            <Link href={"/profile/personal-information"} passHref>
              <a
                className={` ${styles["btn-dark"]} d-grid gap-2 col-6  mx-auto h-50 mb-auto text-decoration-none`}
              >
                <button
                  className="btn border-0 btn-lg"

                  // onClick={() => setIsInfo(true)}
                >
                  <span className="d-flex justify-content-between">
                    <small className="align-self-center pe-5">
                      Personal Information
                    </small>
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className={`${styles.icon}`}
                    />
                  </span>
                </button>
              </a>
            </Link>
            <Link href={"/change-password"} passHref>
              <a
                className={` ${styles["btn-dark"]} d-grid gap-2 col-6  mx-auto mt-3 h-50 mb-auto text-decoration-none`}
              >
                <button className={`btn btn-lg border-0`}>
                  <span className="d-flex justify-content-between font-weight-bold">
                    <small className="align-self-center pe-5">
                      Change Password
                    </small>
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className={`${styles.icon}`}
                    />
                  </span>
                </button>
              </a>
            </Link>
            <Link href={"/change-pin"} passHref>
              <a
                className={`${styles["btn-dark"]} d-grid gap-2 col-6 mx-auto mt-3 h-50 mb-auto text-decoration-none`}
              >
                <button className="btn btn-lg border-0">
                  <span className="d-flex justify-content-between">
                    <small className=" align-self-center pe-5">
                      Change PIN
                    </small>
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className={`${styles.icon}`}
                    />
                  </span>
                </button>
              </a>
            </Link>
            <button
              className={`btn ${styles["btn-dark"]} d-grid gap-2 col-6 mx-auto btn-lg h-50 mt-3 mb-2`}
              onClick={onLogout}
            >
              <span className="d-flex justify-content-start font-weight-bold">
                <small className="align-self-center">Logout</small>
              </span>
            </button>
          </div>
        </div>
      </div>
      {/* // ) : ( // <PersonalInfo />
      // )} */}
    </>
  );
}

export default MyProfile;
