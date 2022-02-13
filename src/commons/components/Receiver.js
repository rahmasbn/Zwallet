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
  console.log("router", router);
  const token = useSelector((state) => state.auth.authUser.token);
  const [usersData, setUsersData] = useState(null);
  // const [timer, setTimer] = useState(null)

  const showUsers = (data) => {
    const card = [];
    for (let i = 0; i < data.length; i++) {
      const element = <ReceiverCard data={data[i]} key={i} />;
      card.push(element);
    }
    // console.log("card", card);
    return card;
  };

  const getAllUsers = (page, search) => {
    const filter = `?page=${page}&limit=4&search=${search}&sort=firstName ASC`;
    getUsers(filter, token)
      .then((res) => {
        setUsersData({
          users: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    let search = e.target.value.trim();
    getAllUsers(1, search);
    router.push({
      pathname: "/transfer",
      query: {
        page: 1,
        search: search,
      },
    });
  };
  // const handleKeyDown = (e) => {
  //   if (e.key === "Enter") {
  //     getAllUsers(1, search);
  //   }
  // };

  useEffect(() => {
    let page = router.query.page ? router.query.page : 1;
    let search = router.query.search ? router.query.search : "";

    getAllUsers(page, search);
  }, [router]);
  // console.log('user', usersData.data.length)

  const pagination = (data) => {
    let search = router.query.search ? router.query.search : "";
    const { page, totalPage } = data;

    return (
      <div className={`d-flex ${styles["btn-pagination"]}`}>
        {page === 1 ? (
          <>
            <button
              className={`btn fw-bold me-3 px-4 py-2 ${styles["btn-disable"]}`}
            >
              Prev
            </button>
            <p className={`fw-bold ${styles.page}`}>{page}</p>
          </>
        ) : (
          <>
            <Link href={`/transfer?page=${page - 1}&search=${search}`} passHref>
              <button className={`btn me-3 px-4 py-2 ${styles["btn-active"]}`}>
                Prev
              </button>
            </Link>
            <p className={`fw-bold ${styles.page}`}>{page}</p>
          </>
        )}
        {page < totalPage ? (
          <Link href={`/transfer?page=${page + 1}&search=${search}`} passHref>
            <button className={`btn ms-3 px-4 py-2 ${styles["btn-active"]}`}>
              Next
            </button>
          </Link>
        ) : (
          <button
            className={`btn ms-3 fw-bold px-4 py-2 ${styles["btn-disable"]}`}
          >
            Next
          </button>
        )}
      </div>
    );
  };

  return (
    <>
      <div
        className={`card border-0 shadow min py-3 px-3 ${styles.overflow} ${styles["card-receiver"]}`}
      >
        <div className={`card-body `}>
          <h4 className="fw-bold mb-4">Search Receiver</h4>
          <div className={`${styles["search-input"]} mb-5`}>
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
                // router.push(`?search=${e.target.value.trim()}`);
              }}
            />
          </div>
          {usersData !== null && usersData.users.data.length > 0 ? (
            <>
              <div className="receiver">{showUsers(usersData.users.data)}</div>
              <div className="pagination">
                {pagination(usersData.users.pagination)}
              </div>
            </>
          ) : (
            <h5 className="text-center text-muted">
              Sorry, the user you are looking for couldn&apos;t be found.
            </h5>
          )}
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
          <div className={`${styles.body} d-flex`}>
            <div className="align-self-center d-flex">
              <div className={`${styles["wrapper-img"]} me-5`}>
                <Image
                  src={
                    image !== null
                      ? `${process.env.NEXT_PUBLIC_HOST}/uploads/${image}`
                      : avatar
                  }
                  placeholder="blur"
                  blurDataURL={avatar}
                  onError={() => {
                    avatar;
                  }}
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
