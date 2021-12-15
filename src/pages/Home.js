import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Body from "../components/LandingPage";

function Home() {
    const [search, setSearch] = useState("");

    const handleChange = (event) => {
      setSearch(event.target.value);
    }

    return (
        <div style={{ backgroundColor: " #f1f1f1" }}>
            <Header search={search} handleChange={handleChange} />
            <Body search={search}/>
            <Footer/>
        </div>
    );
  }
  
  export default Home;
  