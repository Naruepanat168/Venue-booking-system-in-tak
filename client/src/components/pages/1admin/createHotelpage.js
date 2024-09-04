import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { message } from 'antd';

import AdminMenu from '../../layouts/adminMenu';
import { createHotel } from '../../functions/hotelPages';

const provinces = [
    "กรุงเทพมหานคร", "กระบี่", "ขอนแก่น", "จันทบุรี", "ฉะเชิงเทรา",
    "ชัยนาท", "ชัยภูมิ", "ชุมพร", "เชียงราย",
    "เชียงใหม่", "ตรัง", "ตราด", "ตาก", "นครนายก",
    "นครปฐม", "นครพนม", "นครราชสีมา", "นครศรีธรรมราช", "นครสวรรค์",
    "นนทบุรี", "นราธิวาส", "หนองคาย", "หนองบัวลำภู", "อำนาจเจริญ",
];

function CreateHotelPage({history}) {
    const user = useSelector((state) => state.user);

    // State variables for form fields
    const [formData, setFormData] = useState({
        name: user ? user.name : '',
        hotelName: '',
        province: '',
        phoneNumber: '',
        email: '',
        contactAddress: '',
        context: '',
        file: null,
        eventTypes: {
            seminar: false,
            wedding: false,
            party: false
        },
        details: ''
    });

    // Handle input changes
    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormData(prevData => ({
                ...prevData,
                eventTypes: {
                    ...prevData.eventTypes,
                    [id]: checked
                }
            }));
        } else if (type === 'file') {
            setFormData(prevData => ({
                ...prevData,
                [id]: e.target.files[0]
            }));
        } else {
            setFormData(prevData => ({
                ...prevData,
                [id]: value
            }));
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('formData', JSON.stringify(formData));
        formDataToSend.append('file', formData.file);

        createHotel(formDataToSend, user.token)
        .then((res) => {
            message.success('Image removed successfully');
            history.push('/admin/editHotel')

        })
        .catch((err) => {
            console.log(err);
        });
        console.log(formData); 
    };

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-2 d-none d-md-block'>
                    <AdminMenu />
                </div>
                <div className='col-12 col-md-10'>
                    <h1 className="text-center my-4">เพิ่มสถานที่</h1>

                    <form className="row g-3" onSubmit={handleSubmit}>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="hotelName" className="form-label">ชื่อโรงแรม</label>
                            <input type="text" className="form-control" id="hotelName" value={formData.hotelName} onChange={handleChange} />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="province" className="form-label">จังหวัด</label>
                            <select id="province" className="form-select" value={formData.province} onChange={handleChange}>
                                <option value="">เลือก...</option>
                                {provinces.map(province => (
                                    <option key={province} value={province}>{province}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="phoneNumber" className="form-label">เบอร์โทรศัพท์</label>
                            <input type="text" className="form-control" id="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="email" className="form-label">อีเมล</label>
                            <input type="email" className="form-control" id="email" value={formData.email} onChange={handleChange} />
                        </div>
                        <div className="col-12 mb-3">
                            <label htmlFor="contactAddress" className="form-label">ที่อยู่สำหรับติดต่อ</label>
                            <textarea className="form-control" id="contactAddress" rows="3" value={formData.contactAddress} onChange={handleChange}></textarea>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="context" className="form-label">ส่วนเนื้อหาที่ต้องการแสดงบนเว็บ</label>
                            <input type="text" className="form-control" id="context" value={formData.context} onChange={handleChange} />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="file" className="form-label">เพิ่มรูปสำหรับแสดงบนเว็บ</label>
                            <input className="form-control" type="file" id="file" onChange={handleChange} />
                        </div>
                        <div className="col-12 mb-3">
                            <span>ประเภทของงาน:&nbsp;</span>
                            <div className="form-check d-inline-block me-3">
                                <input className="form-check-input" type="checkbox" id="seminar" checked={formData.eventTypes.seminar} onChange={handleChange} />
                                <label className="form-check-label" htmlFor="seminar">
                                    สัมมนา
                                </label>
                            </div>
                            <div className="form-check d-inline-block me-3">
                                <input className="form-check-input" type="checkbox" id="wedding" checked={formData.eventTypes.wedding} onChange={handleChange} />
                                <label className="form-check-label" htmlFor="wedding">
                                    งานแต่ง
                                </label>
                            </div>
                            <div className="form-check d-inline-block me-3">
                                <input className="form-check-input" type="checkbox" id="party" checked={formData.eventTypes.party} onChange={handleChange} />
                                <label className="form-check-label" htmlFor="party">
                                    งานเลี้ยง
                                </label>
                            </div>
                        </div>
                        <div className="col-12 mb-3">
                            <label htmlFor="details" className="form-label">รายละเอียด</label>
                            <textarea className="form-control" id="details" rows="4" value={formData.details} onChange={handleChange}></textarea>
                        </div>

                        <div className="col-12 d-flex justify-content-end">
                            <button type="submit" className="btn btn-primary">สร้าง</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateHotelPage;
