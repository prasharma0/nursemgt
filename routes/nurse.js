const { validateNurse, Nurse } = require('../models/Nurse');
const auth = require('../middlewares/auth');
const mongoose = require('mongoose');
const router = require('express').Router();
const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

//creating a contact

async function uploadImage(image) {
  try {
    const result = await cloudinary.v2.uploader.upload(image, {
      transformation: [
        { gravity: "face", height: 300, width: 200, crop: "crop" },
        { radius: "max" },
        { width: 150, crop: "scale" },
      ],
    });
    return result.secure_url;
  } catch (e) {
    return e;
  }
}

router.post('/nurse', auth, async (req, res) => {
  const { error } = validateNurse(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const { name, address, email, phone, image } = req.body;
  let imageUrl;
  if(image) {
    imageUrl = await uploadImage(image);
  }
  try {
    const newNurse = new Nurse({
      name,
      address,
      email,
      phone,
      image: imageUrl,
      postedBy: req.user._id,
    });
    const result = await newNurse.save();
    return res.status(201).json({ ...result._doc });
  } catch (err) {
    console.log(err);
  }
});
//fetching the list of Nurses.
router.get('/mynurses', auth, async (req, res) => {
  try {
    const mynurses = await Nurse.find().populate('postedBy', '-password');
    //console.log(mynurses)
    return res.status(200).json({ nurses: mynurses.reverse() });
  } catch (err) {
    console.log(err);
  }
});

//update or edit a nurse
router.put('/nurse', auth, async (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ error: 'no id specified.' });
  if (!mongoose.isValidObjectId(id))
    return res
      .status(400)
      .json({ error: 'please enter the valid id.' });
  try {
    const nurse = await Nurse.findOne({ _id: id });

    if (req.user._id.toString() !== nurse.postedBy._id.toString())
      return res
        .status(401)
        .json({ error: "you can't edit other's Nurse details !" });
    const updatedData = { ...req.body, id: undefined };

    const result = await Nurse.updateOne({ _id: id }, updatedData);
    return res.status(200).json({ ...nurse._doc });
  } catch (err) {
    console.log(err);
  }
});
//delete a nurse
router.delete('/delete/:id', auth, async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: 'no id specified.' });
  if (!mongoose.isValidObjectId(id))
    return res
      .status(400)
      .json({ error: 'please enter the valid id.' });
  try {
    const nurse = await Nurse.findOne({ _id: id.toString() });
    if (!nurse)
      return res.status(400).json({ error: 'no nurse found' });

    if (req.user._id.toString() !== contact.postedBy._id.toString())
      return res
        .status(401)
        .json({ error: "you can't delete other's nurse!" });
    const result = await Nurse.deleteOne({ _id: id });
    const mynurses = await Nurse.find({
      postedBy: req.user._id,
    }).populate('postedBy', '-password');

    return res
      .status(200)
      .json({ ...nurse._doc, mynurses: mynurses.reverse() });
  } catch (err) {
    console.log(err);
  }
});
//getting a single nurse
router.get('/nurse/:id', auth, async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(400).json({ error: 'no id specified.' });

  if (!mongoose.isValidObjectId(id))
    return res
      .status(400)
      .json({ error: 'please enter the valid id.' });
  try {
    const nurse = await Nurse.findById({ _id: id });
    return res.status(200).json({ ...nurse._doc });
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
