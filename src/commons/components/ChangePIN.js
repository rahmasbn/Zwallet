import styles from "src/commons/styles/Profile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function ChangePIN() {
  return (
    <>
      <div className={`card shadow border-0 ps-3 vh-100 ${styles.card} ${styles["card-manage"]}`}>
        <div className="card-body">
          <h4 className="fw-bold mb-3 pt-3">Change PIN</h4>
          <p className="text-muted py-4">
            Enter your current 6 digits Zwallet PIN below to
            <br />
            continue to the next steps.
          </p>
         
        </div>
      </div>
    </>
  );
}

export default ChangePIN;
