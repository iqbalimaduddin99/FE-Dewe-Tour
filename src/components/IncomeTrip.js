import { useHistory } from "react-router";
import CardContent from "./atoms/Card";

import { data } from "./atoms/FakeData";

function IncomeTrip() {
    const history = useHistory()
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <section>
          <p className="title-bold">Income Trip</p>
        </section>
        <section className="group-income">
          <button onClick={()=> history.push('/post')} className="nav-income">Add Trip </button>
        </section>
      </div>
      <div className="layout-card-income">
        {data.map((item, index) => (
          <CardContent item={item} number={index} />
        ))}
      </div>
    </div>
  );
}

export default IncomeTrip;
