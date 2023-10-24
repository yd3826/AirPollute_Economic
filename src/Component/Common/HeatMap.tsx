import {HeatChart} from "./HeatChart";
import {useEffect, useState} from "react";
import AMapLoader from "@amap/amap-jsapi-loader";
import data from '../../Assert/data/2013/01/01.json'
import {dataprocess} from "../../Util/dataprocess";
import HeatScale from "./HeatScale";
import {Select, Space} from "antd";

let map: any;
export const HeatMap = (props: any) => {
    const [key, setKey] = useState('PM2.5')
    useEffect(() => {
        AMapLoader.load({
            key: "608afd3f74b745fb0d9c9890c32ef79e", // 申请好的Web端开发者Key，首次调用 load 时必填
            version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
            plugins: ['AMap.Scale'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
        })
            .then((AMap) => {
                map = new AMap.Map("container", {
                    zooms: [0, 15],
                    zoom: 4,
                    center: [102.618687, 37.790976],
                    mapStyle: 'amap://styles/dark',
                });
                HeatChart.init(map, [])
            })
            .catch((e) => {
                console.log(e);
            })
    }, [])
    useEffect(() => {
        if (map) {
            console.log('true')
            HeatChart.update(dataprocess(data, key))
        }
    }, [key])
    return (
        <>
            <Select
                style={{
                    width: 100,
                    left: 0,
                    position:"relative"
                }} onChange={(e) => {
                setKey(e)
            }}
            >
                <Select.Option value={'PM2.5'}>PM2.5</Select.Option>
                <Select.Option value={'PM10'}>PM10</Select.Option>
            </Select>
            <div
                id={'container'}
                style={{height: 500}}
            />
            <HeatScale/>
        </>
    )
}