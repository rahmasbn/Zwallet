import styles from "src/commons/styles/Transfer.module.css";
import samuel from "public/samuel.png";
import Image from "next/image";

function Amount() {
  return (
    <>
      <div className={`card border-0 shadow min py-3 px-3 ${styles.card}`}>
        <div className="card-body">
          <h4 className="fw-bold mb-5">Transfer Money</h4>
          <div className="card border-0 shadow mb-4">
            <div className="card-body d-flex">
              <div className="align-self-center d-flex">
                <div className={`${styles["img-wrapper"]} me-5`}>
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
            <div className="transfer">
              <p className="text-muted d-none d-md-block">
                Type the amount you want to transfer and then
                <br />
                press continue to the next steps.
              </p>
              <div className="form-input d-flex justify-content-center mt-4">
                <input
                  type="text"
                  name="amount"
                  placeholder="0.00"
                  className={`form-control text-center fw-bold border-0 mb-2 ${styles["form-control"]}`}
                />
              </div>

              <p className="fw-bold text-center mb-5">Rp120.000 Available</p>
              <div className="row w-100 d-flex justify-content-center">
                <div className="col-lg-6">
                  <div className={`${styles.form}`}>
                    <div className={`${styles.icon}`}>
                      <span className="bi bi-pencil"></span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Add some notes"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-3 d-flex justify-content-end">
              <button type="button" className={`btn btn-lg ${styles["btn-amount"]}`}>
                <small className="p-3">Continue</small>
              </button>
            </div>
        </div>
      </div>
    </>
  );
}

export default Amount;
