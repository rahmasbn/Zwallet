import styles from "src/commons/styles/Transfer.module.css";
import avatar from "public/avatar.jpg";
import christine from "public/christine.png";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { getUsers } from "src/modules/utils/user";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";

function Receiver() {
  const router = useRouter();
  const token = useSelector((state) => state.auth.authUser.token);
  const [usersData, setUsersData] = useState(null);
  // const [search, setSearch] = useState({})
  // const [timer, setTimer] = useState(null)

  const showUsers = (data) => {
    const card = [];
    for (let i = 0; i < data.length; i++) {
      const element = <ReceiverCard data={data[i]} key={i} />;
      card.push(element);
    }
    console.log("card", card);
    return card;
  };

  const getAllUsers = (page, search) => {
    const filter = `?page=${page}&limit=5&search=${search}&sort=firstName ASC`;
    getUsers(filter, token)
      .then((res) => {
        setUsersData({
          users: res.data.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    const search = e.target.value.trim();
    getAllUsers(1, search);
  };
  // const handleKeyDown = (e) => {
  //   if (e.key === "Enter") {
  //     getAllUsers(1, search);
  //   }
  // };

  useEffect(() => {
    if (usersData === null) {
      getAllUsers(1, "");
    }
  });
  // console.log('user', usersData.data.length)
  return (
    <>
      <div
        className={`card border-0 shadow min py-3 px-3 ${styles.overflow} ${styles["card-receiver"]}`}
      >
        <div className={`card-body `}>
          <h4 className="fw-bold mb-4">Search Receiver</h4>
          <div className={`${styles["search-input"]} mb-4`}>
            <div className={`${styles["input-icon"]}`}>
              <span className={`${styles["icon-search"]}`}>
                <FontAwesomeIcon icon={faSearch} />
              </span>
            </div>
            <input
              type="text"
              placeholder="Search receiver here"
              className="ps-5"
              name="search"
              onChange={(e) => {
                handleChange(e);
                router.push(`?search=${e.target.value.trim()}`);
              }}
            />
          </div>
          {usersData !== null && usersData.users.length > 0 ? (
            showUsers(usersData.users)
          ) : (
            <h5 className="text-center text-muted">
              Sorry, the user you are looking for couldn&apos;t be found.
            </h5>
          )}
          {/* {usersData.data.length > 0 ? (
            usersData.data.map((user) => {
              <Link key={user.id} href={`/transfer/${user.id}`} passHref>
                <div className="card border-0 shadow mb-3">
                  <div className="card-body d-flex">
                    <div className="align-self-center d-flex">
                      <div className={`${styles["img-container"]} me-5`}>
                        <Image
                          src={user.image !== null ? user.image : avatar}
                          alt="user"
                          layout="responsive"
                          className={`${styles["img-user"]}`}
                        />
                      </div>
                      <div className="align-self-center">
                        <h5 className="fw-bold">
                          {user.firstName} {user.lastName}
                        </h5>
                        <p className="text-muted m-0">
                          {user.noTelp !== null ? user.noTelp : "-"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>;
            })
          ) : (
            <h5 className="text-center text-muted">
              Sorry, the user you are looking for couldn&apos;t be found.
            </h5>
          )} */}

          {/* <div className="card border-0 shadow mb-3">
            <div className="card-body d-flex">
              <div className="align-self-center d-flex">
                <div className={`${styles["img-container"]} me-5`}>
                  <Image
                    src={christine}
                    alt="user"
                    layout="responsive"
                    className={`${styles["img-user"]}`}
                  />
                </div>
                <div className="align-self-center">
                  <h5 className="fw-bold">Christine</h5>
                  <p className="text-muted m-0">+62 8492-9994</p>
                </div>
              </div>
            </div>
          </div>
          <div className="card border-0 shadow mb-3">
            <div className="card-body d-flex">
              <div className="align-self-center d-flex">
                <div className={`${styles["img-container"]} me-5`}>
                  <Image
                    src={samuel}
                    alt="user"
                    layout="responsive"
                    className={`${styles["img-user"]}`}
                  />
                </div>
                <div className="align-self-center">
                  <h5 className="fw-bold">Samuel Suhi</h5>
                  <p className="text-muted m-0">+62 8492-9994</p>
                </div>
              </div>
            </div>
          </div>
          <div className="card border-0 shadow mb-3">
            <div className="card-body d-flex">
              <div className="align-self-center d-flex">
                <div className={`${styles["img-container"]} me-5`}>
                  <Image
                    src={christine}
                    alt="user"
                    layout="responsive"
                    className={`${styles["img-user"]}`}
                  />
                </div>
                <div className="align-self-center">
                  <h5 className="fw-bold">Christine</h5>
                  <p className="text-muted m-0">+62 8492-9994</p>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}

function ReceiverCard(props) {
  const { id, firstName, lastName, image, noTelp } = props.data;
  // console.log("props", props.data);
  return (
    <>
      <Link href={`/transfer/${id}`} passHref>
        <summary className="card border-0 shadow mb-3">
          <div className="card-body d-flex">
            <div className="align-self-center d-flex">
              <div className={`${styles["img-container"]} me-5`}>
                <Image
                  src={image !== null ? `/${image}` : avatar}
                  width={30}
                  height={30}
                  alt="user"
                  layout="responsive"
                  className={`${styles["img-user"]}`}
                />
              </div>
              <div className="align-self-center">
                <h5 className="fw-bold">
                  {firstName} {lastName}
                </h5>
                <p className="text-muted m-0">
                  {noTelp !== null ? noTelp : "-"}
                </p>
              </div>
            </div>
          </div>
        </summary>
      </Link>
    </>
  );
}

export default Receiver;
