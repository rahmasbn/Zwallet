import Image from "next/image";
import avatar from "public/avatar.jpg";
import styles from "src/commons/styles/Dashboard.module.css";

function TransactionCard(props) {
  const { fullName, amount, image, type } = props.data;
  const formatAmount = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(amount).replace(/(\.|,)00$/g, '');

  return (
    <>
      <div className={`d-flex ps-4 justify-content-between pb-0 mb-2`}>
        <div className="col-md-2">
          <div className={`${styles["img-wrapper"]}`}>
            <Image
              src={image !== null ? image : avatar}
              alt="user"
              layout="responsive"
              width={30}
              height={30}
              className={`${styles["img-user"]}`}
            />
          </div>
        </div>
        <div className="col-md-6 ms-2">
          <div className="align-self-center">
            <p className={`fw-bold ${styles.font}`}>{fullName}</p>
            <p className="text-muted">{type}</p>
          </div>
        </div>
        <div className="col-md-4">
          <p
            className={`mt-3 fw-bold ${styles.font} ${
              type === "accept" || type === "topup"
                ? "text-success"
                : "text-danger"
            }`}
          >
            {`${
              type === "accept" || type == "topup"
                ? `+${formatAmount}`
                : `-${formatAmount}`
            }`}
          </p>
        </div>
      </div>
    </>
  );
}

export default TransactionCard;
