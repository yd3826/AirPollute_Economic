import React, {useEffect} from "react";
import {Layout} from "antd";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import CHeader from "./CHeader";
import {CLayoutRouter} from "../router";


const {Content, Footer} = Layout;

const CLayout = () => {

    const navigator = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let pt = location.pathname
        if (pt === "/c" || pt === "/c/") {
            navigator("/c/home");
        }
    }, [location.pathname, navigator])
    return (
        <>
            <Layout style={{backgroundColor: "#fff", minHeight: "100vh",}}>
                <CHeader/>
                <Content style={{backgroundColor: "#fff", paddingTop: 64, margin: '20px 16px 0'}}>
                    <div style={{textAlign: "center", margin: "0 auto"}}>
                        <Routes>
                            {CLayoutRouter.map(({id, path, component}) =>
                                <Route key={id} path={path} element={component}/>
                            )}
                        </Routes>
                    </div>
                </Content>
                <Footer style={{textAlign: 'center', backgroundColor: "#fff", height: "80px"}}>
                    Copyright © 2023 Shandong University
                </Footer>
            </Layout>
        </>
    )

}

export default CLayout