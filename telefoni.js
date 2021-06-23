const express = require('express');
const model = require('./sema');
const router = express.Router();

router.get('/', async function(req, res) {
    try {
        const telefoni = await model.find();
        res.json(telefoni);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.get('/:id', async function(req, res) {
    try {
        const telefon = await model.findById(req.params.id);
        res.json(telefon);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.post('/', async function(req, res) {
    const telefon = new model({
        id: req.body.id,
        basicData: req.body.basicData,
        specs: req.body.specs,
        review: req.body.review,
        experiences: req.body.experiences
    })
    try {
        const tel = await telefon.save();
        res.status(201).json(tel);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

router.post('/:id/submit',async function(req,res){
    const iskustvo = {
        id: Math.floor(Math.random() * 10000),
        authorname: req.body.ime,
        rating: req.body.ocena,
        text: req.body.komentar,
        likes: 0,
        dislikes: 0,
        comments: []
    }
    if(iskustvo.authorname != null && iskustvo.rating != null && iskustvo.text != null)
    {
        await model.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        {
            $push: 
           {
               experiences: iskustvo,
           }
       }
       );
        res.sendStatus(200);
    }
});

router.post('/odg/:id', async function(req,res){
    const odgovor = {
        id: Math.floor(Math.random() * 1000),
        authorname: req.body.naziv,
        text: req.body.odgovor
    }
    if(odgovor.authorname != null && odgovor.text != null)
    {
        try
        {
            const telefon = await model.findById(req.params.id);
            telefon.experiences[req.body.indeks].comments.push(odgovor);
            await telefon.save();
            res.sendStatus(200);
        }
        catch(error)
        {
            console.log("Greska: " + error);
            res.status(500).json({ message: error.message});
        }
    }
});

router.patch('/lajkovanje/:id', async function(req, res) {
    try {
        const telefon = await model.findById(req.params.id);
        telefon.experiences[req.body.indeks].likes += 1;
        const tel = await telefon.save();
        res.json(tel);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
});

router.patch('/dislajkovanje/:id', async function(req, res) {
    try {
        const telefon = await model.findById(req.params.id);
        telefon.experiences[req.body.indeks].dislikes += 1;
        const tel = await telefon.save();
        res.json(tel);
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
});

router.delete('/:id', async function(req, res) {
    const telefon = await model.findById(req.params.id);
    try {
        await res.telefon.remove()
        res.json({message: 'Obrisan telefon'})
    } catch (error){
        res.status(500).json({ message: error.message})
    }
});

module.exports = router;