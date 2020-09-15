const express = require("express");
const router = express.Router();
const db = require("../dbConnection");
const generateID = require("../middleware/generateId");

const initoptions = {
  schema: ["tem", "crm", "common", "pms"],
  capSQL: true,
};

const insertupdateTable = (type1, ...args) => {
  let tablename, obj, id;

  if (type1 == "UPDATE") {
    [tablename, obj, id] = [...args];
  }
  if (type1 == "INSERT") {
    [tablename, obj] = [...args];

  }

  let sql_values;
  let sql_insertupdate;

  obj_flds = Object.keys(obj);
  obj_vals = Object.values(obj);

  const n = Object.keys(obj).length;

  var i = 0;
  var stringArray1 = [];
  var stringArray2 = [];

  for (i = 2; i <= n + 1; i++) {
    const x = "$" + i + ":name";
    stringArray1.push(x);
  }

  var y = 2 + n;
  for (i = y; i < y + n; i++) {
    const x = "$" + i;
    stringArray2.push(x);
  }
  var z = y + n;
  const l = "$" + z;

  if (type1 === "INSERT") {
    sql_values = [tablename, ...obj_flds, ...obj_vals];

    sql_insertupdate = `insert into $1:name(${stringArray1}) values(${stringArray2}) returning id`;
  }

  if (type1 === "UPDATE") {
    sql_values = [tablename, ...obj_flds, ...obj_vals, id];
    sql_insertupdate = `update $1:name set(${stringArray1}) = (${stringArray2}) where id = ${l} returning id`;
  }
  return [sql_insertupdate, sql_values];
};

const dbquery = async (sql_insertupdate, sql_values, req, res) => {
  db.one(sql_insertupdate, sql_values)
    .then((data) => {
      if (req.params.tablename === "travel_requests") {
      }

      res.send({
        id: data.id,
        message: "Record added successfully in database",
      });
    })
    .catch((error) => {
      console.log("Error", error.message);
      res.status(500).send(error.message);
    });
};

router.post("/insert/:tablename", generateID, async (req, res) => {
  let type = "INSERT";

  req.body.created_by = req.email;
  req.body.last_modified_by = req.email;

  const [sql_insertupdate, sql_values] = await insertupdateTable(
    type,
    req.params.tablename,
    req.body
  );

  await dbquery(sql_insertupdate, sql_values, req, res);
});

module.exports = router;
