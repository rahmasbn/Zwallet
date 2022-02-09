import Image from "next/image";
import Link from "next/link";
import styles from "src/commons/styles/Starter.module.css";
import phone from "public/phone.svg";
import zwallet from "public/zwallet.svg";

function StarterLeft() {
  return (
    <>
      <section
        className={`d-md-block d-none col-md-6 col-lg-7 ${styles["left-side"]} ${styles.curve}`}
      >
        <div className="row align-middle h-100">
          <div className="col-lg-9 mx-auto px-5 mt-5">
            <Link href={"/"}>
              <a>
                <Image src={zwallet} alt="logo" />
              </a>
            </Link>
          </div>
          <div className="mx-auto mb-0">
            <div className={`${styles["img-wrapper"]}`}>
              <Image
                src={phone}
                alt="phone"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
          <div className="col-lg-9 mx-auto px-5">
            <p className={`${styles.title}`}>App that Covering Banking Needs</p>
            <p className={`${styles.description}`}>
              Zwallet is an application that focussing in banking needs for all
              users in the world. Always updated and always following world
              trends. 5000+ users registered in Zwallet everyday with worldwide
              users coverage.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default StarterLeft;
