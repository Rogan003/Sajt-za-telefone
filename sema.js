const mongoose = require('mongoose');

const sema = new mongoose.Schema({
    id: {
        type: Number
    },
    basicData: {
            link: {
                type: String
            },
            model: {
                type: String
            },
            brand: {
                type: String
            },
            phoneImage: {
                type: String
            },
            price: {
                type: String
            }
    },
    specs: {
            memory: {
                type: String
            },
            battery: {
                type: String
            },
            camera: {
                type: String
            }
    },
    review: [{
            reviewtext: [{
                heading: {
                    type: String
                },
                text: [{
                        type: String
                    }],
                picture: {
                    type: String
                },
                alt: {
                    type: String
                },
                caption: {
                    type: String
                }
            }],        
            reviewauthor: {
                type: String
            },
            dugme: {
                type: String
            },
            naziv: {
                type: String
            },
            reviewurl: {
                type: String
            }
    }],
    experiences: [{
        id: {
            type: Number
        },
        authorname: {
            type: String
        },
        rating: {
            type: Number
        },
        text: {
            type: String
        },
        likes: {
            type: Number
        },
        dislikes: {
            type: Number
        },
        comments: [{
            id: {
                type: Number
            },
            authorname: {
                type: String
            },
            text: {
                type: String
            }
        }]
    }]
});

mongoose.connect('mongodb://localhost/telefoni', {useNewUrlParser : true, useFindAndModify: false, useUnifiedTopology: true});

const konekcija = mongoose.connection;
konekcija.on('open', function(){
    console.log("RADIM!");
});

module.exports = mongoose.model('telefon', sema, 'telefoni');