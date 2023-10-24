import {useEffect, useRef, useState} from "react";
import AMapLoader from "@amap/amap-jsapi-loader";
import {ScatterChart} from "../Common/ScatterChart";

let map;
export const ScatterMap = ()=>{
    const ref = useRef(null);
    useEffect(() => {
        AMapLoader.load({
            key: "608afd3f74b745fb0d9c9890c32ef79e", // 申请好的Web端开发者Key，首次调用 load 时必填
            version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
            plugins: ['AMap.Scale'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
        })
            .then((AMap) => {
                map = new AMap.Map(ref.current, {
                    zooms: [0, 15],
                    zoom: 4,
                    center: [102.618687, 37.790976],
                    mapStyle: 'amap://styles/dark',
                });
                ScatterChart.init(map,ref.current,{'maxId':5057, "data":[{"cluster":2063,"lnglat":[109.25,18.34]}]})
            })
            .catch((e) => {
                console.log(e);
            })
    }, [])
    return (
        <>
            <div
                id={'scatter'}
                ref={ref}
                style={{height: 500}}
            />
        </>
    )
}