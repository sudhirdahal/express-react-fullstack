const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config();

const PORT = process.env.PORT || 3000;
const DB = process.env.DATABASE_URL;

mongoose.connect(DB).then(() => {
    console.log('✅ DB connection successful!');
}).catch(err => console.log('❌ DB connection error:', err));

app.listen(PORT, () => {
    console.log(`🚀 Server is flying on http://localhost:${PORT}`);
});
