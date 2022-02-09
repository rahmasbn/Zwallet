import styles from "src/commons/styles/Dashboard.module.css";
import Image from "next/image"
import graphic from "public/graphic.png"

function Graph() {
  return (
    <>
      <div className={`card shadow mb-3 border-0 ${styles.card}`}>
        <div className="card-body">
          <div className="container h-100">
            <div className="d-flex justify-content-between">
              <div className="income">
                <h5 className="mb-2 text-success fw-bold">
                  <span className="bi bi-arrow-down"></span>
                </h5>
                <p className="mb-2 text-muted">Income</p>
                <h5 className="fw-bold">Rp2.120.000</h5>
              </div>
              <div className="expense">
                <h5 className="mb-2 text-danger">
                 <span className="bi bi-arrow-up"></span>
                </h5>
                <p className="mb-2 text-muted">Expense</p>
                <h5 className="fw-bold">Rp1.560.000</h5>
              </div>
            </div>
            <div className="text-center">
              <div className="graphic mt-5">
                  <Image src={graphic} alt="graphic"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Graph;
