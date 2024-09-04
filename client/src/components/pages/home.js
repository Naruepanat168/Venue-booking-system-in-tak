import React, { useState, useEffect } from 'react';
import { Carousel, message, Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { hotelAll } from '../functions/hotelPages';

function Home() {
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        hotelAll()
            .then((res) => {
                const hotelsWithActiveTab = res.map(hotel => ({
                    ...hotel,
                    activeTab: 'page0', // Initialize each hotel with 'page0' as the default active tab
                    carouselRef: React.createRef() // Add a ref for each hotel's carousel
                }));
                setHotels(hotelsWithActiveTab);
            })
            .catch((err) => {
                console.log(err);
                message.error('Failed to load hotel data');
            });
    }, []);

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
        message.success(`คุณเลือกเช่าโรงแรม ${hotel.hotelName}`);
    };

    return (
      <div className='container' style={{marginTop:'20px'}}>
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
    );
}

export default Home;
