import React from 'react';

function AdminMenu() {
    return (
        <div>
            <nav className="nav flex-column">
                <a className="nav-link active" aria-current="page" href="#admin/dashboard">หน้าหลัก</a>
                <a className="nav-link" href="#admin/createHotelpags"> เพิ่มสถานที่</a>
                
                <a className="nav-link" href="#admin/editHotel"> แก้ไขรายละเอียดสถานที่</a>
                <a className="nav-link" href="#admin/viewHotel">ดูตัวอย่าง</a>
            </nav>
        </div>
    );
}

export default AdminMenu;
