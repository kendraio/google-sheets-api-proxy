// Load configuration from .env
import * as dotenv from "dotenv";
dotenv.config({path: ".env"});

// Start server
import { app } from "./app";
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
