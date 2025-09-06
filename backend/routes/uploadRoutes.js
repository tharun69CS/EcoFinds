const express = require('express');
const path = require('path');
const upload = require('../middleware/upload');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/upload
// @desc    Upload product image
// @access  Private
router.post('/', protect, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please upload a file' });
    }

    res.status(200).json({
      success: true,
      data: {
        fileName: req.file.filename,
        filePath: `/uploads/${req.file.filename}`
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;