import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { API } from "../config/api";
import AddCountry from "./atoms/AddCountry";
import CardContent from "./atoms/Card";

function IncomeTrip() {
  const [show, setShow] = useState(false);
  const history = useHistory();
  const [data, setData] = useState();
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      const response = await API.get("/trips");

      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCountry = () => {
    setShow(true);
  };
  return (
    <div style={{ minHeight: "100vh" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <section>
          <p className="title-bold-income-trip">Trip</p>
        </section>
        <section className="group-income">
          <button
            onClick={() => history.push("/post")}
            className="nav-income"
            style={{ marginRight: "20px" }}
          >
            Add Trip{" "}
          </button>
          <button onClick={handleCountry} className="nav-income">
            Add Country{" "}
          </button>
          <AddCountry show={show} setShow={setShow} />
        </section>
      </div>
      <div className="layout-card-income">
        {data?.map((cards) => (
          <div>
            <CardContent cards={cards} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default IncomeTrip;
