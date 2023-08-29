const mongoose = require("mongoose");
const User = require('./models/User');

mongoose.connect('mongodb+srv://blog:vzOjYAFFQIeKhgsV@cluster0.j1hv8d3.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

async function addFavoriteBlogs(userId, favBlogs) {
  try {
    const user = await User.findById({ _id: userId  });
    console.log(user);
    user.bookmarks.push(...favBlogs); // Set bookmarks to an empty array if not already present
    await user.save();

    console.log(`favorite blog added for user ${user.username}`);
  } catch (error) {
    console.error("Error during data migration:", error);
  } finally {
    mongoose.disconnect();
  }
}
module.exports = AddFavBlog;
