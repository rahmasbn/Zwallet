import Link from "next/link";
import Image from "next/image";

import phone from "public/phone-icon.svg";
import phones from "public/phone2.svg";
import lock from "public/lock.svg";
import download from "public/download.svg";
import microsoft from "public/microsoft.svg";
import dropbox from "public/dropbox.svg";
import HnM from "public/hnm.svg";
import airbnb from "public/airbnb.svg";
import canon from "public/canon.svg";
import dell from "public/dell.svg";
import rightArrow from "public/right-arrow.svg";
import leftArrow from "public/left-arrow.svg";
import alex from "public/alex.png";

import Layout from "src/commons/components/Layout";
import styles from "src/commons/styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Layout title={"Zwallet"} />

      <main>
        <section className={`container-fluid ${styles.banner} ${styles.curve}`}>
          <div className="container min-vh-100 d-flex flex-column">
            <div className="d-flex flex-wrap justify-content-between position-static pt-5">
              <h4 className={`d-md-block d-none ${styles.brand}`}>Zwallet</h4>
              <div className="d-md-block justify-content-center ms-auto">
                <Link href={"/login"} passHref>
                  <a>
                    <button className={`btn me-4 ${styles.login}`}>
                      Login
                    </button>
                  </a>
                </Link>
                <Link href={"/register"} passHref>
                  <a>
                    <button className={`btn ${styles.register}`}>
                      Sign Up
                    </button>
                  </a>
                </Link>
              </div>
            </div>
            <div className="d-flex justify-content-center text-center">
              <div className="align-self-center">
                <h1 className={`text-light ${styles.display4}`}>
                  Awesome App <br /> For Saving Time.
                </h1>
                <p className={`pt-5 text-light ${styles.text}`}>
                  We bring you a mobile app for banking problems that
                  <br />
                  oftenly wasting much of your times.
                </p>
                <button
                  className={`btn btn-light py-2 px-4 mt-4 mb-5 ${styles["btn-try"]}`}
                >
                  Try It Free
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles["bg-lighter"]} min-vh-100`}>
          <div className="container py-5">
            <div className="pt-3">
              <h1 className={`text-center ${styles.title}`}>
                <span className={`${styles.span}`}>Why</span> Choose Zwallet?
              </h1>
              <p className={`pt-3 text-center ${styles.desc}`}>
                We have some great features from the application and it&apos;s
                totally free <br />
                to use by all users around the world.
              </p>
            </div>
            <div className="pt-5 mt-5">
              <div className="row">
                <div className="col-md text-center mb-3">
                  <div className={`card border-0 text-center ${styles.card}`}>
                    <div className="card-body p-4">
                      <div className={`mx-auto ${styles.icon}`}>
                        <Image
                          src={phone}
                          alt="phone icon"
                          layout="responsive"
                        />
                      </div>
                      <h5 className={`pt-3 ${styles.motto}`}>24/7 Support</h5>
                      <p className={`pt-4 ${styles.description}`}>
                        We have 24/7 contact support so you can contact us
                        whenever you want and we will respond it.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md text-center mb-3">
                  <div className={`card border-0 text-center ${styles.card}`}>
                    <div className="card-body p-4">
                      <div className={`mx-auto ${styles.icon}`}>
                        <Image src={lock} alt="lock icon" layout="responsive" />
                      </div>
                      <h5 className={`pt-3 ${styles.motto}`}>Data Privacy</h5>
                      <p className={`pt-4 ${styles.description}`}>
                        We make sure your data is safe in our database and we
                        will encrypt any data you submitted to us.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md text-center">
                  <div className={`card border-0 text-center ${styles.card}`}>
                    <div className="card-body p-4">
                      <div className={`mx-auto ${styles.icon}`}>
                        <Image
                          src={download}
                          alt="download icon"
                          layout="responsive"
                        />
                      </div>
                      <h5 className={`pt-3 ${styles.motto}`}>Easy Download</h5>
                      <p className={`pt-4 ${styles.description}`}>
                        Zwallet is 100% totally free to use it&apos;s now
                        available on Google Play Store and App Store.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className={`${styles["bg-darker"]} d-flex justify-content-center p-5`}
        >
          <div className="container">
            <div className="row">
              <div className="col-6 col-md-4 col-lg-2 img-fluid">
                <Image src={microsoft} alt="miscrosoft" />
              </div>
              <div className="col-6 col-md-4 col-lg-2 img-fluid">
                <Image src={dropbox} alt="dropbox" />
              </div>
              <div className="col-6 col-md-4 col-lg-2 img-fluid">
                <Image src={HnM} alt="HnM" />
              </div>
              <div className="col-6 col-md-4 col-lg-2 img-fluid">
                <Image src={airbnb} alt="airbnb" />
              </div>
              <div className="col-6 col-md-4 col-lg-2 img-fluid">
                <Image src={canon} alt="canon" />
              </div>
              <div className="col-6 col-md-4 col-lg-2 img-fluid">
                <Image src={dell} alt="dell" />
              </div>
            </div>
          </div>
        </section>

        <section className={`container-fluid py-5 ${styles["bg-lighter"]}`}>
          <div className="container d-flex py-5 justify-content-center">
            <h1 className={`${styles.amount}`}>Rp. 390.736.500</h1>
          </div>
          <h1 className={`text-center pt-3 ${styles.title}`}>
            <span className={`${styles.span}`}>Money </span>has Been Transfered.
          </h1>
          <p className={`text-center pt-3 ${styles.desc}`}>
            That amount of money has been transfered from all users. We still{" "}
            <br />
            counting and going strong!
          </p>
        </section>

        <section className={`${styles["bg-darker"]} h-100`}>
          <div className="row h-100 w-100 g-0">
            <div className={`col d-lg-block d-none ${styles.phones}`}>
              <Image
                src={phones}
                alt="phones"
                layout="responsive"
                width={250}
                height={270}
              />
            </div>
            <div className={`col d-flex justify-content-center text-md-left`}>
              <div className="align-self-center">
                <h1 className={`${styles.title} mt-4 pt-5 mb-5`}>
                  All The <span className={`${styles.span}`}>Great</span> <br />
                  Zwallet Features.
                </h1>
                <div className={`card ${styles.card}`}>
                  <div className={`card-body ${styles["card-body"]}`}>
                    <p className="fw-bold fs-5">
                      <span className="text-primary">1.</span> Small Fee
                    </p>
                    <span>
                      We only charge 5% of every success transaction done in
                      EZwallet app.
                    </span>
                  </div>
                </div>
                <div className={`card my-3 ${styles.card}`}>
                  <div className={`card-body ${styles["card-body"]}`}>
                    <p className="fw-bold fs-5">
                      <span className="text-primary">2.</span> Data Secured
                    </p>
                    <span>
                      All your data is secured properly in our system and
                      it&apos;s encrypted.
                    </span>
                  </div>
                </div>
                <div className={`card my-3 ${styles.card}`}>
                  <div className={`card-body ${styles["card-body"]}`}>
                    <p className="fw-bold fs-5">
                      <span className="text-primary">3.</span> User Friendly
                    </p>
                    <span>
                      Zwallet come up with modern and sleek design and not
                      complicated.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className={`container-fluid py-5 ${styles["bg-lighter"]} min-vh-100`}
        >
          <div className="container text-center">
            <h1 className={`${styles.title}`}>
              What Users are <span className={`${styles.span}`}>Saying.</span>
            </h1>
            <p className={`pt-3 text-center ${styles.desc}`}>
              We have some great features from the application and it&apos;s
              totally free <br />
              to use by all users around the world.
            </p>
          </div>
          <div className="row mb-3">
            <div className="col-2 mt-5 pt-5 d-none d-md-flex">
              <div className={`align-self-center`}>
                <Image
                  src={leftArrow}
                  alt="left arrow"
                  width={200}
                  height={150}
                />
              </div>
            </div>
            <div className="col">
              <div className={`card mt-4 border-0 ${styles.card}`}>
                <div className="card-body text-center">
                  <div className="py-3">
                    <Image
                      src={alex}
                      alt="Alex"
                      width={120}
                      height={120}
                      className={`${styles["img-testimoni"]}`}
                    />
                  </div>
                  <h4 className={`pt-3 ${styles.user}`}>Alex Hansinburg</h4>
                  <p className={`${styles.testimoni}`}>Designer</p>
                  <p className={`${styles.testimoni}`}>
                    “This is the most outstanding app that I’ve ever try in my
                    live, this app is such an amazing masterpiece and it’s
                    suitable for you who is bussy with their bussiness and must
                    transfer money to another person aut there. Just try this
                    app and see the power!”
                  </p>
                </div>
              </div>
            </div>
            <div className="col-2 mt-5 pt-5 d-none d-md-flex">
              <div className={`align-self-center`}>
                <Image
                  src={rightArrow}
                  alt="right arrow"
                  width={200}
                  height={150}
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className="container">
          <h1 className={`${styles["footer-title"]}`}>Zwallet</h1>
          <p className={`${styles["footer-desc"]} mt-4 mb-5`}>
            Simplify financial needs and saving <br />
            much time in banking needs with <br />
            one single app.
          </p>
          <hr className={styles.hr} />
          <div className="row">
            <p className={`col-lg-8 col-md-5 ${styles["footer-desc"]}`}>
              2020 Zwallet. All right reserved.
            </p>
            <p className={`col-lg-2 col-md-4 col-6 ${styles["footer-desc"]}`}>+62 5637 8882 9901</p>
            <p className={`col-lg-2 col-md-2 col-4 ${styles["footer-desc"]}`}>contact@zwallet.com</p>
          </div>
        </div>
      </footer>
    </>
  );
}
