const { User } = require("../schemas/user-schema");

class UserModel {
  async getUserByEmail(email) {
    const user = await User.findOne({ email });

    return user;
  }

  // async getUserRole()
}

const userModel = new UserModel();

module.exports = userModel;
