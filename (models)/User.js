import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
}, {
  timestamps: true,
});

// Function to connect to MongoDB
async function connectToDatabase() {
  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      throw new Error('MongoDB connection failed');
    }
  }
}

// Create or retrieve the model
const getUserModel = async () => {
  await connectToDatabase();
  return mongoose.models.User || mongoose.model('User', userSchema);
};

export default getUserModel;
