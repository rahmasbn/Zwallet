import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import styles from "src/commons/styles/Profile.module.css";
import { editPhoneNumber } from "src/modules/utils/user";
import { updatePhoneNumber } from "src/redux/actions/user";
import Swal from "sweetalert2";

function ManageNumber() {
  const phone = useSelector((state) => state.user.userData.noTelp);
  const token = useSelector((state) => state.auth.authUser.token);
  const id = useSelector((state) => state.auth.authUser.id);
  const dispatch = useDispatch();
  const router = useRouter();

  const onDelete = (e) => {
    e.preventDefault();

    const body = {
      noTelp: "",
    };
    console.log('body', body)
    editPhoneNumber(body, token, id)
      .then((res) => {
        console.log('editnumber', res.data);
        const noTelp = res.data.data.noTelp
        // if(noTelp === null) {
          dispatch(updatePhoneNumber(noTelp));
        // }
        router.push("/profile/personal-information");
        toast.success(res.data.msg, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error(`Can't delete the number`, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      });
  };

  return (
    <>
      <div
        className={`card shadow border-0 ps-3 ${styles.card} ${styles["card-manage"]}`}
      >
        <div className="card-body">
          <h4 className="fw-bold mb-3 pt-3">Manage Phone Number</h4>
          <p className="text-muted py-4">
            You can only delete the phone number and then
            <br />
            you must add another phone number.
          </p>
          <div className="card shadow border-0 rounded-3">
            <div className={`${styles["card-body"]}`}>
              <div className="d-flex justify-content-between">
                <div>
                  <p className="text-muted">Primary</p>
                  <h5 className={`fw-bold m-0 pb-2 ${styles.userInfo}`}>
                    {phone}
                  </h5>
                </div>
                <div className="align-self-center">
                  {/* <b-link className="text-decoration-none" @click="deleteNumber()"> */}
                  <h3
                    className={`m-0 text-muted ${styles.delete}`}
                    onClick={onDelete}
                  >
                    {/* <FontAwesomeIcon icon={faTrash} /> */}
                    <span className="bi bi-trash"></span>
                  </h3>
                  {/* </b-link> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ManageNumber;
