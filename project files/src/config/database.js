import mongoose from 'mongoose';

// MongoDB Atlas connection string
const MONGODB_URI = process.env.MONGODB_URI || 
  process.env.REACT_APP_MONGODB_URI || 
  'mongodb+srv://username:password@cluster0.mongodb.net/shopez?retryWrites=true&w=majority';

export const connectDB = async () => {
  try {
    // MongoDB connection options for Atlas
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      family: 4, // Use IPv4, skip trying IPv6
      bufferCommands: false, // Disable mongoose buffering
      bufferMaxEntries: 0, // Disable mongoose buffering
    };

    const conn = await mongoose.connect(MONGODB_URI, options);
    
    console.log(`MongoDB Atlas Connected: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);
    
    // Handle connection events
    mongoose.connection.on('connected', () => {
      console.log('Mongoose connected to MongoDB Atlas');
    });

    mongoose.connection.on('error', (err) => {
      console.error('Mongoose connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('Mongoose disconnected from MongoDB Atlas');
    });

    // Handle application termination
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('MongoDB Atlas connection closed through app termination');
      process.exit(0);
    });

    return conn;
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
    
    // Provide helpful error messages
    if (error.message.includes('authentication failed')) {
      console.error('Authentication failed. Please check your username and password.');
    } else if (error.message.includes('network timeout')) {
      console.error('Network timeout. Please check your internet connection and MongoDB Atlas network access settings.');
    } else if (error.message.includes('ENOTFOUND')) {
      console.error('DNS resolution failed. Please check your connection string.');
    }
    
    process.exit(1);
  }
};

// Connection state helper
export const getConnectionState = () => {
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };
  return states[mongoose.connection.readyState];
};

export default mongoose;