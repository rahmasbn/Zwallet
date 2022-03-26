import styles from "src/commons/styles/Dashboard.module.css";
import Image from "next/image";
import graphic from "public/graphic.png";
import { useSelector } from "react-redux";
import { getChart } from "src/modules/utils/transaction";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, Tooltip } from "recharts";
import { useDispatch } from "react-redux";
import { getChartAction } from "src/redux/actions/chart";
import LoadingComponent from "./LoadingComponent";

function Graph() {
  const user = useSelector((state) => state.auth.authUser);
  // const chart = useSelector((state) => state.chart.data);
  // const dispatch = useDispatch();
  const [chart, setChart] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  // const [listIncome, setListIncome] = useState([]);
  // const [listExpense, setListExpense] = useState([]);
  const formatIncome = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  })
    .format(chart.totalIncome)
    .replace(/(\.|,)00$/g, "");

  const formatExpense = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  })
    .format(chart.totalExpense)
    .replace(/(\.|,)00$/g, "");

  useEffect(() => {
    if (Object.keys(chart).length === 0) {
      setIsLoading(true);
      getChart(user.id, user.token)
        .then((res) => {
          setChart(res.data.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user, chart]);

  console.log("chart", chart);

  if (Object.keys(chart).length !== 0) {
    const data = [
      {
        name: "Sun",
        income: chart.listIncome[6].total,
        expense: chart.listExpense[6].total,
      },
      {
        name: "Mon",
        income: chart.listIncome[0].total,
        expense: chart.listExpense[0].total,
      },
      {
        name: "Tue",
        income: chart.listIncome[1].total,
        expense: chart.listExpense[1].total,
      },
      {
        name: "Wed",
        income: chart.listIncome[2].total,
        expense: chart.listExpense[2].total,
      },
      {
        name: "Thu",
        income: chart.listIncome[3].total,
        expense: chart.listExpense[3].total,
      },
      {
        name: "Fri",
        income: chart.listIncome[4].total,
        expense: chart.listExpense[4].total,
      },
      {
        name: "Sat",
        income: chart.listIncome[5].total,
        expense: chart.listExpense[5].total,
      },
    ];
  }

  return (
    <>
      <div className={`card shadow mb-3 border-0 ${styles.card}`}>
        <div className="card-body">
          <div className="container h-100">
            {!isLoading ? (
              <>
                <div className="d-flex justify-content-between">
                  <div className="income">
                    <h5 className="mb-2 text-success fw-bold">
                      <span className="bi bi-arrow-down fs-3"></span>
                    </h5>
                    <p className="mb-2 text-muted">Income</p>
                    <h5 className="fw-bold">{formatIncome}</h5>
                  </div>
                  <div className="expense">
                    <h5 className="mb-2 text-danger">
                      <span className="bi bi-arrow-up fs-3"></span>
                    </h5>
                    <p className="mb-2 text-muted">Expense</p>
                    <h5 className="fw-bold">{formatExpense}</h5>
                  </div>
                </div>
                <div className="text-center">
                  <div className="graphic mt-4 d-flex justify-content-center">
                    <BarChart
                      width={400}
                      height={300}
                      data={data}
                      margin={{
                        top: 5,
                        right: 15,
                        left: 5,
                        bottom: 5,
                      }}
                      barSize={15}
                      className={`${styles["bar-chart"]}`}
                    >
                      <XAxis
                        dataKey="name"
                        scale="point"
                        padding={{ left: 10, right: 10 }}
                      />

                      <Tooltip />
                      <Bar
                        dataKey="income"
                        fill="#6379f4"
                        background={{ fill: "#fff" }}
                      />
                      <Bar
                        dataKey="expense"
                        fill="#9DA6B5"
                        background={{ fill: "#fff" }}
                      />
                    </BarChart>
                  </div>
                </div>
              </>
            ) : (
              <LoadingComponent />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Graph;
