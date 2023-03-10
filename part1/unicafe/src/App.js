import { useState } from "react";

const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad === 0) {
    return (
      <>
        <h2>Statistics</h2>
        <p>No feedback given</p>
      </>
    );
  }
  return (
    <>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <StatisticLine text="Good" value={good} />
          <StatisticLine text="Neutral" value={neutral} />
          <StatisticLine text="Bad" value={bad} />
          <StatisticLine text="All" value={good + neutral + bad} />
          <StatisticLine
            text="Average"
            value={(good - bad) / (good + neutral + bad)}
          />
          <StatisticLine
            text="Positive"
            value={`${(good * 100) / (good + neutral + bad)}%`}
          />
        </tbody>
      </table>
    </>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Button = ({ text, handleClick }) => {
  return <button onClick={() => handleClick(text)}>{text}</button>;
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClick = (feedback) => {
    if (feedback === "Good") {
      setGood(good + 1);
    } else if (feedback === "Neutral") {
      setNeutral(neutral + 1);
    } else {
      setBad(bad + 1);
    }
  };

  return (
    <div>
      <h1>Give Feeback</h1>
      <Button text="Good" handleClick={handleClick} />
      <Button text="Neutral" handleClick={handleClick} />
      <Button text="Bad" handleClick={handleClick} />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
