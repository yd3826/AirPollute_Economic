import * as echarts from 'echarts'
import 'echarts/extension/bmap/bmap';
export const chinaMapConfig = (props: any) => {
    const {year, month, day, pollution, data} = props;
    let mapData: any = []
    var arr = ['PM2.5', 'PM10', 'SO2', 'NO2', 'CO', 'O3', 'U', 'V', 'TEMP', 'RH', 'PSFC']
    var obj = data.data;
    for (let i in obj) {
        let flag = arr.indexOf(pollution)
        var pol = obj[i][flag];
    }
    // console.log(min, max)
    //  console.log(temp)
    for (let i in obj) {
        var city = i;
        let flag = arr.indexOf(pollution)
        //   console.log(flag)
        var pol = obj[i][flag];
        var color = 0;
        if (flag <= 8) {
            if (pol <= 400) color = 5;
            if (pol <= 300) color = 4;
            if (pol <= 200) color = 3;
            if (pol <= 150) color = 2;
            if (pol <= 100) color = 1;
            if (pol <= 50) color = 0;
            if (pol > 400) color = 5;
        }


        var lat = obj[i][12];
        var lon = obj[i][11];
        var itemArr = [lat, lon, pol, city, color]
        mapData.push(itemArr)
    }
    // console.log(obj)
    var colors = ['#20bf6b', '#0fb9b1', '#f7b731', '#fa8231', '#eb3b5a', '#6F1E51', '#1e90ff', '#5352ed', '#3742fa', '#3c40c6'];

    return {
        backgroundColor: '#2f3640',
        title: {
            show: true,
            text: year + '年' + month + '月' + day + '日' + pollution,
        },
        tooltip: {
            show: true,
            trigger: 'item',
            showContent: true,//是否显示提示框浮层，默认显示
            alwaysShowContent: false,//是否永远显示提示框内容，默认情况下在移出可触发提示框区域后 一定时间 后隐藏，设置为 true 可以保证一直显示提示框内容
            hideDelay: 0,//鼠标移出坐标点时，浮层隐藏的延迟时间，单位为 ms，在 alwaysShowContent 为 true 的时候无效
            formatter: function (params: any) {
                //   console.log(params)
                return params.data.name + pollution + ':' + params.data.value[3]
            }
        },
        geo: {
            map: 'ChinaMap',
            roam: true,//是否开启缩放和平移
            zoom: 1.24,
            center: [108, 36],// 设置地图中心点的坐标(西安)
            // label: {
            //     show: false,
            //     emphasis: { //动态展示的样式
            //         fontSize: '10',//字体大小
            //         color: '#fff'//字体颜色
            //     },
            // },
            emphasis: {
                label: {
                    show:false,
                    fontSize: '10',//字体大小
                    color: '#fff'//字体颜色
                },
                normal: {
                    borderColor: 'rgba(0, 0, 0, 0.2)',
                    areaColor: '#dcdde1',//静态时各省份区域颜色
                },
                itemStyle: {
                    areaColor: '#718093',//鼠标选择区域颜色
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    shadowBlur: 20,
                    borderWidth: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        },
        series: [
            {
                type: 'effectScatter',
                coordinateSystem: 'geo',
                animation: false,//坐标点是否显示动画
                //       symbol: 'pin',
                roam: true,
                rippleEffect: {
                    brushType: 'stroke'// stroke|fill
                },
                emphasis: {
                    scale: true
                },
                symbolSize: function (val: any, params: any) {//坐标点大小
                    //     console.log(val)
                    if (val[2] == 0) return 3;
                    if (val[2] == 1) return 5;
                    if (val[2] == 2) return 9;
                    if (val[2] == 3) return 13;
                    if (val[2] == 4) return 17;
                    if (val[2] == 5) return 19;
                },
                label: {
                    show: false,
                    fontSize: 15,
                    position: 'right',
                    formatter: function (val: any) {
                        //                console.log(val.data.value)
                        // if (val.data.name == '武汉') {
                        //     //                console.log(val.data.value)
                        //     return val.data.name;
                        // }
                        if (val.data.value[2] >= 9) {
                            return val.data.name;
                        } else if (val.data.value[2] >= 3 && val.data.value[2] <= 4) {
                            return val.data.name;
                        } else return '';
                    }
                },
                data: mapData.map(function (itemOpt: any) {
                    // console.log(itemOpt[2]%13)
                    return {
                        name: itemOpt[3],
                        value: [
                            parseFloat(itemOpt[1]),//经度
                            parseFloat(itemOpt[0]),//维度
                            parseFloat(itemOpt[4]),
                            parseInt(itemOpt[2]),
                        ],
                        emphasis: {
                            itemStyle: {
                                color: 'white',
                            },
                        },
                        itemStyle: {
                            color: colors[itemOpt[4]],
                            areaColor: "#0ff",
                        },
                    };
                }),

                selectedMode: 'single',
                select: {
                    color: 'blue'
                }
            }
        ]
    };
};


// console.log(date_all)
export const lineConfig = (props: any) => {
    const {city, pollution, ret} = props
    return {
        title: {
            text: city + pollution,
            left: '1%'
        },
        tooltip: {
            trigger: 'axis',
            formatter: function (params: any) {
                // console.log(params[0].axisValue)
                return params[0].axisValue + '  ' + pollution + ': ' + parseInt(params[0].data)
            }
        },
        grid: {
            left: '5%',
            right: '15%',
            bottom: '10%'
        },
        xAxis: {
            data: ret.data.map(function (item: any) {
                return item[0];
            })
        },
        yAxis: {},
        toolbox: {
            right: 10,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {}
            }
        },
        dataZoom: [{
            startValue: '2013-03-01',
            endValue: '2013-03-31'
        }, {
            type: 'inside'
        }],
        visualMap: {
            top: 50,
            right: 10,
            pieces: [{
                gt: 0,
                lte: 50,
                color: '#05c46b'
            }, {
                gt: 50,
                lte: 50 * 2,
                color: '#38ada9'
            }, {
                gt: 50 * 2,
                lte: 50 * 3,
                color: '#f6b93b'
            }, {
                gt: 50 * 3,
                lte: 50 * 4,
                color: '#e67e22'
            }, {
                gt: 50 * 4,
                lte: 50 * 6,
                color: '#b71540'
            }, {
                gt: 50 * 6,
                lte: 50 * 8,
                color: '#6F1E51'
            }],
            outOfRange: {
                color: '#535c68'
            }
        },
        series: {
            name: city + pollution,
            type: 'line',
            data: ret.data.map(function (item: any) {
                return item[1];
            }),
            markLine: {
                silent: true,
                lineStyle: {
                    color: '#333'
                },
                data: [{
                    yAxis: 0
                }, {
                    yAxis: 50 * 2
                }, {
                    yAxis: 50 * 3
                }, {
                    yAxis: 50 * 4
                }, {
                    yAxis: 50 * 6
                }, {
                    yAxis: 50 * 8
                }, {
                    yAxis: 50 * 10
                }]
            }
        }
    };
}



export const RadarConfig = (props:any)=>{
    const {city,data} = props;
    let mapData = [];
    let obj = data.data;
    for (let i in obj) {
        if (city == i) {
            mapData = obj[i];
        }
    }
    return{
        color:[ '#FF917C','#56A3F1'],
        title: {
            text: city + '污染物指标'
        },
        legend: {
            data: ['当天值', '正常值']
        },
        emphasis: {
            lineStyle: {
                width: 4
            }
        },
        radar: {
            axisLabel: { show: true,  label:{show:true,fontSize: 10, color: 'white' }},
            // shape: 'circle',
            indicator: [
                { name: 'PM2.5', max: 300 },
                { name: 'PM10', max: 300 },
                { name: 'SO2', max: 300 },
                { name: 'NO2', max: 300 },
                { name: 'CO', max: 300 },
                { name: 'O3', max: 300 }
            ],
            splitArea: {
                show: true
            },
        },
        series: [{
            tooltip: {
                trigger: 'axis',
                       // showContent: true,
            },
            name: '污染物指标',
            type: 'radar',
            data: [
                {
                    value: [mapData[0], mapData[1], mapData[2], mapData[3], mapData[4], mapData[5]],
                    name: '当天值',
                    symbol: 'rect',
                    symbolSize: 7,
                    lineStyle: {
                        type: 'dashed'
                    },
                    areaStyle: {
                        color: new echarts.graphic.RadialGradient(0.1, 0.6, 1, [
                            {
                                color: 'rgba(255, 145, 124, 0.1)',
                                offset: 0
                            },
                            {
                                color: 'rgba(255, 145, 124, 0.9)',
                                offset: 1
                            }
                        ])
                    }
                },
                {
                    value: [100, 100, 100, 100, 100, 100],
                    name: '正常值',
                }
            ]
        }]
    }
}


export const StackConfig = (props:any)=>{
    var labels = ['PM2.5', 'PM10', 'SO2', 'NO2', 'CO', 'O3'];
    const {city,year,ret} = props
    let data:any;
    data = [];
    for (var i = 0; i < 6; i++) {
        var sum = 0;
        var week = 0;
        for (var j = 1; j <= 365; j++) {
            sum += ret.data[labels[i]][j];
            if (j % 7 == 0) {
                sum /= 7;
                week = parseInt(String(j / 7))
                var label = labels[i];
                // console.log(label)
                data.push([
                    week, parseInt(String(sum)), label
                ]);
                sum = 0;
            }
        }
    }
    return{
        title: {
            show: true,
            text: city + year + '年'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'line',
                lineStyle: {
                    color: 'rgba(0,0,0,0.2)',
                    width: 1,
                    type: 'solid'
                }
            }
        },
        legend: {
            data: ['PM2.5', 'PM10', 'SO2', 'NO2', 'CO', 'O3']
        },

        singleAxis: {
            max: 'dataMax',
            axisTick: {},
            axisLabel: {},
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dashed',
                    opacity: 0.2
                }
            },
            axisPointer: {
                animation: true,
                label: {
                    show: true
                }
            },
        },

        series: [
            {
                type: 'themeRiver',
                emphasis: {
                    itemStyle: {
                        shadowBlur: 20,
                        shadowColor: 'rgba(0, 0, 0, 0.8)'
                    }
                },
                data: data,
            }
        ]
    }
}


export const AeronauticalConfig = (props:any)=>{
    const {curtain,ret,year,month,day,item} = props;
    if(curtain === 4){
        var data = [];
        var maxMag = 0;
        var minMag = Infinity;
        var obj = ret.data;
        // console.log(obj.length)
        // var count = 0;
        for (var i = 0; i < obj.length; i++) {
            // console.log(12)
            // count++;
            // // if (count % 10 == 0) {
            var u = obj[i][0];//纬向风速
            var v = obj[i][1];//经向风速
            var mag = Math.sqrt(u * u + v * v);
            //     //   console.log(mag);
            var lat = obj[i][2];//纬度
            var lon = obj[i][3];//经度
            var itemArr = [lon, lat, v, u, mag]
            data.push(itemArr)
            maxMag = Math.max(mag, maxMag);
            minMag = Math.min(mag, minMag);
        }
        // console.log(maxMag, minMag)
        // console.log(data)
        return{
            title: {
                show: true,
                text: '全国' + year + '年' + month + '月' + day + '日风向图',
                left: 'center',
                textStyle: {
                    color: '#fff'
                }
            },
            visualMap: {
                left: 'right',
                min: minMag,
                max: maxMag,
                dimension: 4,
                inRange: {
                    // color: ['green', 'yellow', 'red']
                    color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
                },
                realtime: false,
                calculable: true,
                textStyle: {
                    color: '#fff'
                }
            },
            bmap: {
                center: [105, 38],
                zoom: 5,
                roam: true,
                mapStyle: {
                    styleJson: [
                        {
                            featureType: "water",
                            elementType: "all",
                            stylers: {
                                color: "#273c75"
                            }
                        },
                        {
                            featureType: "land",
                            elementType: "all",
                            stylers: {
                                color: "#353b48"
                            }
                        },
                        {
                            featureType: "railway",
                            elementType: "all",
                            stylers: {
                                visibility: "off"
                            }
                        },
                        {
                            featureType: "highway",
                            elementType: "all",
                            stylers: {
                                color: "#353b48"
                            }
                        },
                        {
                            featureType: "highway",
                            elementType: "labels",
                            stylers: {
                                visibility: "off"
                            }
                        },
                        {
                            featureType: "arterial",
                            elementType: "geometry",
                            stylers: {
                                color: "off"
                            }
                        },
                        {
                            featureType: "arterial",
                            elementType: "geometry.fill",
                            stylers: {
                                color: "off"
                            }
                        },
                        {
                            featureType: "poi",
                            elementType: "all",
                            stylers: {
                                visibility: "off"
                            }
                        },
                        {
                            featureType: "green",
                            elementType: "all",
                            stylers: {
                                visibility: "off"
                            }
                        },
                        {
                            featureType: "subway",
                            elementType: "all",
                            stylers: {
                                visibility: "off"
                            }
                        },
                        {
                            featureType: "manmade",
                            elementType: "all",
                            stylers: {
                                color: "#d1d1d1"
                            }
                        },
                        {
                            featureType: "local",
                            elementType: "all",
                            stylers: {
                                color: "#d1d1d1"
                            }
                        },
                        {
                            featureType: "arterial",
                            elementType: "labels",
                            stylers: {
                                visibility: "off"
                            }
                        },
                        {
                            featureType: "boundary",
                            elementType: "all",
                            stylers: {
                                color: "#fefefe"
                            }
                        },
                        {
                            featureType: "building",
                            elementType: "all",
                            stylers: {
                                color: "#d1d1d1"
                            }
                        },
                        {
                            featureType: "label",
                            elementType: "labels.text.fill",
                            stylers: {
                                color: "#999999"
                            }
                        }
                    ]


                }
            },
            series: [{
                type: 'flowGL',
                coordinateSystem: 'bmap',
                data: data,
                supersampling: 4,
                particleType: 'line',
                particleDensity: 90,
                particleSpeed: 5,
                itemStyle: {
                    opacity: 0.9
                }
            }],
        }
    }
    let points = [];
    var minData = 100000;
    var maxData = -100000;
    var obj = ret.data;
    for (var i = 0; i < obj.length; i++) {
        // console.log(i)
        var lat = obj[i][2];//纬度
        var lon = obj[i][3];//经度
        //   var value = parseFloat(data[i]["TEMP(K)"]);
        if (item == 'TEMP') {
            var value = obj[i][4];
        }
        if (item == 'RH') {
            var value = obj[i][5];
        }
        if (item == 'PSFC') {
            var value = obj[i][6];
        }
        if (value > maxData) maxData = value;
        if (value < minData) minData = value;
        var itemArr = [lon, lat, value]
        points.push(itemArr)
    }
    return {
        title: {
            show: true,
            text: '全国' + year + '年' + month + '月' + day + '日' + item,
            left: 'center',
            textStyle: {
                color: '#fff'
            }
        },
        animation: false,
        bmap: {
            center: [105, 38],
            zoom: 5,
            roam: true
        },
        visualMap: {
            show: false,
            top: 'top',
            min: minData,
            max: maxData,
            seriesIndex: 0,
            calculable: true,
            inRange: {
                color: ['blue', 'blue', 'green', 'yellow', 'red']
            }
        },
        series: [{
            type: 'heatmap',
            coordinateSystem: 'bmap',
            data: points,
            pointSize: 11,
            blurSize: 11
        }]
    }
}