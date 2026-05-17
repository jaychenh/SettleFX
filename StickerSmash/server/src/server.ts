import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});

//I would have to go http://localhost:3000/rates to check if it works
app.get("/rates", async (req, res) => {
  try {
    const API_KEY = process.env.EXCHANGE_API_KEY;

    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`
    );

    const data = await response.json();

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch exchange rates" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

//this is the convergence of currency
app.post("/convert", async (req, res) => {
  try {
    const API_KEY = process.env.EXCHANGE_API_KEY;

    const { amount, from, to } = req.body;

    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${from}/${to}/${amount}`
    );

    const data = await response.json();

    res.json({
      result: `${amount} ${from} = ${data.conversion_result} ${to}`,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to convert currency" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});