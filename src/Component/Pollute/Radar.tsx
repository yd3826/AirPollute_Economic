import {useEffect, useRef} from "react";
import {useSelector} from "react-redux";
import * as echarts from "echarts";
import {chinaMapConfig, RadarConfig} from "../../Config/config";
import {line} from "d3";

export const Radar = (props:any)=>{
    const data = useSelector((state:any)=>state.DataReducer.mapData)
    const ref = useRef<any>(null)
    let echartInstance:any;
    echartInstance = null;
    const render=(resData:any)=>{
        const renderedInstance = echarts.getInstanceByDom(ref.current);
        if (renderedInstance) {
            echartInstance = renderedInstance;
        } else {
            echartInstance = echarts.init(ref.current);
        }
        echartInstance.setOption(
            RadarConfig(resData)
        );
    }
    useEffect(()=>{
        if(data)
            render({city:props.city,data:data});
    },[props.city, data, render])

    useEffect(() => {
        window.onresize = function () {
            if(echartInstance)
                echartInstance.resize();
        };
        return () => {
            echartInstance && echartInstance.dispose();
        };
    }, [echartInstance]);
    return(
        <div ref={ref} style={{width:'100%',height:'500px'}}></div>
    )
}