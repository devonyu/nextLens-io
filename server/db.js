const { Client } = require('pg');
// Use TEST_DATABASE || DATABASE_URL for local dev || deployed state
const connectionString = process.env.TEST_DATABASE;
const client = new Client({
  connectionString,
});
client.connect();

const signUp = (params, callback) => {
  const { firstName, email, password, mount, about } = params;
  const query = `INSERT into users (firstName, email, password, mount, about) VALUES ('${firstName}', '${email}', '${password}', '${mount}', '${about}');`;
  client.query(query, (err, response) => {
    if (err) {
      callback(err);
    } else {
      callback(response);
    }
  });
};

const checkEmail = (email, callback) => {
  const query = `Select * from users where email = '${email}'`;
  client.query(query, (err, response) => {
    if (err) {
      callback(err);
    } else {
      callback(response);
    }
  });
};

const checkLogin = (params, callback) => {
  console.log('Checking if ', params.email, 'exists');
  const { email, password } = params;
  const query = `Select * from users where email = '${email}' and password = '${password}';`;
  console.log(query);
  client.query(query, (err, response) => {
    if (err) {
      console.log('Username or Password incorrect');
      callback({ status: false });
    } else {
      const userInformation = response.rows[0];
      console.log('database sending back: ', userInformation);
      if (userInformation === undefined) {
        callback({ status: false });
      } else {
        callback(userInformation);
      }
    }
  });
};

module.exports = {
  checkLogin,
  checkEmail,
  signUp,
};
