import {useEffect, useRef} from "react";
import {Api} from "../../../API/api";
import * as echarts from "echarts";
import {Cluster1, Cluster2} from "./ClusterConfig";
import {China} from "../../../Assert/data/map/China";

export const ClusterHex = (props:any)=>{
    const {year,type} = props;
    const ref1 = useRef<any>(null)
    const ref2 = useRef<any>(null)
    let echartsInstance: any;
    echartsInstance = null;
    const renderCluster = (resData: any) => {
        const renderedMapInstance = echarts.getInstanceByDom(ref1.current);
        if (renderedMapInstance) {
            echartsInstance = renderedMapInstance;
        } else {
            echartsInstance = echarts.init(ref1.current);
        }
        echartsInstance.setOption(
            Cluster1(resData)
        );
    }
    let mapInstance: any;
    mapInstance = null;
    const renderMap = (resData: any) => {
        const renderedMapInstance = echarts.getInstanceByDom(ref2.current);
        if (renderedMapInstance) {
            mapInstance = renderedMapInstance;
        } else {
            mapInstance = echarts.init(ref2.current);
        }
        mapInstance.setOption(
            Cluster2(resData)
        );
    }
    useEffect(()=>{
        echarts.registerMap('chinaMap', China)
        Api.getCluster({year:year,type:type})
            .then((res:any)=>{
                renderCluster({year:year,pollution:type,ret:res})
                renderMap({year:year,pollution:type,ret:res})
                console.log('what')
            }).catch(()=>{})
    },[year,type])

    useEffect(() => {
        if(echartsInstance&&mapInstance)
            window.onresize = function () {
                echartsInstance.resize();
                mapInstance.resize();
            };
        return () => {
            echartsInstance && echartsInstance.dispose();
            mapInstance && mapInstance.dispose();
        };
    }, [echartsInstance,mapInstance]);
    return(
        <>
        <div style={{width: '50%', height: '500px'}} ref={ref1}></div>
        <div style={{width: '50%', height: '500px'}} ref={ref2}></div>
        </>
    )
}