const { Contact } = require("../models/Contacts");

const query = async (q) => {
  return Contact.find({
    $or: [
      {
        firstName,
      },
      {
        lastName,
      },
      {
        phoneNumber,
      },
    ],
  }).select("firstName lastName phoneNumber");
};
module.exports = { query };
