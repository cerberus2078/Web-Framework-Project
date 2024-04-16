// Find user by firstname function
const getByFirstName = async (userFirstName) => {
  try {
    const result = await User.findOne({ firstName: userFirstName });
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getByFirstName };
