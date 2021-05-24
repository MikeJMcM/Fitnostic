const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/api", (_req: any, res: any) => {
  res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
