import React, {useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import { Layout, Menu} from 'antd';
import {headerMenu} from "../router";
import sdu_logo from "../Assert/img/logo.jpg"
import {browserTest} from "../Util/browserTest";

const {Header} = Layout;

const CHeader = () => {
    const navigator = useNavigate();
    const location = useLocation();

    const [selectedKey, setSelectedKey] = useState('0');

    useEffect(() => {
        // 测试浏览器功能可用性
        try {
            browserTest()
        } catch (e) {
            navigator("/error/browser", {replace: true})
        }
    }, [navigator])

    useEffect(() => {
        for (let i = 0; i < headerMenu.length; i++) {
            if (location.pathname === headerMenu[i].path && selectedKey !== headerMenu[i].id.toString()) {
                setSelectedKey(headerMenu[i].id.toString());
            }
        }
    }, [location, selectedKey]);



    return (
        <Header style={{
            position: 'fixed', zIndex: 1, width: '100%', display: "flex",
            justifyContent: "space-between", background: "#fff",
            boxShadow: "0 2px 8px rgba(0,0,0,.15)"
        }}>
            <div style={{flex: "125px 0 0", margin: "10px 16px 16px -26px"}} key={"logo"}>
                <img src={sdu_logo} style={{width: "125px"}} alt={"山东大学 logo"}/>

            </div>
            <div style={{minWidth: 0, flex: "auto"}}>
                <Menu
                    mode="horizontal"
                    theme="light"
                    selectedKeys={[selectedKey]}
                    items={headerMenu.map((r) => ({
                        key: r.id,
                        icon: r.icon,
                        label: <Link to={r.path}>{r.title}</Link>,
                    }))}
                />
            </div>
        </Header>
    )


}

export default CHeader;
