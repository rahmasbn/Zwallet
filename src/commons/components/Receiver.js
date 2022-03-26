import styles from "src/commons/styles/Transfer.module.css";
import avatar from "public/avatar.jpg";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { getUsers } from "src/modules/utils/user";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import LoadingComponent from "./LoadingComponent";

function Receiver() {
  const router = useRouter();
  const token = useSelector((state) => state.auth.authUser.token);
  const [usersData, setUsersData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const showUsers = (data) => {
    const card = [];
    for (let i = 0; i < data.length; i++) {
      const element = <ReceiverCard data={data[i]} key={i} />;
      card.push(element);
    }
    // console.log("card", card);
    return card;
  };

  const getAllUsers = (page, search, sort) => {
    setIsLoading(true);
    // const filter = `?page=${page}&limit=4&search=${search}&sort=firstName ASC`;
    const filter = `?page=${page}&limit=4&search=${search}&sort=${sort}`;
    getUsers(filter, token)
      .then((res) => {
        setUsersData({
          users: res.data,
        });
        setIsLoading(false);
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

  const debounce = (func, delay) => {
    let timeOutId;
    return (...args) => {
      if (timeOutId) {
        clearTimeout(timeOutId);
      }
      timeOutId = setTimeout(() => {
        func.apply(null, args);
      }, delay);
    };
  };

  useEffect(() => {
    let page = router.query.page ? router.query.page : 1;
    let search = router.query.search ? router.query.search : "";
    let sort = router.query.sort ? router.query.sort : "firstName ASC";

    getAllUsers(page, search, sort);
  }, [router]);
  // console.log('user', usersData.data.length)

  const pagination = (data) => {
    let search = router.query.search ? router.query.search : "";
    let sort = router.query.sort ? router.query.sort : "firstName ASC";
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
            <Link
              href={`/transfer?page=${page - 1}&search=${search}&sort=${sort}`}
              passHref
            >
              <button className={`btn me-3 px-4 py-2 ${styles["btn-active"]}`}>
                Prev
              </button>
            </Link>
            <p className={`fw-bold ${styles.page}`}>{page}</p>
          </>
        )}
        {page < totalPage ? (
          <Link
            href={`/transfer?page=${page + 1}&search=${search}&sort=${sort}`}
            passHref
          >
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
          <div className="row">
            <div className="fw-bold mb-4 fs-4 col-9">Search Receiver</div>
            <div className="col-2">
              <select
                name="sort"
                // defaultValue="firstName ASC"
                className={`${styles["select-sort"]}`}
                // onChange={(e) => router.push(`?filter=${e.target.value}`)}
                onChange={(e) =>
                  router.push({
                    pathname: "/transfer",
                    query: { page: 1, sort: e.target.value },
                  })
                }
              >
                <option value="" disable="true" hidden className="filter">
                  -- Sort --
                </option>
                <option value="firstName ASC">
                  firstName ASC
                </option>
                <option value="firstName DESC">
                  firstName DESC
                </option>
                <option value="noTelp ASC">
                  noTelp ASC
                </option>
                <option value="noTelp DESC">
                  noTelp DESC
                </option>
              </select>
            </div>
          </div>
          <div className={`${styles["search-input"]} mb-5 mt-3`}>
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
              // onChange={(e) => {
              //   handleChange(e);
              //   // router.push(`?search=${e.target.value.trim()}`);
              // }}
              onChange={debounce(handleChange, 1000)}
              onKeyPress={(e) => e.key === "Enter" && handleChange}
              autoComplete="off"
            />
          </div>
          {!isLoading ? (
            <>
              {usersData !== null && usersData.users.data.length > 0 ? (
                <>
                  <div className="receiver">
                    {showUsers(usersData.users.data)}
                  </div>
                  <div className="pagination">
                    {pagination(usersData.users.pagination)}
                  </div>
                </>
              ) : (
                <h5 className="text-center text-muted">
                  Sorry, the user you are looking for couldn&apos;t be found.
                </h5>
              )}
            </>
          ) : (
            <LoadingComponent />
          )}
        </div>
      </div>
    </>
  );
}

function ReceiverCard(props) {
  const { id, firstName, lastName, image, noTelp } = props.data;
  // console.log("props", props.data);
  const [isError, setIsError] = useState(false);

  return (
    <>
      <Link href={`/transfer/${id}`} passHref>
        <summary className="card border-0 shadow mb-3">
          <div className={`${styles.body} d-flex`}>
            <div className="align-self-center d-flex">
              <div className={`${styles["wrapper-img"]} me-5`}>
                <Image
                  src={
                    // image !== null
                    //   ? `${process.env.NEXT_PUBLIC_HOST}/uploads/${image}`
                    //   : avatar
                    isError === true
                      ? avatar
                      : `${process.env.NEXT_PUBLIC_HOST}/uploads/${image}`
                  }
                  placeholder="blur"
                  blurDataURL={avatar}
                  onError={() => {
                    setIsError(true);
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
