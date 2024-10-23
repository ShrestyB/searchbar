const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/searchDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.log('Database connection error: ', err));

const ItemSchema = new mongoose.Schema({
    name: String,
    description: String,
});
const Item = mongoose.model('Item', ItemSchema);

app.get('/search', async (req, res) => {
    const query = req.query.q;
    try {
        const results = await Item.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } }
            ]
        });
        res.json(results);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching data', error: err });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
