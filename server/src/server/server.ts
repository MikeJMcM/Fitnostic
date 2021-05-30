const express = require("express");
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import { workoutController } from '../Workouts/WorkoutController';

dotenv.config();
const PORT = process.env.PORT || 3001;
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/api/plans", workoutController);

app.get("/api", (_req: any, res: any) => {
  res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
