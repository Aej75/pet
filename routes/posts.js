const express = require('express');

const router = express.Router();

const Post = require('../model/Post');



//Gets all the post

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (e) { res.json({ message: e }); }
});



//Sumbit a post
router.post('/', async (req, res) => {
    const post = new Posts({
        title: req.body.title,
        description: req.body.description,

    });

    try {
        const savedPost = await post.save();

        res.json(savedPost);
    } catch (e) {
        res.json({ message: e });
    }
});



//Get a specific post

router.get('/:postId', async (req, res) => {

    try {
        const post = await Post.findById(req.params.postId);
        res.json(post);
    } catch (e) {
        res.json({ message: e });
    }
});


//Delete Post
router.delete('/:postId', async (req, res) => {
    try {
        const removedPost = await Post.deleteOne({ _id: req.params.postId });
        res.json(removedPost);
    } catch (e) {
        res.json({ "message": e });
    }
});

//Update a post
router.patch(':/postId', async (req, res) => {
    try {
        const updatedPost = await Post.updateOne({ _id: req.params.postId },
            { $set: { title: req.body.title } });
        res.json(updatedPost);

    } catch (e) {
        res.json({ "message": e });
    }
});

module.exports = router;