const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const uri = "mongodb+srv://astrobharat364_db_user:l7NZmx4TUtiIxDgj@webapps-parent-cluster.ni4dekn.mongodb.net/webapp_parashari?appName=webapps-parent-cluster";

// Use the local model path since we are running inside the AB_AI folder
const User = require('./models/User');

mongoose.connect(uri)
  .then(async () => {
    console.log("Connected to MongoDB.");
    
    const email = "perveznaik01@gmail.com";
    const plainPassword = "Password@123";

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        console.log("User already exists!");
        process.exit(0);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);

    const user = new User({
        name: "Pervez Naik",
        email: email,
        password: hashedPassword,
        contact: "1234567890",
        program: "Test Program",
        role: "student",
        emailVerified: true
    });

    await user.save();
    console.log("Created test user:", email);
    
    process.exit(0);
  })
  .catch(err => {
    console.error("error:", err);
    process.exit(1);
  });
