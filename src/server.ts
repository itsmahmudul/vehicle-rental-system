import app from "./app";
import config from "./app/config";
import testDB from "./app/config/testDB";
import createTables from "./app/config/createTables";   

const port = config.port || 5000;

async function main() {
  await testDB();
  await createTables();

  app.listen(port, () => {
    console.log(`Vehicle Rental System app running on port ${port}`);
  });
}

main();
