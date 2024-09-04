import React from 'react'
import AdminMenu from '../../layouts/adminMenu'

function Dashboard() {
    return (
        <>
        <div className='container-fluid'>
            <div className='row'>
                <div className=' col-md-2 d-none d-md-block'>
                    <AdminMenu />
                </div>
                <div className='col-12 col-md-10'>
    <ul style={{ listStyleType: 'none', padding: '0', margin: '0' }}>
        {[
            'โรงแรมเวียงตากริเวอร์ไซด์',
            'ไวท์ เฮ้าส์ โฮเต็ล',
            'โรงแรมตากอันดามัน แอนด์ รีสอร์ท',
            'โรงแรมบีริช',
            'โรงแรมศิลาหยกแกรนด์',
            'โฮม พาราไดซ์ รีสอร์ท',
            'ปิงวิว วิลล่า รีสอร์ท',
            'โรงแรมเมฆวิไล',
            'บ้านไร่ เชิญมา รีสอร์ท',
            'โซโห บูทีค โฮเต็ล ตาก',
            'มหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา ตาก',
        ].map((hotel, index) => (
            <li key={index} style={{ padding: '8px 0', borderBottom: '1px solid #ccc' }}>
                {hotel}
            </li>
        ))}
    </ul>
</div>

            </div>
        </div>
    </>
    )
}

export default Dashboard
