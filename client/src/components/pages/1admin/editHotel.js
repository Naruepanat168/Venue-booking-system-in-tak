import React, { useState, useRef, useEffect } from 'react';
import AdminMenu from '../../layouts/adminMenu';
import { Carousel, Input, Form, Button, Upload, message } from 'antd';
import { LeftOutlined, RightOutlined, UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import { editHotelPage, listDataHotel, removeImage } from '../../functions/hotelPages';
import { useSelector } from 'react-redux';

function EditHotel() {
    const [activeTab, setActiveTab] = useState('page0');
    const carouselRef = useRef(null);
    const user = useSelector(state => state.user);
    const [images, setImages] = useState([]);
    const [formData, setFormData] = useState({});

    const fetchHotelData = () => {
        listDataHotel(user.token, user.name)
            .then((res) => {
                if (Array.isArray(res.picture)) {
                    const imageObjects = res.picture.map(pic => ({ url: `${process.env.REACT_APP_IMG}/${pic}` }));
                    setImages(imageObjects);
                }
                setFormData(prevFormData => ({
                    ...prevFormData,
                    ...res
                }));
            })
            .catch((err) => {
                console.log(err);
                message.error('Failed to load hotel data');
            });
    };

    useEffect(() => {
        fetchHotelData();
    }, [user.token, user.name]);

    const handleTabClick = (page, event) => {
        event.preventDefault();
        setActiveTab(page);
    };

    const next = () => carouselRef.current.next();
    const prev = () => carouselRef.current.prev();

    const handleImageChange = (index, value) => {
        const newImages = [...images];
        newImages[index].url = value;
        setImages(newImages);
    };

    const handleFormDataChange = (key, value) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [key]: value
        }));
    };

    const handleAddImage = (file) => {
        const formDataToSend = new FormData();
        formDataToSend.append('file', file);
        formDataToSend.append('formData', JSON.stringify(formData));
        editHotelPage(formDataToSend, user.token)
            .then((res) => {
                message.success('Image uploaded successfully');
                fetchHotelData(); // Refresh data after upload
            })
            .catch((err) => {
                console.log(err);
                message.error('Failed to upload image');
            });
        return false;
    };

    const handleRemoveImage = (index) => {
        const remove = {
            hotelName: formData.hotelName,
            picture: formData.picture[index]
        };
        removeImage(remove, user.token)
            .then((res) => {
                message.success('Image removed successfully');
                fetchHotelData(); // Refresh data after removal
            })
            .catch((err) => {
                console.log(err);
                message.error('Failed to remove image');
            });
    };

    const handleSaveChanges = () => {
        const formDataToSend = new FormData();
        formDataToSend.append('formData', JSON.stringify(formData));
        editHotelPage(formDataToSend, user.token)
            .then((res) => {
                message.success('Changes saved successfully');
            })
            .catch((err) => {
                console.log(err);
                message.error('Failed to save changes');
            });
    };

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-2 d-none d-md-block'>
                    <AdminMenu />
                </div>
                <div className='col-12 col-md-10'>
                    <div className="card text-center" style={{ width: '50vw', padding: 'auto', margin: 'auto' }}>
                        <div className="card-header">
                            <ul className="nav nav-tabs card-header-tabs">
                                <li className="nav-item">
                                    <a
                                        href="#page0"
                                        className={`nav-link ${activeTab === 'page0' ? 'active' : ''}`}
                                        onClick={(event) => handleTabClick('page0', event)}
                                        aria-current={activeTab === 'page0' ? 'page' : undefined}
                                    >
                                        สถานที่
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        href="#page1"
                                        className={`nav-link ${activeTab === 'page1' ? 'active' : ''}`}
                                        onClick={(event) => handleTabClick('page1', event)}
                                        aria-current={activeTab === 'page1' ? 'page' : undefined}
                                    >
                                        รายละเอียด
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        href="#page2"
                                        className={`nav-link ${activeTab === 'page2' ? 'active' : ''}`}
                                        onClick={(event) => handleTabClick('page2', event)}
                                        aria-current={activeTab === 'page2' ? 'page' : undefined}
                                    >
                                        ติดต่อ
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="card-body">
                            {activeTab === 'page0' && (
                                <>
                                    <h5 className="card-title">เพิ่มรูปภาพ</h5>
                                    <div className="carousel-container" style={{ position: 'relative', maxWidth: '40vw', margin: 'auto' }}>
                                        <Carousel autoplay ref={carouselRef}>
                                            {images.map((image, index) => (
                                                <div key={index}>
                                                    <img
                                                        src={image.url}
                                                        alt={`Slide ${index + 1}`}
                                                        style={{ width: '100%', maxHeight: '60vh', objectFit: 'contain' }}
                                                    />
                                                    <Form.Item>
                                                        <Input
                                                            value={image.url}
                                                            onChange={(e) => handleImageChange(index, e.target.value)}
                                                            placeholder="Enter image URL"
                                                        />
                                                        <Button
                                                            type="danger"
                                                            icon={<DeleteOutlined />}
                                                            onClick={() => handleRemoveImage(index)}
                                                            style={{ marginTop: '10px' }}
                                                        >
                                                            ลบรูปภาพ
                                                        </Button>
                                                    </Form.Item>
                                                </div>
                                            ))}
                                        </Carousel>
                                        <Upload
                                            beforeUpload={handleAddImage}
                                            showUploadList={false}
                                        >
                                            <Button icon={<UploadOutlined />} style={{ marginTop: '10px' }}>
                                                เพิ่มรูปภาพ
                                            </Button>
                                        </Upload>
                                        <LeftOutlined
                                            onClick={prev}
                                            style={{
                                                position: 'absolute',
                                                top: '50%',
                                                left: '10px',
                                                transform: 'translateY(-50%)',
                                                fontSize: '30px',
                                                color: 'rgba(255, 255, 255, 0.8)',
                                                cursor: 'pointer',
                                                zIndex: 999,
                                                padding: '5px'
                                            }}
                                        />
                                        <RightOutlined
                                            onClick={next}
                                            style={{
                                                position: 'absolute',
                                                top: '50%',
                                                right: '10px',
                                                transform: 'translateY(-50%)',
                                                fontSize: '30px',
                                                color: 'rgba(255, 255, 255, 0.8)',
                                                cursor: 'pointer',
                                                zIndex: 999,
                                                padding: '5px'
                                            }}
                                        />
                                    </div>
                                </>
                            )}
                            {activeTab === 'page1' && (
                                <>
                                    <h5 className="card-title">แก้ไขรายละเอียด</h5>
                                    <Form>
                                        <Form.Item>
                                            <Input.TextArea
                                                value={formData.details}
                                                onChange={(e) => handleFormDataChange('details', e.target.value)}
                                                placeholder="Enter details"
                                            />
                                        </Form.Item>
                                    </Form>
                                </>
                            )}
                            {activeTab === 'page2' && (
                                <>
                                    <h5 className="card-title">แก้ไขรายละเอียดช่องทางการติดต่อ</h5>
                                    <Form>
                                        <Form.Item>
                                            <Input.TextArea
                                                value={formData.contactAddress}
                                                onChange={(e) => handleFormDataChange('contactAddress', e.target.value)}
                                                placeholder="Enter contact information"
                                            />
                                        </Form.Item>
                                    </Form>
                                </>
                            )}
                            <Button type="primary" onClick={handleSaveChanges} style={{ marginTop: '20px' }}>
                               บันทึกการแก้ไข
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditHotel;
