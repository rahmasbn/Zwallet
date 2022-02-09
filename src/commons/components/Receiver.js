import styles from "src/commons/styles/Transfer.module.css";
import samuel from "public/samuel.png";
import christine from "public/christine.png";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function Receiver() {
  return (
    <>
      <div className={`card border-0 shadow min py-3 px-3 ${styles.overflow} ${styles["card-receiver"]}`}>
        <div className={`card-body `}>
          <h4 className="fw-bold mb-4 pt-3">Search Receiver</h4>
          <div className={`${styles["search-input"]} mb-4`}>
            <div className={`${styles["input-icon"]}`}>
              <span
                className={`${styles["icon-search"]}`}
              >
                <FontAwesomeIcon icon={faSearch} />
              </span>
            </div>
            <input type="text" placeholder="Search receiver here" className="ps-5"/>
          </div>
          <div className="card border-0 shadow mb-4">
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
          <div className="card border-0 shadow mb-4">
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
          <div className="card border-0 shadow mb-4">
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
          <div className="card border-0 shadow mb-4">
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
        </div>
      </div>
    </>
  );
}

export default Receiver;
