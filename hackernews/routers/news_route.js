const News = require("../models/newsschema");
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.post("/createnews", auth, async (req,res) =>
{
try {
    const news = new News({
        title : req.body.title,
        date : req.body.date
    });
    console.log(req.body);
    res.json(news);
    await news.save();
} catch (error) {
    res.send(error);
}
});

router.get('/readnews',async (req, res) => {
try {
    const news = await News.find({});
    res.json(news);
} catch (error) {
    res.send(error);
}
});

router.patch('/updatenews/:id',auth, async(req, res) => {
    try {
        const news =  await News.findOneAndUpdate({_id: req.params.id} , req.body);
        const updated = await News.findById({_id:req.params.id});
        console.log(req.user.name);
        res.json(updated);
        news.save();
    } catch (error) {
        res.send(error);
    }
});

router.delete('/deletenews/:id',auth, async(req, res) => {
    try {
        const news = await News.findOneAndRemove({_id: req.params.id});
        res.json(news);
    } catch (error) {
        res.send(error);
    }
});

module.exports = router;