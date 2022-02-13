import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

import styles from "src/commons/styles/Header.module.css";
// import robert from "public/robert.png";
import avatar from "public/avatar.jpg";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProfileAction } from "src/redux/actions/user";
import Link from "next/link";

function Header() {
  const userData = useSelector((state) => state.user.userData);
  const token = useSelector((state) => state.auth.authUser.token);
  const id = useSelector((state) => state.auth.authUser.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileAction(token, id));
  }, [dispatch, token, id]);
  // console.log(userData.noTelp)
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light shadow bg-white py-4">
        <div className="container d-flex">
          <h3 className={`fw-bold m-0 ${styles.brand}`}>Zwallet</h3>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="navbar-nav ms-auto mb-2 mb-lg-0">
              <Link href={`/profile`} passHref>
                <summary className={`mb-2 ms-3 ${styles.profile}`}>
                  <Image
                    // src={userData.image !== null ? userData.image : avatar}
                    src={
                      userData.image !== null
                        ? `${process.env.NEXT_PUBLIC_HOST}/uploads/${userData.image}`
                        : avatar
                    }
                    width={50}
                    height={50}
                    placeholder="blur"
                    blurDataURL={avatar}
                    onError={() => {
                      avatar;
                    }}
                    alt="photo profile"
                    layout="responsive"
                    className={`${styles.pic}`}
                  />
                </summary>
              </Link>
              <div className="align-self-center">
                <h5 className={`m-0 ps-3 ${styles.name}`}>
                  {userData.firstName} {userData.lastName}
                </h5>
                <small className={`text-muted ps-3 ${styles.phone}`}>
                  {userData.noTelp !== null && userData.noTelp !== ""
                    ? userData.noTelp
                    : "-"}
                </small>
              </div>
              <h4
                className={`ms-4 align-self-center text-muted ${styles.icon}`}
              >
                <FontAwesomeIcon icon={faBell} />
              </h4>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
