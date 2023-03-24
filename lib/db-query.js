const { Client } = require("pg");

const logQuery = (statement, ...parameters) => {
  let rawTimeStamp = new Date();
  let timeStamp = rawTimeStamp.toString().substring(4, 24);

  let timeArray = timeStamp.split(" ");
  let timeParts = {
    month: timeArray[0],
    day: timeArray[1],
    year: timeArray[2],
    time: timeArray[3],
  };

  let formattedTimeStamp = `[${timeParts.month}/${timeParts.day}/` +
  `${timeParts.year}:${timeParts.time}]`;
  
  console.log(formattedTimeStamp, statement, parameters);
};

module.exports = {
  async dbQuery(statement, ...parameters) {
    let client = new Client({
      database: "todo-lists",
      user: "al6207",
      host: "/var/run/postgresql",
      port: 5432,
    });

    await client.connect();
    logQuery(statement, ...parameters);
    let result = await client.query(statement, parameters);
    await client.end();

    return result;
  }
}