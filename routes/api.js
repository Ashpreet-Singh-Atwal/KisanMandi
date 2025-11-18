// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');
// const Crop = require('../models/Crop');

// router.post('/register', async (req, res) => {
//   try {
//     const { name, phone, password, role } = req.body;
//     if (!name || !phone || !password || !role) return res.status(400).json({ message: 'Missing fields' });
//     const exists = await User.findOne({ phone });
//     if (exists) return res.status(400).json({ message: 'Phone already registered' });
//     const user = new User({ name, phone, password, role });
//     await user.save();
//     res.json({ message: 'Registered' });
//   } catch (e) { res.status(500).json({ message: e.message }); }
// });

// router.post('/login', async (req, res) => {
//   try {
//     const { phone, password, role } = req.body;
//     const user = await User.findOne({ phone, role });
//     if (!user) return res.status(400).json({ message: 'Invalid credentials' });
//     const ok = await user.comparePassword(password);
//     if (!ok) return res.status(400).json({ message: 'Invalid credentials' });
//     req.session.user = { id: user._id, name: user.name, phone: user.phone, role: user.role };
//     res.json({ message: 'Logged in', redirect: role === 'farmer' ? '/farmer/dashboard' : '/buyer/dashboard' });
//   } catch (e) { res.status(500).json({ message: e.message }); }
// });

// router.get('/crops', async (req,res) => {
//   const q = req.query.q || '';
//   const crops = await Crop.find({ name: new RegExp(q, 'i'), status: 'active' }).limit(50).populate('farmer');
//   res.json(crops);
// });

// module.exports = router;
