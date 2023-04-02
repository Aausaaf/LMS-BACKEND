const Media = require("../Database/media");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname))
    }
  });

  const upload = multer({ storage: storage });

 const PostImage = async (req, res) => {
    // Create a new Media object with the name of the uploaded file
    const media = await Media({ file: req.file.filename });
  
    // Save the Media object to the database
    Media.save((err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error uploading file');
      } else {
        // Return the URL of the uploaded file
        res.send(`/uploads/${media._id}`);
      }
    });
  };

module.exports = {
    PostImage
}