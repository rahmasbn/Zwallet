import styles from "src/commons/styles/Footer.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Footer() {
  return (
    <>
      <div className={`container-fluid py-4 d-flex ${styles["bg-footer"]}`}>
    <div className="align-self-center w-100">
      <div
        className="container d-block d-md-flex justify-content-between text-center text-md-left"
      >
        <div>2020 EZwallet. All right reserved.</div>
        <div className="d-block d-md-flex justify-content-between">
          <div className="me-3">+62 5637 8882 9901</div>
          <div className="">contact@ezwallet.com</div>
        </div>
      </div>
    </div>
  </div>
    </>
  );
}

export default Footer;
