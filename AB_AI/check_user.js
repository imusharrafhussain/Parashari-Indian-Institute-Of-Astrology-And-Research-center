const mongoose = require('mongoose');

const uri = "mongodb+srv://astrobharat364_db_user:l7NZmx4TUtiIxDgj@webapps-parent-cluster.ni4dekn.mongodb.net/webapp_parashari?appName=webapps-parent-cluster";

mongoose.connect(uri)
  .then(async () => {
    console.log("Connected to MongoDB.");
    
    // Create a temporary schema to query users
    const userSchema = new mongoose.Schema({}, { strict: false });
    const User = mongoose.model('User', userSchema, 'users');

    const allUsers = await User.find({});
    console.log("Total users in this DB:", allUsers.length);
    allUsers.forEach(u => console.log("- " + u.get('email')));
    
    process.exit(0);
  })
  .catch(err => {
    console.error("Connection error:", err);
    process.exit(1);
  });
