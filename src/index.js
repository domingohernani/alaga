import express from "express";
import hbs from "hbs";
import path from "path";
import enrichBike from "./helpers/enrichBike.js";

const app = express();
const __dirname = import.meta.dirname;

app.use(express.static(path.join(__dirname, "../public")));
hbs.registerPartials(path.join(__dirname, "views/partials"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

// --- Mock Data ---
const motorbikes = [
  {
    id: "bike-001",
    brand: "Honda",
    model: "Click 125i",
    year: 2022,
    plateNumber: "ABC 1234",
    currentOdometer: 14820,
    lastOilChangeOdometer: 11500,
    oilChangeIntervalKm: 3000,
  },
  {
    id: "bike-002",
    brand: "Yamaha",
    model: "NMAX 155",
    year: 2023,
    plateNumber: "XYZ 5678",
    currentOdometer: 8340,
    lastOilChangeOdometer: 7200,
    oilChangeIntervalKm: 3000,
  },
  {
    id: "bike-003",
    brand: "Suzuki",
    model: "Raider R150",
    year: 2021,
    plateNumber: "DEF 9012",
    currentOdometer: 22100,
    lastOilChangeOdometer: 21500,
    oilChangeIntervalKm: 3000,
  },
];


app.get("/", (req, res) => {
  const bikes = motorbikes.map(enrichBike);

  const stats = {
    total: bikes.length,
    good: bikes.filter(b => b.status === "good").length,
    warning: bikes.filter(b => b.status === "warning").length,
    overdue: bikes.filter(b => b.status === "overdue").length,
  };

  res.render("dashboard", { bikes, stats });
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Alaga running at http://localhost:${PORT}`);
});