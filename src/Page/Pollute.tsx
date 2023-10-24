// import {PolluteMap} from "../Component/Common/PolluteMap";
// import {Button, TimePicker} from "antd";
// import {useEffect, useState} from "react";
import {HeatMap} from "../Component/Common/HeatMap";
import {Card, InputNumber, Select, Tabs} from "antd";
import {ScatterMap} from "../Component/Pollute/ScatterMap";
import {PolOrigin} from "../Component/Pollute/PolOrigin";
import {useEffect, useState} from "react";
import {useDispatch} from "../Redux/store";
import {Api} from "../API/api";
import {Model} from "../Component/Pollute/Model/Model";
import {Cluster} from "../Component/Pollute/Cluster/Cluster";

export const Pollute = (props: any) => {
    const [day,setDay] = useState(1);
    const [year,setYear] = useState('2013')
    const [month,setMonth] = useState(1);
    const [city,setCity] = useState('北京')
    const [pollution,setPollution] = useState('PM2.5')

    const dispatch = useDispatch();
    const setCityData = (data:any)=>{
        return dispatch({type:'setCityData',data:data});
    }

    useEffect(()=>{
        Api.getCity({city:city})
            .then((res:any)=>{
                setCityData(res);
            })
    },[city])

    return (
        <>
            <Tabs
                items={[
                    {
                        label: '污染源分析',
                        key: '0',
                        children: (
                            // <HeatMap/>
                            <PolOrigin city={city} year={year} month={month} day={day} setCity={setCity} pollution={pollution}/>
                        )
                    },
                    {
                        label: '聚类对比分析',
                        key: '1',
                        children: (
                            <Cluster year={year} pollution={pollution}/>
                        )
                    },
                    {
                        label: '传输模式分析',
                        key: '2',
                        children:(
                            <Model city={city} year={year} month={month} day={day} setCity={setCity} pollution={pollution}/>
                        )
                    },
                    {
                        label:'污染预测',
                        key:'3',
                        children: (
                            ''
                        )
                    }
                ]}
            />
            <Select value={year} onChange={(e)=>{if(e)setYear(e)}}>
                <Select.Option value={'2013'}>2013</Select.Option>
                <Select.Option value={'2014'}>2014</Select.Option>
                <Select.Option value={'2015'}>2015</Select.Option>
                <Select.Option value={'2016'}>2016</Select.Option>
                <Select.Option value={'2017'}>2017</Select.Option>
                <Select.Option value={'2018'}>2018</Select.Option>
            </Select>
            <Select value={pollution} onChange={(e)=>{if(e)setPollution(e)}}>
                <Select.Option value={'PM2.5'}>PM2.5</Select.Option>
                <Select.Option value={'SO2'}>SO2</Select.Option>
                <Select.Option value={'PM10'}>PM10</Select.Option>
                <Select.Option value={'CO'}>CO</Select.Option>
                <Select.Option value={'NO2'}>NO2</Select.Option>
                <Select.Option value={'O3'}>O3</Select.Option>
            </Select>
            <InputNumber max={12} min={1} value={month} onChange={(e)=>{if(e)setMonth(e)}}/>
            <InputNumber onChange={(e:any)=>{if(e)setDay(e)}} value={day}/>
        </>

    )
}

