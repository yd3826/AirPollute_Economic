import {useEffect, useRef} from "react";
import * as echarts from "echarts";
import { StackConfig} from "../../Config/config";
import {Api} from "../../API/api";
import {useSelector} from "react-redux";
import {getTotalDate} from "../../Util/getTotalDate";

const totalDate = getTotalDate()
function processData(data:any,year:string){
    const arr = ['PM2.5', 'PM10', 'SO2', 'NO2', 'CO', 'O3', 'U', 'V', 'TEMP', 'RH', 'PSFC']
    let arrBool = [false,false,false,false,false,false];
    let yearData:any = {data:{}}
    //获得对应年的数据
    for(const index in totalDate){
        const date = totalDate[index]
        if(date.startsWith(year)){
            for(let i = 0;i < 6;i++)
            {
                if(arrBool[i]){
                    yearData['data'][arr[i]].push(data['data'][date][arr[i]])
                }
                else{
                    arrBool[i] = true;
                    yearData['data'][arr[i]] = [data['data'][date][arr[i]]]
                }
            }
        }
    }
    return yearData
}
export const Stack = (props:any)=>{
    const data = useSelector((state:any)=>state.DataReducer.cityData)
    const ref = useRef<any>(null)
    let echartInstance:any;
    echartInstance = null;
    const render = (resData:any)=>{
        const renderedInstance = echarts.getInstanceByDom(ref.current);
        if (renderedInstance) {
            echartInstance = renderedInstance;
        } else {
            echartInstance = echarts.init(ref.current);
        }
        echartInstance.setOption(
            StackConfig(resData)
        );
    }
    useEffect(()=>{
        if(data)
            render({city:props.city,year:props.year,ret:processData(data,props.year)})
    },[data,props.year])

    useEffect(() => {
        if(echartInstance)
            window.onresize = function () {
                echartInstance.resize();
            };
        return () => {
            echartInstance && echartInstance.dispose();
        };
    }, [echartInstance]);
    return(
        <div ref={ref} style={{width:'%98',height:'500px'}}></div>
    )
}