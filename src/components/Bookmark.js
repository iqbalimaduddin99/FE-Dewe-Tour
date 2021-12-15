import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { API } from "../config/api";
import { UserContext } from "../context/UserContext";
import AddCountry from "./atoms/AddCountry";
import CardContent from "./atoms/Card";

function IncomeTrip() {
  const [state] = useContext(UserContext);
  const [data, setData] = useState();
  const [Bookmarkbookmark, settingBookmark] = useState(false);
  // const getData = async () => {
  //   try {
  //   } catch (error) {}
  // };
  console.log(state.updating);
  useEffect(async () => {
    try {
      const response = await API.get("/bookmarks");
      console.log(response);
      if (response.data.message === "bookmark found") {
        settingBookmark(true)
      }
      setData(response.data.bookmark);
    } catch (error) {
      console.log(error.response);
    }
  },[state.updating])

  return (
    <div style={{ minHeight: "100vh" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <section>
          <p className="title-bold-income-trip">Bookmark</p>
        </section>
        <section className="group-income"></section>
      </div>
      <div className="layout-card-income">
        {data?.map((cards) => (
          <div>
            <CardContent cards={cards.trip} Bookmarkbookmark={Bookmarkbookmark} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default IncomeTrip;
