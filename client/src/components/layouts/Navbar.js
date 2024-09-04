import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { LoginOutlined, DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';

const CustomNavbar = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const history = useHistory();

  const logout = () => {
    dispatch({ type: 'LOGOUT', payload: null });
    history.push('/login');
  };

  const menuItems = [
    { label: <a href="#admin/dashboard">หน้าหลัก</a>, key: '0' },
    { label: <a href="#admin/createHotelpags">สร้าง</a>, key: '1' },
    { label: <a href="#admin/viewHotel">สถานที่ทั้งหมด</a>, key: '2' },
    { type: 'divider' }
  ];

  const clickHome = () => {
    history.push('/hotel'); // Navigate to '/'
  };

  const clickProduct = () => {
    history.push('/admin/viewHotel'); // Navigate to '/admin/allProduct-person'
  };

  return (
    <Navbar collapseOnSelect expand="lg" style={{ backgroundColor: '#0d6efd', }} variant="dark">
      <Container>
        <Navbar.Brand href="/"><h3>HOTEL@tak</h3></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <button onClick={(e) => clickHome()} style={{ width:'fit-content',border: 'none', background: 'none', color: '#f6e4ff' }}>
              <Space>
                  หน้าหลัก
              </Space>
            </button>
            {user && (
              <button onClick={(e) => clickProduct()} style={{ width:'fit-content',border: 'none', background: 'none', color: '#f6e4ff' }}>
                <Space>
                  งานทั้งหมด
                </Space>
              </button>
            )}
          </Nav>
          <Nav className="ms-auto ms-lg-0">
            {user ? (
              <>
                <Dropdown menu={{ items: menuItems }} trigger={['click']}>
                  <button onClick={(e) => e.preventDefault()} style={{ width:'fit-content',border: 'none', background: 'none', color: '#f6e4ff' }}>
                    <Space>
                      ช่วยเหลือ
                      <DownOutlined />
                    </Space>
                  </button>
                </Dropdown>
                <button onClick={(e) => logout()} style={{ width:'fit-content',border: 'none', background: 'none', color: '#ff2b2b' }}>
                  <Space>
                    ออกจากระบบ
                  </Space>
                </button>
              </>
            ) : (
              <>
               
                <Nav.Link style={{ color: '#f6e4ff' }} href="#register">
                  สมัครใช้งาน
                </Nav.Link>
                <Nav.Link style={{ color: '#f6e4ff' }} href="#login">
                  เข้าสู่ระบบ <LoginOutlined />
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
