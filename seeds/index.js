const mongoose = require('mongoose');
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground')

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/yelp-camp';

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error!"));
db.once("open", () => {
    console.log("Database connected!")
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
    await Campground.deleteMany({});
    for (let i = 0; i < 500; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '62869cc4a6af9fdfe2d06dbc',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [{
                    url: 'https://res.cloudinary.com/dxvt7jxrq/image/upload/v1654682129/oiag9skhojpq1k1ixatr.jpg',
                    filename: 'oiag9skhojpq1k1ixatr.jpg',
                },
                {
                    url: 'https://res.cloudinary.com/dxvt7jxrq/image/upload/v1653339503/s7kdzz7gyl3mh9hmfj1t.jpg',
                    filename: 's7kdzz7gyl3mh9hmfj1t.jpg',
                }
            ],
            // images: [],
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et quo maiores quidem vitae nihil magnam error cumque omnis sunt atque, delectus nobis dolor consequatur veritatis, corrupti sapiente necessitatibus dicta nulla veniam possimus facere. Accusantium maxime recusandae harum et eligendi.Praesentium earum esse sequi veritatis consectetur fuga, placeat in eius beatae!',
            price: price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            }
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});