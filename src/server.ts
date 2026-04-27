import app from "./app";
import config from "./app/config";
import testDB from "./app/config/testDB";
import createTables from "./app/config/createTables";

const port = config.port || 5000;

if (process.env.NODE_ENV !== "production") {
  async function main() {
    await testDB();
    await createTables();

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  }

  main();
}

export default app;