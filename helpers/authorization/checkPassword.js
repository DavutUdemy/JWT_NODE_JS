const bcrypt = require("bcryptjs");
const checkPassword = (password,hashedPassword) => {

    return bcrypt.compareSync(password, hashedPassword);

}
module.exports  ={checkPassword}