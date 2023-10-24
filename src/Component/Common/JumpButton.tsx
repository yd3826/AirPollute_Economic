import React from 'react';
import {ArrowRightOutlined} from '@ant-design/icons';
import "./JumpButton.css"

type MyButtonProps = {
    title: string,
    link: string,
    img: string
};

const JumpButton: React.FC<MyButtonProps> = ({title, link, img}) => {
    return (
        <div
            className="animated-button"
            onClick={() => window.location.href = link}
            style={{backgroundImage: `url(${img})`, backgroundSize: 'cover'}}
        >
            <div className="button-content">
                <span>{title} <ArrowRightOutlined/></span>
            </div>
        </div>
    );
}

export default JumpButton;