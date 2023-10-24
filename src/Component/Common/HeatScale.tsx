const HeatScale = ()=>{
    return(
        <div
            style={{
                height: 0,
                width: 30,
                position: "relative",
                left: 20,
                top: -230,
            }}
        >
            <div
                style={{
                    width: 20,
                    height: 170,
                    background: `linear-gradient(to top,blue,green 33%, yellow 66%, red)`,
                    position:"relative"
                }}
            >
                <div
                    style={{
                        position: 'absolute', // 添加绝对定位
                        top: 0,
                        left: 0,
                        right: 0,
                    }}
                >10</div>
                <div
                    style={{
                        position: 'absolute', // 添加绝对定位
                        bottom: 0,
                        left: 0,
                        right: 0,
                    }}
                >
                    0
                </div>
            </div>
        </div>
    )
}

export default HeatScale;