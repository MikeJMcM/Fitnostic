const express = require("express");
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import { workoutController } from '../Workouts/WorkoutController';
import { errorHandler } from '../middleware/ErrorMiddleware';
import { notFoundHandler } from '../middleware/NotFoundMiddleware';

dotenv.config();
const PORT = process.env.PORT || 3001;
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/api/plans", workoutController);

app.use(errorHandler);//must be after controllers
app.use(notFoundHandler);//404s not handled by errors so is last

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
