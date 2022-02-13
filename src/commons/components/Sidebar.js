import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "src/commons/styles/Footer.module.css";
import { logout } from "src/modules/utils/auth";
import { logoutAction } from "src/redux/actions/auth";
import Swal from "sweetalert2";
import TopUpModal from "./TopUpModal";

function Sidebar() {
  const router = useRouter();
  const token = useSelector((state) => state.auth.authUser.token);
  // console.log(token)
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  return (
    <>
      <div className={`card border-0 shadow py-4 pt-0 ${styles.sidebar}`}>
        <div className="card-body p-0">
          <div
            className={`d-flex align-items-start flex-column d-sm-block ${styles["card-text"]}`}
          >
            <div className="side">
              <Link
                href={{
                  pathname: "/dashboard",
                  // query: { id: router.query.id },
                }}
                passHref
              >
                <a className="text-decoration-none">
                  <div
                    className={
                      (router.pathname == "/dashboard" && !show) ||
                      (router.pathname == "/dashboard/history" && !show) ||
                      (router.pathname == "/dashboard/history/[id]" && !show)
                        ? `container mt-5 ${styles.active}`
                        : "container mt-5 text-muted"
                    }
                  >
                    <h5 className={`m-0 mx-3`}>
                      <span className="bi bi-grid pe-2"></span>
                      Dashboard
                    </h5>
                  </div>
                </a>
              </Link>
              <Link
                href={{
                  pathname: "/transfer",
                  // query: { id: router.query.id },
                }}
                passHref
              >
                <a className="text-decoration-none">
                  <div
                    className={
                      (router.pathname == "/transfer" && !show) ||
                      (router.pathname == "/transfer/[id]" && !show) ||
                      (router.pathname == "/transfer/confirmation" && !show)
                        ? `container mt-5 ${styles.active}`
                        : "container mt-5 text-muted"
                    }
                  >
                    <h5 className="m-0 mx-3 pointer">
                      <span className="bi bi-arrow-up pe-2"></span>
                      Transfer
                    </h5>
                  </div>
                </a>
              </Link>
              <div
                className={
                  show
                    ? `container mt-5 ${styles.active}`
                    : "container mt-5 text-muted"
                }
                onClick={handleShow}
              >
                <h5 className={`m-0 mx-3 ${styles.pointer}`}>
                  <span className="bi bi-plus-lg pe-2"></span>
                  Top Up
                </h5>
              </div>
              <Link href={`/profile/`} passHref>
                <a className="text-decoration-none">
                  <div
                    className={
                      (router.pathname == "/profile" && !show) ||
                      (router.pathname == "/profile/personal-information" &&
                        !show) ||
                      (router.pathname ==
                        "/profile/personal-information/manage-number" &&
                        !show) ||
                      (router.pathname == "/profile/change-pin" && !show) ||
                      (router.pathname == "/profile/change-password" && !show)
                        ? `container mt-5 ${styles.active}`
                        : "container mt-5 text-muted"
                    }
                  >
                    <h5 className="m-0 mx-3 ">
                      <span className="bi bi-person pe-2"></span>
                      Profile
                    </h5>
                  </div>
                </a>
              </Link>
              <div className="container text-muted" onClick={onLogout}>
                <h5 className={`ms-3 ${styles.logout}`}>
                  <span className="bi bi-box-arrow-right pe-2"></span>
                  Logout
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      <TopUpModal show={show} handleClose={handleClose} />
    </>
  );
}

export default Sidebar;
