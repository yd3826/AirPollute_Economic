import {Card} from "antd";
import {PolMap} from "./PolMap";
import {Line} from "./Line";
import {Radar} from "./Radar";
import {Stack} from "./Stack";
export const PolOrigin = (props: any) => {
    // const ref = useRef<any>(null);
    // let mapInstance: any;
    // mapInstance = null;
    // const renderMap = (resData: any) => {
    //     const renderedMapInstance = echarts.getInstanceByDom(ref.current);
    //     if (renderedMapInstance) {
    //         mapInstance = renderedMapInstance;
    //     } else {
    //         mapInstance = echarts.init(ref.current);
    //     }
    //     mapInstance.setOption(
    //         chinaMapConfig(resData)
    //     );
    // }
    // useEffect(() => {
    //     echarts.registerMap('ChinaMap', China)
    //     Api.getMapData({year: year, month: month, day: day})
    //         .then((res: any) => {
    //             console.log(day)
    //             renderMap({year: year, month: month, day: day, pollution: 'PM2.5', data: res})
    //         })
    //         .catch(()=>{message.error('超出范围')})
    // }, [day,year,month])
    //
    // useEffect(() => {
    //     window.onresize = function () {
    //         mapInstance.resize();
    //     };
    //     return () => {
    //         mapInstance && mapInstance.dispose();
    //     };
    // }, []);
    const {city,day,year,month,setCity,pollution} = props;
    return (
        <>
            <div style={{display: 'flex'}}>
                <Card style={{width: '800px', height: '500px'}}>
                    {/*<div style={{width: "100%", height: "99vh"}} ref={ref}></div>*/}
                    <PolMap  day={day} year={year} month={month} city={city} setCity={setCity} pollution={pollution} height={'500px'}/>
                </Card>
                <Card style={{width: '800px', height: '500px'}}>
                    <Line city={city} pollution={pollution}/>
                </Card>
            </div>
            <div style={{display:'flex'}}>
                <Card style={{width:'800px',height:'500px'}}>
                        <Radar city={city}/>
                </Card>
                <Card style={{width:'800px',height:'500px'}}>
                    <Stack year={year} city={city} />
                </Card>
            </div>
        </>
    )
}