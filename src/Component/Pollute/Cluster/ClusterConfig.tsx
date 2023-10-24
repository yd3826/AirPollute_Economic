import * as ecStat from 'echarts-stat'

var colors = ['#fc5c65', '#fd9644', '#fed330', '#26de81', '#2bcbba', '#45aaf2', '#4b7bec', '#a55eea', '#a5b1c2', '#778ca3', '#4b6584'];
export const Cluster1 = (props:any)=>{
    const {pollution,year,ret} = props;
    let data = ret['coordinate'];
    //      console.log(data)
    var clusterNumber = 11;
    var step:any = ecStat.clustering.hierarchicalKMeans(data, clusterNumber, true);
    var result;
    let option:any = {
        timeline: {
            top: 'center',
            right: 35,
            height: 300,
            width: 10,
            inverse: true,
            playInterval: 2500,
            symbol: 'none',
            orient: 'vertical',
            axisType: 'category',
            autoPlay: true,
            label: {
                normal: {
                    show: false
                }
            },
            data: []
        },
        baseOption: {
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
            tooltip: {
                show: true,
                trigger: 'axis',
                showContent: true,//是否显示提示框浮层，默认显示
                alwaysShowContent: false,//是否永远显示提示框内容，默认情况下在移出可触发提示框区域后 一定时间 后隐藏，设置为 true 可以保证一直显示提示框内容
                hideDelay: 0,//鼠标移出坐标点时，浮层隐藏的延迟时间，单位为 ms，在 alwaysShowContent 为 true 的时候无效
            },
            title: {
                text: year + '年' + pollution + '空气质量聚类分析',
                left: 'center'
            },
            xAxis: {
                type: 'value'
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                type: 'scatter'
            }]
        },
        options: []
    }
    function getOption(result:any, k:any) {
        var clusterAssment = result.clusterAssment;
        var centroids = result.centroids;
        var ptsInCluster = result.pointsInCluster;
        var series = [];
        for (let i = 0; i < k; i++) {
            series.push({
                name: 'scatter' + i,
                type: 'scatter',
                animation: false,
                data: ptsInCluster[i],
                markPoint: {
                    symbolSize: 29,
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: true,
                            position: 'top',
                            formatter: function (params: any) {
                                return Math.round(params.data.coord[0] * 100) / 100 + '  ' +
                                    Math.round(params.data.coord[1] * 100) / 100 + ' ';
                            },
                            textStyle: {
                                color: '#000'
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            opacity: 0.7
                        }
                    },
                    data: [{
                        coord: centroids[i]
                    }]
                }
            });
        }
        return {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross'
                }
            },
            series: series,
            color: colors
        };
    }
    for (let i = 0; !(result = step.next()).isEnd; i++) {

        option.options.push(getOption(result, clusterNumber));
        option.timeline.data.push(i + '');
    }
    return option;
}

export const Cluster2 = (props:any)=>{
    const {year,pollution,ret} = props
    var mapData:any;
    mapData = [];
    for(let i = 0;i < ret.city.length;i++)
    {
        const city = ret['city'][i];
        const lat = ret['position'][i][1];
        const lon = ret['position'][i][0];
        const category = ret['classify'][i];
        mapData.push([lat,lon,category,city])
    }
    return{
        title: {
            text: year + '年' + pollution + '空气质量聚类分析',
            left: 'center'
        },
        tooltip: {
            show: true,
            trigger: 'item',
            showContent: true,//是否显示提示框浮层，默认显示
            alwaysShowContent: false,//是否永远显示提示框内容，默认情况下在移出可触发提示框区域后 一定时间 后隐藏，设置为 true 可以保证一直显示提示框内容
            hideDelay: 0,//鼠标移出坐标点时，浮层隐藏的延迟时间，单位为 ms，在 alwaysShowContent 为 true 的时候无效
            formatter: function (params:any) {
                //   console.log(params)
                return params.data.name + pollution + '分类:' + params.data.value[2]
            }
        },
        geo: {
            map: 'chinaMap',
            roam: true,//是否开启缩放和平移
            zoom: 1.24,//视角缩放比例
            label: {
                normal: {
                    show: false,//是否显示省份名称
                    fontSize: '10',//字体大小
                    color: 'white'//字体颜色
                },
                // emphasis: { //动态展示的样式
                //     fontSize: '10',//字体大小
                //     color: '#fff'//字体颜色
                // },
            },
            itemStyle: {
                normal: {
                    borderColor: 'rgba(0, 0, 0, 0.2)',
                    areaColor: '#CAD3C8',//静态时各省份区域颜色
                },
                emphasis: {
                    areaColor: '#BDC581',//鼠标选择区域颜色
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
                type: 'scatter',
                coordinateSystem: 'geo',
                animation: false,//坐标点是否显示动画
                symbol: 'pin',
                roam: true,
                rippleEffect: {
                    brushType: 'fill'// stroke|fill
                },
                symbolSize: function (val:any, params:any) {//坐标点大小
                    return 15;
                },
                data: mapData.map(function (itemOpt:any) {
                    //  console.log(itemOpt[3]%13)
                    return {
                        name: itemOpt[3],
                        value: [
                            parseFloat(itemOpt[1]),//经度
                            parseFloat(itemOpt[0]),//维度
                            parseFloat(itemOpt[2])//分类
                        ],
                        label: {
                            emphasis: {//高亮状态下的样式
                                show: false

                            }
                        },
                        itemStyle: {//地图区域的多边形
                            color: colors[itemOpt[2]],
                            emphasis: {
                                areaColor: "#0ff",
                                color: "#fff",
                            }
                        },
                    };
                })
            }
        ]
    }
}