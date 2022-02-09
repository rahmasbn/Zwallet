import { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import styles from "src/commons/styles/Dashboard.module.css";
import { topUp } from "src/modules/utils/transaction";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

function TopUpModal({ show, handleClose }) {
  const token = useSelector((state) => state.auth.authUser.token);
  const router = useRouter();
  const submitHandler = (e) => {
    e.preventDefault();

    const body = {
      amount: e.target.amount.value,
    };
    topUp(body, token)
      .then((res) => {
        console.log(res.data);
        toast.success(res.data.msg, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error(error.response.data.msg, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      });
  };

  return (
    <>
      <Modal show={show} className={`${styles["modal-topup"]}`}>
        <Modal.Body className="mx-3">
          <h3 className="fw-bold mt-2 mb-4">
            Topup
            <p
              className={`btn-close position-absolute ${styles["btn-close"]}`}
              onClick={handleClose}
            ></p>
          </h3>
          <p className={`${styles.desc} mb-4`}>
            Enter the amount of money, and click <br /> submit.
          </p>
          <form onSubmit={submitHandler}>
            <input
              className="form-control py-2 mb-3"
              type="text"
              name="amount"
              //   value={this.state.input.currentPass || ""}
              //   onChange={this.changeHandler}
            />
            {/* <div className="text-danger mb-2">
                      {this.state.errorMsg.currentPass}
                    </div> */}
            <div
              className={`col-md-12 text-center mt-5 mb-2 d-flex justify-conten-end `}
            >
              <button
                type="submit"
                className={`btn text-white ${styles.topup}`}
              >
                Submit
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default TopUpModal;
