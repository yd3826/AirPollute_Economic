import React from 'react';
import {mainRouter} from "./router";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
function App() {
    return (
        <>
            <Router>
                <Routes>
                    {mainRouter.map((r) =>
                        <Route key={r.id} path={r.path} element={r.component}/>
                    )}
                </Routes>
            </Router>
        </>
    );
}

export default App;
