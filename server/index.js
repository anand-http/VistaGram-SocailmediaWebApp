import app from './app.js';
import ConnectDb from './config/database.js';

import cloudinary from 'cloudinary';

const port = process.env.PORT || 6010;

ConnectDb();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.listen(process.env.PORT, () => {
    console.log("Server is running on port ", port);
})