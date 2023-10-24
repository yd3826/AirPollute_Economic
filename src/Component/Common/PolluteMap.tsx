//echarts
import * as echarts from 'echarts/core';
import {MapChart} from "echarts/charts";
import {China} from "../../Assert/data/map/China";
import React, {useEffect, useRef, useState} from 'react';
import ReactECharts from 'echarts-for-react';
import axios from "axios";
import '../../CSS/common2.css'
import data from '../../Assert/data/2013/01/01.json'
import {dataprocess} from "../../Util/dataprocess";
import 'echarts-extension-amap'

echarts.use([MapChart]);

echarts.registerMap("china", China);
//污染物地图分布
export const PolluteMap = (props: any) => {
    const ref = useRef<any>(null);
    const [date, setDate] = useState<any>()
    useEffect(() => {
        const echartInstance = ref.current.getEchartsInstance();
        const options = echartInstance.getOption();
        options.title[0].text = '全国地图'
        echarts.registerMap('china', China);
        options.series[0].name = '全国地图'
        options.series[0].center = null
        echartInstance.setOption(options, true)
        const bmap = echartInstance
            .getModel()
            .getComponent('bmap')
            .getBMap();
    }, [date,ref])
    let chinaMap = {
        backgroundColor: '#2f3640',
        title:
            {
                text: '全国地图',
                textStyle:
                    {
                        color: "#523",
                    }
                ,
                left: 'left',
            },
        bmap: {
            center: [105, 38],
            zoom: 5,
            roam: true
        },
        visualMap: {
            show: true,
            x: 'right',
            y: 'bottom',
            splitList: [
                {start: 500, end: 600}, {start: 400, end: 500},
                {start: 300, end: 400}, {start: 200, end: 300},
                {start: 100, end: 200}, {start: 0, end: 100},
            ],
            color: ['#5475f5',
                '#9feaa5',
                '#85daef',
                '#74e2ca',
                '#e6ac53',
                '#9fb5ea']
        },
        series: [
            {
                name: '全国地图',
                type: 'map',
                mapType: 'china',
                scaleLimit:
                    {
                        min: 0.5, //缩放最小大小
                        max: 10, //缩放最大大小
                    },
                label: { // 图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等。
                    show: false, //显示省市名称
                    position: [1, 100], // 相对的百分比
                    fontSize: 12,
                    offset: [2, 0], // 是否对文字进行偏移。默认不偏移。例如：`[30, 40]` 表示文字在横向上偏移 `30`，纵向上偏移 `40`。
                    align: "left" // 文字水平对齐方式，默认自动。
                },
                itemStyle: { // 地图区域的多边形 图形样式
                    areaColor: "#fff" // 地图图形颜色
                },
                roam: true, // 是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，可以设置成 `'scale'` 或者 `'move'`。设置成 `true` 为都开启
                zoom: 1.25, // 当前视角的缩放比例
                coordinateSystem: 'bmap',
                data: dataprocess(data,'PM2.5')
            }
        ]
    }
    return (
        <>
            <div className={'con left'} style={{width: '50%', position: 'relative'}}>
                <div className="div_any">
                    <div className="left div_any01" style={{width: '100%'}}>
                        <div className="div_any_child"
                             style={{width: '98%', position: 'relative', height: '13.125rem'}}>
                            <div className="div_any_title">污染物分布地图</div>
                            <ReactECharts ref={ref}
                                          style={{
                                              width: '98%',
                                              position: 'relative',
                                              left: '1%',
                                              height: '12.5rem',
                                              top: '0.3125rem'
                                          }}
                                          option={chinaMap}
                                          lazyUpdate={true} notMerge={true}
                                          onEvents={{
                                              'click': async (param: any) => {//echarts点击事件
                                                  if (param.name) {//判断名称是否为空
                                                      let echartInstance;
                                                      let adcode;
                                                      if (ref.current)
                                                          echartInstance = ref.current.getEchartsInstance();//获取echarts实例
                                                      China.features.forEach((item: any) => {
                                                          if (item.properties.name === param.name) {
                                                              adcode = item.properties.adcode
                                                          }
                                                      })
                                                      let options = echartInstance.getOption()//获取option
                                                      let provinceJSON: any;
                                                      let url = `https://geo.datav.aliyun.com/areas_v3/bound/${adcode}_full.json`
                                                      try {
                                                          if (!adcode)
                                                              throw new Error('地图粒度')
                                                          // provinceJSON = require(`@/assets/MapJson/${param.name}.json`);//根据点击的省名称查询Geojson地图数据（我是将地图数据全部保存在本地，可根据API获取地图json
                                                          provinceJSON = await axios.get(url).then((pro: any) => {
                                                              return pro.data
                                                          })
                                                          echarts.registerMap('china', provinceJSON);//注册点击的省份地图
                                                          options.title[0].text = param.name + '地图'
                                                          options.series[0].name = param.name + '地图'
                                                          options.series[0].center = null;　　//修改点击后地图中心位置，null默认全局居中
                                                          echartInstance.setOption(options, true)//修改echarts option
                                                      } catch (error) {//获取Geojson地图异常返回到全国地图，我只存在市级地图数据，所以点击市级行政区会返回到全国地图。
                                                          options.title[0].text = '全国地图'
                                                          echarts.registerMap('china', China);
                                                          options.series[0].name = '全国地图'
                                                          options.series[0].center = null
                                                          echartInstance.setOption(options, true)
                                                      }
                                                  }
                                              }
                                          }
                                          }
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="con right" style={{width: '50%', position: 'relative'}}>
            </div>
        </>
    )
}