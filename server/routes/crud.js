const express = require('express')
const router = express.Router();

const {auth} = require('../middleware/auth')
const {upload} = require('../middleware/uploadFile');
const { createhotelPage, listDataHotel, editeHotelPage, removeImage, hotelAll } = require('../controller/hotelPage');

router.get('/listAllProduct',auth, )
router.get('/person/:id',auth,)
router.get('/person/:id',auth,)
router.get('/hotelAll',hotelAll )
router.post('/createhotel',auth,upload,createhotelPage);
router.post('/editeHotelPage',auth,upload,editeHotelPage);
router.post('/listDataHotel',auth,listDataHotel);
router.post('/removeImage',auth,removeImage);
router.put('/person/:id',auth,upload,);
router.delete('/person/:id',auth,);

module.exports = router

