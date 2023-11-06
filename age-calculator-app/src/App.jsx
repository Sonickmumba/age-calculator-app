import { useEffect, useState } from "react";
import arrow from "./assets/images/icon-arrow.svg";
import "./App.css";

const App = () => {
  const [dateData, setDateData] = useState({
    day: 25,
    month: 8,
    year: 2021,
  });

  const [soni, setSoni] = useState({});
  
  const calculateAgeInDays = () => {
    const today = new Date();
    const birthDate = new Date(dateData.year, dateData.month - 1, dateData.day);
    // Calculate the difference in milliseconds
    const differenceInMilliseconds = today - birthDate;
    // Convert milliseconds to days
    const differenceInDays = Math.floor(
      differenceInMilliseconds / (1000 * 60 * 60 * 24)
    );
    // Calculate years, months, and days
    const years = Math.floor(differenceInDays / 365);
    const months = Math.floor((differenceInDays % 365) / 30);
    const days = differenceInDays % 30;
    setSoni({ day: days, month: months, year: years });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateAgeInDays();
  };

  const handleChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;

    if (
      name === "day" &&
      (parseInt(value, 10) > 31 || parseInt(value, 10) < 1)
    ) {
      document.getElementById("day").style.display = "block";
      e.target.style.border = "2px solid red";
    } else if (
      name === "month" &&
      (parseInt(value, 10) > 12 || parseInt(value, 10) < 1)
    ) {
      document.getElementById("month").style.display = "block";
      e.target.style.border = "2px solid red";
    } else if (
      name === "year" &&
      parseInt(value, 10) > new Date().getFullYear()
    ) {
      document.getElementById("year").style.display = "block";
      e.target.style.border = "2px solid red";
    } else {
      // No error, update state and hide error message
      setDateData({
        ...dateData,
        [name]: value,
      });
      e.target.style.border = "2px solid hsl(0, 0%, 86%)";
      document.getElementById("day").style.display = "none";
      document.getElementById("year").style.display = "none";
      document.getElementById("month").style.display = "none";
    }
  };

  useEffect(() => {
    if (dateData.year && dateData.month && dateData.day) {
      calculateAgeInDays();
    }
  }, []);

  return (
    <>
      <div className="cal-container">
        <form onSubmit={handleSubmit}>
          <div className="sonick">
            <label>
              {" "}
              Day{" "}
              <input name="day" value={dateData.day} onChange={handleChange} />
              <div id="day">Invalid date</div>
            </label>
            <label>
              {" "}
              Month{" "}
              <input
                name="month"
                value={dateData.month}
                onChange={handleChange}
              />{" "}
              <div id='month'>Invalid month</div>
            </label>
            <label>
              {" "}
              Year{" "}
              <input
                name="year"
                value={dateData.year}
                onChange={handleChange}
              />{" "}
              <div id="year">Invalid year</div>
            </label>
          </div>

          <div className="line-button">
            <div id="line"></div>
            <button type="submit" id="button">
              <img src={arrow} alt="arrow pic" />
            </button>
            <div id="line"></div>
          </div>
        </form>
        <div className="section-div">
          {soni.year !== 0 ? (
            <p>
              {soni.year} <span>years</span>
            </p>
          ) : null}
          {soni.month !== 0 ? (
            <p>
              {soni.month} <span>months</span>
            </p>
          ) : null}
          {soni.day !== 0 ? (
            <p>
              {soni.day} <span>days</span>
            </p>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default App;
