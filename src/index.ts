// Load configuration from .env
require('now-env');

// Start server
import { app } from "./app";
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
