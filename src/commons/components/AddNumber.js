import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import styles from "src/commons/styles/Profile.module.css";
import { editPhoneNumber } from "src/modules/utils/user";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { updatePhoneNumber } from "src/redux/actions/user";
// import { useState, useEffect } from "react";
// import { validateNumber } from "src/modules/helpers/validation";
import { toast } from "react-toastify";

function AddNumber() {
  const router = useRouter();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.authUser.token);
  const id = useSelector((state) => state.auth.authUser.id);

  // const [values, setValues] = useState({
  //   noTelp: "",
  // });
  // const [errors, setErrors] = useState({});
  // const [isSubmit, setIsSubmit] = useState(false);

  // const handleChange = (e) => {
  //   setValues({
  //     ...values,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    // setErrors(validateNumber(values));
    // const validateBody = validateNumber(values);

    const body = {
      noTelp: e.target.phone.value,
    };

    // if(Object.keys(validateNumber).length === 0){
    editPhoneNumber(body, token, id)
      .then((res) => {
        console.log(res.data);
        setIsSubmit(true);
        const noTelp = res.data.data.noTelp;
        console.log(noTelp)
        if (noTelp !== null) {
          dispatch(updatePhoneNumber(noTelp));
        }
        router.push("/profile/personal-information");
        toast.success(res.data.msg, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.msg, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      });
    // }
  };

  // useEffect(() => {
  //   if (Object.keys(errors).length === 0 && isSubmit) {

  //     console.log("isSubmit", isSubmit);
  //     console.log("useEff error", errors);
  //   }
  // }, [errors, isSubmit]);

  return (
    <div>
      <div
        className={`card shadow border-0 ps-3 vh-100 ${styles.card} ${styles["card-manage"]}`}
      >
        <div className="card-body">
          <h4 className="fw-bold mb-3 pt-3">Add Phone Number</h4>
          <p className="text-muted py-4">
            Add at least one phone number for the transfer
            <br />
            ID so you can start transfering your money to <br />
            another user.
          </p>
          <div className=" w-100 my-5">
            <div className="row d-flex justify-content-center">
              <div className="col-md-6">
                <form className={`mt-5 ${styles.form}`} onSubmit={handleSubmit}>
                  <div className="form-group">
                    <div className={`${styles["input-icon1"]}`}>
                      <span className={`text-primary ${styles["icon-phone"]}`}>
                        <FontAwesomeIcon icon={faPhoneAlt} />
                      </span>
                    </div>

                    <div className="form-input d-flex">
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        placeholder="Enter your phone number"
                        className={`ps-5`}
                        required
                        // value={values.noTelp}
                        // onChange={handleChange}
                      />
                      {/* {errors.noTelp && (
                        <p className={`text-danger ${styles["mt-n1"]}`}>
                          {errors.noTelp}
                        </p>
                      )} */}
                    </div>
                  </div>
                  <div className="col-12">
                    <button
                      className={`btn mt-2 mb-4 ${styles.button}`}
                      type="submit"
                    >
                      Add Phone Number
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddNumber;
