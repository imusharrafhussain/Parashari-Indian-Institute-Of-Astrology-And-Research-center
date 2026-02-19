import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true
  },
  password: { // Using 'password' to match existing DB schema
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['student', 'admin', 'instructor'],
    default: 'student',
    index: true
  },
  active: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const userDbUri = process.env.USER_DB_URI;

console.log('Connecting to User DB...');
console.log('User DB URI:', userDbUri); // DEBUG
// Create a separate connection for the User database
const userConn = mongoose.createConnection(userDbUri);

userConn.on('connected', () => {
  console.log('✅ User DB connected successfully');
});

userConn.on('error', (err) => {
  console.error('❌ User DB connection error:', err);
});

export default userConn.model('User', userSchema);
