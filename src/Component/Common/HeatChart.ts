import AMapLoader from "@amap/amap-jsapi-loader";

export const HeatChart = (function () {
    var heatmap: any = null;
    var AMap: any;
    AMapLoader.load({
        key: "608afd3f74b745fb0d9c9890c32ef79e", // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ['AMap.Scale','AMap.HeatMap','AMap.ToolBar'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    }).then((aMap: any) => {
        AMap = aMap
    })

    return {
        init: (map: any, heatData: any) => {
            var disCountry = new AMap.DistrictLayer.Country({
                SOC: 'CHN',
                zIndex: 10,
                depth: 2,
                styles: {
                    'nation-stroke': '#22ffff',
                    'coastline-stroke': [0.85, 0.63, 0.94, 1],
                    'province-stroke': 'white',
                    'city-stroke': 'rgba(255,255,255,0)',
                    'fill': 'rgba(254,255,255,0.15)'
                }
            })
            map.add(disCountry)
            map.plugin(["AMap.HeatMap"], function () {
                //初始化heatmap对象
                heatmap = new AMap.HeatMap(map, {
                    radius: 7, //给定半径
                    opacity: [0, 0.8],
                    gradient: {
                        0.1: 'rgba(50,48,118,1)',
                        0.2: 'rgba(127,60,255,1)',
                        0.4: 'rgba(166,53,219,1)',
                        0.6: 'rgba(254,64,95,1)',
                        0.8: 'rgba(255,98,4,1)',
                        1: 'rgba(236,220,79,1)',
                    },
                });
                const scale = new AMap.Scale({
                    visible:true,
                    offset:new AMap.Pixel(70,20),
                })
                map.addControl(scale);
                map.addControl(new AMap.ToolBar())
                heatmap.setDataSet({
                    data: heatData,
                    // max: 100
                });
            });
        },
        update: (heatData: any) => {
            heatmap.setDataSet({
                data: heatData,
            });
        },
        mapSwitchChange(checked: any) {
            if (checked) {
                heatmap.show();
            } else {
                heatmap.hide();
            }
        }
    }
})()