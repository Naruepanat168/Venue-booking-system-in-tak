const fs = require('fs');
const ItemsSchema = require('../models/Items');

// สร้างหน้าโรงแรม
exports.createhotelPage = async (req, res) => {
    try {
        const { formData } = req.body;
        const file = req.file;

        let parsedData;
        try {
            parsedData = JSON.parse(formData);
        } catch (err) {
            console.log('Error parsing formData:', err);
            return res.status(400).json({ error: 'Invalid form data' });
        }

        if (!parsedData) {
            console.log('No formData found');
            return res.status(406).json({ error: 'Invalid form data' });
        }

        if (file) {
            parsedData.picture = file.filename;
        }

        const newItem = new ItemsSchema(parsedData);
        await newItem.save();

        res.json({ msg: 'Data saved successfully' });
    } catch (err) {
        console.error('Error saving data:', err);
        res.status(500).json({ error: 'An error occurred' });
    }
};

// แก้ไขหน้าโรงแรม
exports.editeHotelPage = async (req, res) => {
    try {
        const { formData } = req.body;
        const file = req.file;

        let parsedData;
        try {
            parsedData = JSON.parse(formData);
        } catch (err) {
            console.log('Error parsing formData:', err);
            return res.status(400).json({ error: 'Invalid form data' });
        }

        if (!parsedData) {
            console.log('No formData found');
            return res.status(406).json({ error: 'Invalid form data' });
        }

        const existingItem = await ItemsSchema.findById(parsedData._id);

        if (existingItem) {
            // อัปเดตข้อมูลที่มีอยู่
            if (file) {
                existingItem.picture = [...existingItem.picture, file.filename];
            }

            Object.keys(parsedData).forEach(key => {
                if (key !== 'picture') {
                    existingItem[key] = parsedData[key];
                }
            });

            await existingItem.save();
            res.json({ msg: 'Data updated successfully' });
        } else {
            // สร้างข้อมูลใหม่
            if (file) {
                parsedData.picture = [file.filename];
            } else {
                parsedData.picture = [];
            }
            const newItem = new ItemsSchema(parsedData);
            await newItem.save();

            res.json({ msg: 'Data saved successfully' });
        }
    } catch (err) {
        console.error('Error saving data:', err);
        res.status(500).json({ error: 'An error occurred' });
    }
};

// รายการข้อมูลโรงแรม
exports.listDataHotel = async (req, res) => {
    try {
        const { group } = req.body;
        const items = await ItemsSchema.findOne({ name: group });
        res.json(items);
    } catch (err) {
        console.error('Error listing data:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// ลบรูปภาพ
exports.removeImage = async (req, res) => {
    const { hotelName, picture } = req.body;

    try {
        const removedItem = await ItemsSchema.findOne({ hotelName });

        if (removedItem) {
            const imageIndex = removedItem.picture.indexOf(picture);

            if (imageIndex !== -1) {
                removedItem.picture.splice(imageIndex, 1);
                await removedItem.save();

                fs.unlink(`./uploads/${picture}`, (err) => {
                    if (err) {
                        console.log('Error deleting file:', err);
                    } else {
                        console.log('File deleted successfully');
                    }
                });

                res.json({ msg: 'Image removed successfully', item: removedItem });
            } else {
                res.status(404).json({ error: "Image not found in the item" });
            }
        } else {
            res.status(404).json({ error: "Item not found" });
        }
    } catch (err) {
        console.log('Error:', err);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.hotelAll = async (req, res) => {

    let  items = await ItemsSchema.find({});
    console.log(items);
    
    res.json( items );
}