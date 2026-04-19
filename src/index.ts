import express, { type Request, type Response } from "express";
import hbs from "hbs";
import path from "path";

const app = express();

const __dirname = import.meta.dirname;

// Allow static files to be served
app.use(express.static(path.join(__dirname, "../public")));

// Registering partials
hbs.registerPartials(path.join(__dirname, "views/partials"));

// Middlewares
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.get("/", (req: Request, res: Response) => {
  res.render("dashboard");
});

const PORT: number = 8080;
app.listen(PORT, () => {
  console.log(`Alaga is running listening on port ${PORT}`);
});
