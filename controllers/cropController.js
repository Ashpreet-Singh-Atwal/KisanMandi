const Crop = require("../models/Crop");
exports.listCrops = async (req, res) => {
    const crops = await Crop.find({ farmer: req.session.user._id }).sort({ createdAt: -1 });
    res.render("farmer/crops", { crops });
};

exports.addCropPage = (req, res) => {
    res.render("farmer/addCrop");
};

exports.addCrop = async (req, res) => {
    try {
        const { name, price, quantity, grade, location, status, category } = req.body;

        let imageUrl = null;
        if (req.file) {
            imageUrl = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
        }

        await Crop.create({
            farmer: req.session.user._id,
            name,
            price,
            quantity,
            grade,
            location,
            status,
            category,
            image: imageUrl
        });

        res.redirect("/farmer/crops");

    } catch (err) {
        console.log("Add Crop Error:", err);
        res.status(500).send("Error adding crop: " + err.message);
    }
};

exports.editCropPage = async (req, res) => {
    const crop = await Crop.findById(req.params.id);
    res.render("farmer/editCrop", { crop });
};

exports.updateCrop = async (req, res) => {
    try {
        const { name, price, quantity, grade, location, category, status } = req.body;

        let updateData = { name, price, quantity, grade, location, status, category };

        if (req.file) {
            updateData.image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
        }

        await Crop.findByIdAndUpdate(req.params.id, updateData);

        res.redirect("/farmer/crops");

    } catch (err) {
        console.log("Update Error:", err);
        res.status(500).send("Error updating crop: " + err.message);
    }
};

exports.deleteCrop = async (req, res) => {
    await Crop.findByIdAndDelete(req.params.id);
    res.redirect("/farmer/crops");
};
