import {useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";

const CRootJump = () => {
    const navigator = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let pt = location.pathname
        if (pt === '' || pt === '/') {
            navigator("/c");
        }
    }, [location.pathname, navigator])

    return (
        <></>
    )
}

export default CRootJump