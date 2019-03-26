const router = require('express').Router();
const knex = require('knex'); // Step 1: Bring in the library

const knexConfig = { // Step 2: Configure the knexjs library being used
  client: 'sqlite3', // this is the driver
  useNullAsDefault: true,
  connection: {
    filename: './Data/roles.db3' // this is the relative path to the db file
  },
};

const db = knex(knexConfig); // Step 3: Set the 'knex(knexConfig)' to a variable called 'db'

router.get('/', (req, res) => {
  // Step 4: Use the proper syntax from knexjs.org to select and return all records
  // returns a promise that resolves to all records in the table
  db('roles').then(roles => {
    res.status(200).json(roles);
  })
  .catch(error => {
    res.status(500).json(error);
  });
});

router.get('/:id', (req, res) => {
  // retrieve a role by id
  res.send('Write code to retrieve a role by id');
});

router.post('/', (req, res) => {
  // add a role to the database
  res.send('Write code to add a role');
});

router.put('/:id', (req, res) => {
  // update roles
  res.send('Write code to modify a role');
});

router.delete('/:id', (req, res) => {
  // remove roles (inactivate the role)
  res.send('Write code to remove a role');
});

module.exports = router;
