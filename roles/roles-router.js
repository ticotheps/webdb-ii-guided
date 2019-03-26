const router = require("express").Router();
const knex = require("knex"); // Step 1: Bring in the library

const knexConfig = {
  // Step 2: Configure the knexjs library being used
  client: "sqlite3", // this is the driver
  useNullAsDefault: true,
  connection: {
    filename: "./data/roles.db3" // this is the relative path to the db file
  },
  debug: true
};

const db = knex(knexConfig); // Step 3: Set the 'knex(knexConfig)' to a variable called 'db'

router.get("/", (req, res) => {
  // Step 4: Use the proper syntax from knexjs.org to select and return all records
  // returns a promise that resolves to all records in the table
  db("roles")
    .then(roles => {
      res.status(200).json(roles);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get("/:id", (req, res) => {
  const roleId = req.params.id;
  // const { id } = req.params;

  // retrieve a role by id
  db("roles")
    .where({ id: roleId })
    .first() // this makes sure that we're only grabbing the FIRST element that matches our conditions
    .then(role => {
      res.status(200).json(role);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post("/", (req, res) => {
  // get back an array with the last id generated: [ 3 ]
  db("roles")
    .insert(req.body)
    .then(ids => {
      const id = ids[0];

      db("roles")
        .where({ id })
        .first() // this makes sure that we're only grabbing the FIRST element that matches our conditions
        .then(role => {
          res.status(201).json(role);
        });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.put("/:id", (req, res) => {
  db("roles")
    .where({ id: req.params.id })
    .update(req.body)
    .then(count => {
      if (count > 0) {
        res.status(200).json(count);
      } else {
        res.status(404).json({ message: "Record not found" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.delete("/:id", (req, res) => {
  db("roles")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if (count > 0) {
        res.status(204).json(count);
      } else {
        res.status(404).json({ message: "Record not found" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
