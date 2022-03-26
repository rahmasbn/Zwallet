import styles from "src/commons/styles/Profile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import PinInput from "react-pin-input";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useState } from "react";
import { changePin, checkPin } from "src/modules/utils/user";
import { toast } from "react-toastify";

function ChangePIN() {
  const props = {
    className: PinInput,
    inputStyle: {
      fontFamily: "Nunito Sans",
      marginRight: "5px",
      marginBottom: "5px",
      MozAppearance: "textfield",
      width: "40px",
      borderRadius: "6px",
      fontSize: "20px",
      height: "45px",
      backgroundColor: "white",
      color: "black",
      border: "1px solid #6d7499",
      textAlign: "center",
    },
  };

  const router = useRouter();
  // const [isVerify, setIsVerify] = useState(false);
  const [pinCode, setPinCode] = useState(0);
  const user = useSelector((state) => state.auth.authUser);

  const handleChange = (e) => {
    setPinCode(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = {
      pin: pinCode,
    };
    // console.log("body", body);

    changePin(body, user.token, user.id)
      .then((res) => {
        console.log(res.data);
        router.push("/profile");
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
  };
  return (
    <>
      <p className="text-muted py-4">
        Type your new 6 digits security PIN to use in
        <br />
        Zwallet.
      </p>
      <div className=" w-100 my-5">
        <div className="row d-flex justify-content-center">
          <div className="col-md-6">
            <form onSubmit={handleSubmit}>
              <div className="form-input text-center mb-5 col-12">
                <PinInput
                  length={6}
                  secret
                  type="numeric"
                  inputMode="number"
                  regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
                  autoSelect={true}
                  onChange={handleChange}
                  {...props}
                />
              </div>
              <div className="col-12">
                <button
                  disabled={!pinCode}
                  className={`btn mt-2 mb-4 ${styles.button}`}
                  type="submit"
                >
                  Change PIN
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChangePIN;
