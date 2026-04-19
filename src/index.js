import express from "express";
import hbs from "hbs";
import path from "path";

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

// --- Helper ---
function enrichBike(bike) {
  const kmSince = bike.currentOdometer - bike.lastOilChangeOdometer;
  const kmLeft = bike.oilChangeIntervalKm - kmSince;
  const pct = Math.min(100, Math.round((kmSince / bike.oilChangeIntervalKm) * 100));

  const status = kmLeft <= 0 ? "overdue" : kmLeft <= 500 ? "warning" : "good";

  const statusClass = {
    good: "text-green-400 border-green-800 bg-green-900/30",
    warning: "text-amber-400 border-amber-800 bg-amber-900/30",
    overdue: "text-red-400 border-red-800 bg-red-900/30",
  }[status];

  const accentColor = {
    good: "#639922",
    warning: "#EF9F27",
    overdue: "#E24B4A",
  }[status];

  const progressHintClass = {
    good: "text-green-400",
    warning: "text-amber-400",
    overdue: "text-red-400",
  }[status];

  const progressHint = kmLeft <= 0
    ? `+${Math.abs(kmLeft).toLocaleString()} km overdue`
    : `${kmLeft.toLocaleString()} km left`;

  return {
    ...bike,
    currentOdometer: bike.currentOdometer.toLocaleString(),
    status,
    statusClass,
    accentColor,
    progressHint,
    progressHintClass,
    progressPct: pct,
  };
}

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