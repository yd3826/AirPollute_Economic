import {useEffect, useRef} from "react";
import * as echarts from "echarts";
import {AeronauticalConfig} from "../../../Config/config";
import 'echarts-gl'
import {Api} from "../../../API/api";
import 'echarts/extension/bmap/bmap';

export const AeronauticalMap = (props:any)=>{
    const {year,month,day,curtain} = props
    const ref = useRef<any>(null);
    // @ts-ignore
    const BMap = window.BMap;
    let mapInstance: any;
    mapInstance = null;
    const renderMap = (resData: any) => {
        const renderedMapInstance = echarts.getInstanceByDom(ref.current);
        if (renderedMapInstance) {
            mapInstance = renderedMapInstance;
        } else {
            mapInstance = echarts.init(ref.current);
        }
        console.log(AeronauticalConfig(resData))
        mapInstance.setOption(
            AeronauticalConfig(resData)
        );
        if(resData.curtain === 5)
        {
            var bmap = mapInstance.getModel().getComponent('bmap').getBMap();
            bmap.addControl(new BMap.MapTypeControl());
        }
    }
    useEffect(()=>{
        Api.getAero({year:year,month:month,day:day})
            .then((res:any)=>{
                renderMap({curtain:4,item:'TEMP',year:year,month:month,day:day,ret:res})
            })
    },[year,month,day])
    useEffect(() => {
        window.onresize = function () {
            mapInstance.resize();
        };
        return () => {
            mapInstance && mapInstance.dispose();
        };
    }, []);
    return(
        <div style={{width: '98%', height: '700px',overflow:'hidden',position:'relative'}} ref={ref}></div>
    )
}