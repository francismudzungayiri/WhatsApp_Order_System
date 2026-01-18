import { useEffect, useState } from "react";

const App = () => {
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/api/v1/status")
      .then((response) => response.json())
      .then((data) => setStatus(data.status))
      .catch((error) => console.error("Error fetching status:", error));
  }, []);

  return (
    <div>
      <h1>Welcome to the App!</h1>
      <p>Server Status: {status}</p>
    </div>
  );
};

export default App;
