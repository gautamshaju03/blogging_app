const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectMongoDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI || `mongodb://localhost:27017/blogging-app`
        await mongoose.connect(mongoURI, {
        });
        console.log('Successfully connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1);
    }
};

module.exports = connectMongoDB;