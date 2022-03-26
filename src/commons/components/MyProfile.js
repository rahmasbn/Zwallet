import Image from "next/image";
import avatar from "public/avatar.jpg";
import styles from "src/commons/styles/Profile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Swal from "sweetalert2";
import { logout } from "src/modules/utils/auth";
import { logoutAction } from "src/redux/actions/auth";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { getProfileAction } from "src/redux/actions/user";
import { updateImage, updateName } from "src/modules/utils/user";
import { toast } from "react-toastify";
import LoadingComponent from "./LoadingComponent";

function MyProfile() {
  const router = useRouter();
  const dispatch = useDispatch();
  const target = useRef();
  const [isError, setIsError] = useState(false);
  const token = useSelector((state) => state.auth.authUser.token);
  const id = useSelector((state) => state.auth.authUser.id);
  const userData = useSelector((state) => state.user.userData);

  useEffect(() => {
    dispatch(getProfileAction(token, id));
  }, [dispatch, token, id]);

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

  const handleFile = (e) => {
    const body = new FormData();
    const image = e.target.files[0];
    if (image !== null) {
      body.append("image", image, image.name);
    }

    updateImage(id, body, token)
      .then((res) => {
        // console.log(res.data);
        dispatch(getProfileAction(token, id));
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
    };

    updateName(id, body, token)
      .then((res) => {
        dispatch(getProfileAction(token, id));
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
  // const { firstName, lastName, noTelp } = userData;
  return (
    <>
      {/* {!isInfo ? ( */}
      <div className={`card border-0 shadow vh-100 ${styles.card}`}>
        <div className="card-body">
          {userData ? (
            <>
              <div className="py-3">
                <div className="container d-flex justify-content-center mb-2">
                  <div className={`mb-2 ms-3 ${styles.profile}`}>
                    <Image
                      src={
                        isError === true
                          ? avatar
                          : `${process.env.NEXT_PUBLIC_HOST}/uploads/${userData.image}`
                      }
                      placeholder="blur"
                      blurDataURL={avatar}
                      onError={() => {
                        setIsError(true);
                      }}
                      // src={userData.image !== null ? userData.image : avatar}
                      alt="photo profile"
                      width={70}
                      height={70}
                      layout="responsive"
                      className={`${styles.pic} ${styles.editImg}`}
                      // onClick={() => target.current.click()}
                    />
                  </div>
                </div>
                <input type="file" ref={target} onChange={handleFile} hidden />
                <p
                  className={`text-center text-muted ${styles.editImg}`}
                  // onClick={() => setShow(true)}
                  onClick={() => target.current.click()}
                >
                  <span className="bi bi-pencil"></span> Edit
                </p>
                <div className="container text-center">
                  <h4 className={`fw-bold ${styles.name}`}>
                    {userData.firstName ? userData.firstName : ""}{" "}
                    {userData.lastName ? userData.lastName : ""}
                  </h4>
                  {/* {!show ? (
                  ) : (
                    <>
                      <form onSubmit={handleSubmit}>
                        <div className="d-flex justify-content-center">
                          <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            className="text-center me-3"
                          />
                          <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            className="text-center"
                          />
                        </div>
                        <div className="d-flex mt-2 justify-content-center">
                          <button
                            className={`btn ${styles["btn-edit"]} me-3`}
                            type="submit"
                          >
                            Submit
                          </button>
                          <button
                            className={`btn ${styles["btn-edit"]}`}
                            onClick={() => setShow(false)}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </>
                  )} */}
                  <p className="text-muted m-0">
                    {userData.noTelp !== null && userData.noTelp !== ""
                      ? userData.noTelp
                      : "--"}
                  </p>
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
                <Link href={"/profile/change-password"} passHref>
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
                <Link href={"/profile/change-pin"} passHref>
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
            </>
          ) : (
            <LoadingComponent />
          )}
        </div>
      </div>
      {/* // ) : ( // <PersonalInfo />
      // )} */}
    </>
  );
}

export default MyProfile;
