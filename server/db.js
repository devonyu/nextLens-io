const { Client } = require('pg');
// Use TEST_DATABASE || DATABASE_URL for local dev || deployed state
const connectionString = process.env.DATABASE_URL;
const client = new Client({
  connectionString,
});
client.connect();

const signUp = async (params) => {
  const { firstName, email, password, mount, about } = params;
  const query = `INSERT into users (email, firstName, password, mount, about) VALUES ('${email}', '${firstName}', '${password}', ${mount}, '${about}');`;
  try {
    const insertUser = await client.query(query);
    console.log('RESULT OF SIGNING UP USER=> ,', insertUser);
    return {status: true};
  } catch(err) {
    next(err);
  }
};

const checkEmail = async (email) => {
  const query = `Select * from users where email = '${email}'`;
  try {
    const userInformation = await client.query(query);
    return userInformation.rows[0];
  } catch(err) {
    next(err);
  }
};

const checkLogin = async (params) => {
  const { email, password } = params;
  const query = `Select * from users where email = '${email}' and password = '${password}';`;
  const loginResult = await client.query(query);
  if (!loginResult.rows[0]) {
    return ({status: false});
  } else {
    return loginResult.rows[0];
  }
};

module.exports = {
  checkLogin,
  checkEmail,
  signUp,
};
