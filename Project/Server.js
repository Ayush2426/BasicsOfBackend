const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./Routes/userRoutes');
dotenv.config();
const cors = require('cors');
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT || 5040, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error('MongoDB connection error:', error);
});