import {useEffect, useRef} from "react";
import * as echarts from "echarts";
import {lineConfig} from "../../Config/config";
import {useSelector} from "react-redux";
import {getTotalDate} from "../../Util/getTotalDate";

const totalDate = getTotalDate()
function processData(data:any,pol:string){
    let dayData:any = {data:[]}
    for(const index in totalDate){
        const date = totalDate[index]
        dayData['data'] = [...dayData['data'],[date,data['data'][date][pol]]]
    }
    return dayData
}

export const Line = (props: any) => {
    const data = useSelector((state:any)=>state.DataReducer.cityData);
    const ref = useRef<any>(null)
    let echartInstance: any;
    echartInstance = null;
    const renderLine = (resData: any) => {
        const renderedInstance = echarts.getInstanceByDom(ref.current);
        if (renderedInstance) {
            echartInstance = renderedInstance;
        } else {
            echartInstance = echarts.init(ref.current);
        }
        echartInstance.setOption(
            lineConfig(resData)
        );
    }
    useEffect(()=>{
        if(data)
            renderLine({city:props.city,pollution:props.pollution,ret:processData(data,props.pollution)})
    },[data,props.pollution])
    return (
        <div style={{width: "100%", height: "480px"}} ref={ref}></div>
    )
}