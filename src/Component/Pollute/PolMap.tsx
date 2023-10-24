import {useEffect, useRef, useState} from "react";
import * as echarts from "echarts";
import {chinaMapConfig} from "../../Config/config";
import {China} from "../../Assert/data/map/China";
import {Api} from "../../API/api";
import {message} from "antd";
import {useSelector} from "react-redux";
import {useDispatch} from "../../Redux/store";

export const PolMap = (props: any) => {
    const ref = useRef<any>(null)
    const data = useSelector((state:any)=>state.DataReducer.mapData)
    const dispatch = useDispatch();
    const setMapData = (dt:any)=>{
        return dispatch({type:'setMapData',data:dt});
    }

    let mapInstance: any;
    mapInstance = null;
    const renderMap = (resData: any) => {
        const renderedMapInstance = echarts.getInstanceByDom(ref.current);
        if (renderedMapInstance) {
            mapInstance = renderedMapInstance;
        } else {
            mapInstance = echarts.init(ref.current);
        }
        mapInstance.setOption(
            chinaMapConfig(resData)
        );
        mapInstance.on('click', function (params: any) {
            // 控制台打印数据的名称
            if (params.componentType === 'series' && props.city != params.name) {
                props.setCity(params.name)
                mapInstance.setOption({
                    geo: {
                        type: 'map',
                        selectedMode: 'single',
                        map: 'ChinaMap',
                        roam: true,
                        label: {
                            //         show: true
                        },
                        zoom: 11,
                        center: [params.value[0], params.value[1]] // 设置地图中心点的坐标
                    },
                    series: [{
                        label: {
                            show: true,
                            fontSize: 15,
                            position: 'right',
                            formatter: function (val: any) {
                                //     console.log(val.data)
                                if (params.name == val.data.name) {
                                    //                console.log(val.data.value)
                                    return val.data.name;
                                } else return '';
                            }
                        },

                    }],
                })
            }
        });
    }
    useEffect(() => {
        echarts.registerMap('ChinaMap', China)
        Api.getMapData({year: props.year, month: props.month, day: props.day})
            .then((res: any) => {
                setMapData(res)
                renderMap({
                    year: props.year,
                    month: props.month,
                    day: props.day,
                    pollution: props.pollution,
                    data: res
                })
            })
            .catch(() => {
                message.error('超出范围')
            })
    }, [props.year, props.day, props.month])

    useEffect(() => {
        window.onresize = function () {
            mapInstance.resize();
        };
        return () => {
            mapInstance && mapInstance.dispose();
        };
    }, []);

    useEffect(() => {
        if(data)
            renderMap({year: props.year, month: props.month, day: props.day, pollution: props.pollution, data: data})
    }, [props.pollution])


    return (
        <div style={{width: '98%', height: props.height}} ref={ref}></div>
    )
}