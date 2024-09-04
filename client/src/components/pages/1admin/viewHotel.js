import React, { useState, useEffect } from 'react';
import AdminMenu from '../../layouts/adminMenu';
import { Carousel, message, Button, Modal, Radio } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { hotelAll } from '../../functions/hotelPages';
import { useSelector } from 'react-redux';

function ViewHotel() {
    const user = useSelector(state => state.user);
    const [hotels, setHotels] = useState([]);
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedWorkType, setSelectedWorkType] = useState(null);
    const [selectedCapacity, setSelectedCapacity] = useState(null);

    const workTypeOptions = [
        { label: 'การจัดสัมมนา', value: 'การจัดสัมมนา' },
        { label: 'งานแต่ง', value: 'งานแต่ง' },
        { label: 'การจัดงานกลางแจ้ง', value: 'การจัดงานกลางแจ้ง' },
        { label: 'การจัดงานในห้อง', value: 'การจัดงานในห้อง' },
    ];

    const capacityOptions = [
        { label: '20', value: '20' },
        { label: '30', value: '30' },
        { label: '40', value: '40' },
        { label: '50', value: '50' },
        { label: '100', value: '100' },
        { label: '200', value: '200' },
        { label: '500', value: '500' },
        { label: '1000', value: '1000' },
    ];

    useEffect(() => {
        hotelAll(user.token, user.name)
            .then((res) => {
                const hotelsWithActiveTab = res.map(hotel => ({
                    ...hotel,
                    activeTab: 'page0',
                    carouselRef: React.createRef(),
                }));
                setHotels(hotelsWithActiveTab);
            })
            .catch((err) => {
                console.log(err);
                message.error('Failed to load hotel data');
            });
    }, [user.token, user.name]);

    const handleTabClick = (index, page, event) => {
        event.preventDefault();
        setHotels(prevHotels => {
            const updatedHotels = [...prevHotels];
            updatedHotels[index].activeTab = page;
            return updatedHotels;
        });
    };

    const next = (index) => {
        hotels[index].carouselRef.current.next();
    };

    const prev = (index) => {
        hotels[index].carouselRef.current.prev();
    };

    const handleRentClick = (hotel) => {
        setSelectedHotel(hotel);
        setModalVisible(true);
    };

    const handleModalClose = () => {
        setModalVisible(false);
        setSelectedHotel(null);
        setSelectedWorkType(null);
        setSelectedCapacity(null);
    };

    const handleWorkTypeChange = (e) => {
        setSelectedWorkType(e.target.value);
    };

    const handleCapacityChange = (e) => {
        setSelectedCapacity(e.target.value);
    };

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-2 d-none d-md-block'>
                    <AdminMenu />
                </div>
                <div className='col-12 col-md-10'>
                    <div className='container'>
                        <div className='row'>
                            {hotels.map((hotel, index) => (
                                <div key={index} className='col-12 col-md-4 mb-4'>
                                    <div className='card text-center' style={{ height: "500px", position: 'relative' }}>
                                        <div className='card-header'>
                                            <ul className='nav nav-tabs card-header-tabs'>
                                                <li className='nav-item'>
                                                    <a
                                                        href='#page0'
                                                        className={`nav-link ${hotel.activeTab === 'page0' ? 'active' : ''}`}
                                                        onClick={(event) => handleTabClick(index, 'page0', event)}
                                                        aria-current={hotel.activeTab === 'page0' ? 'page' : undefined}
                                                    >
                                                        โรงเเรม
                                                    </a>
                                                </li>
                                                <li className='nav-item'>
                                                    <a
                                                        href='#page1'
                                                        className={`nav-link ${hotel.activeTab === 'page1' ? 'active' : ''}`}
                                                        onClick={(event) => handleTabClick(index, 'page1', event)}
                                                        aria-current={hotel.activeTab === 'page1' ? 'page' : undefined}
                                                    >
                                                        รายละเอียด
                                                    </a>
                                                </li>
                                                <li className='nav-item'>
                                                    <a
                                                        href='#page2'
                                                        className={`nav-link ${hotel.activeTab === 'page2' ? 'active' : ''}`}
                                                        onClick={(event) => handleTabClick(index, 'page2', event)}
                                                        aria-current={hotel.activeTab === 'page2' ? 'page' : undefined}
                                                    >
                                                        ติดต่อ
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className='card-body'>
                                            {hotel.activeTab === 'page0' && (
                                                <>
                                                    <h5 className='card-title'>{hotel.hotelName}</h5>
                                                    <div className='carousel-container' style={{ position: 'relative', maxWidth: '100%', margin: 'auto' }}>
                                                        <Carousel autoplay ref={hotel.carouselRef}>
                                                            {hotel.picture.map((image, imgIndex) => (
                                                                <div key={imgIndex} className='image-container'>
                                                                    <img
                                                                        src={`${process.env.REACT_APP_IMG}/${image}`}
                                                                        className='d-block w-100'
                                                                        alt={`Slide ${imgIndex + 1}`}
                                                                        style={{ objectFit: 'cover', width: '100%', height: '200px' }}
                                                                    />
                                                                </div>
                                                            ))}
                                                        </Carousel>
                                                        <LeftOutlined
                                                            onClick={() => prev(index)}
                                                            style={{
                                                                position: 'absolute',
                                                                top: '50%',
                                                                left: '10px',
                                                                transform: 'translateY(-50%)',
                                                                fontSize: '24px',
                                                                color: 'rgba(255, 255, 255, 0.8)',
                                                                cursor: 'pointer',
                                                                zIndex: 1
                                                            }}
                                                        />
                                                        <RightOutlined
                                                            onClick={() => next(index)}
                                                            style={{
                                                                position: 'absolute',
                                                                top: '50%',
                                                                right: '10px',
                                                                transform: 'translateY(-50%)',
                                                                fontSize: '24px',
                                                                color: 'rgba(255, 255, 255, 0.8)',
                                                                cursor: 'pointer',
                                                                zIndex: 1
                                                            }}
                                                        />
                                                    </div>
                                                    <p className='card-text'>{hotel.context}</p>
                                                </>
                                            )}
                                            {hotel.activeTab === 'page1' && (
                                                <>
                                                    <h5 className='card-title'>รายละเอียด</h5>
                                                    <p className='card-text'>{hotel.details}</p>
                                                </>
                                            )}
                                            {hotel.activeTab === 'page2' && (
                                                <>
                                                    <h5 className='card-title'>ติดต่อ</h5>
                                                    <p className='card-text'><strong>ที่อยู่:</strong> {hotel.contactAddress}</p>
                                                    <p className='card-text'><strong>เบอร์โทร:</strong> {hotel.phoneNumber}</p>
                                                    <p className='card-text'><strong>อีเมล:</strong> {hotel.email}</p>
                                                </>
                                            )}
                                        </div>
                                        {hotel.activeTab === 'page0' && (
                                            <div className='rent-button-container' style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)' }}>
                                                <Button type="primary" onClick={() => handleRentClick(hotel)}>เลือกเช่า</Button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal สำหรับแสดงรายละเอียดของโรงแรม */}
            <Modal
                title={selectedHotel ? selectedHotel.hotelName : ''}
                centered
                open={modalVisible}
                onOk={handleModalClose}
                onCancel={handleModalClose}
                width={1000}
            >
                <p>รายละเอียดเพิ่มเติมเกี่ยวกับโรงแรม {selectedHotel ? selectedHotel.hotelName : ''}</p>
                <br />
                <h6>รูปแบบประเภทงาน</h6>
                <Radio.Group
                    options={workTypeOptions}
                    onChange={handleWorkTypeChange}
                    value={selectedWorkType}
                />
                <br/><br/>

                <h6>ระบุความจุจำนวนคนของห้องจัดงาน</h6>
                <Radio.Group
                    options={capacityOptions}
                    onChange={handleCapacityChange}
                    value={selectedCapacity}
                />
            </Modal>
        </div>
    );
}

export default ViewHotel;
