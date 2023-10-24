import * as d3 from 'd3';
import AMapLoader from "@amap/amap-jsapi-loader";

interface DataPoint {
    lnglat: number[];
    latX?: number;
    lngY?: number;
    cluster: number;
}

interface Data {
    data: DataPoint[];
    maxId: number;
}

export const ScatterChart = (function () {
    let AMap: any;
    let data: DataPoint[] = [];
    let maxCluster = 0;
    let color = ['red', 'blue', 'yellow'];
    let container: HTMLElement | null = null;
    let map: any = null;
    let svg: any;
    let customLayer: any = null;
    AMapLoader.load({
        key: "608afd3f74b745fb0d9c9890c32ef79e", // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ['AMap.Scale','AMap.HeatMap'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    }).then((aMap: any) => {
        AMap = aMap
    })
    //颜色插值器
    let colorScale = d3.scaleLinear<string>()
        .range(['blue', 'yellow']);

    const init = (mp: any, ctn:any, dt: Data) => {
        data = dt.data;
        maxCluster = dt.maxId;
        map = mp;
        container = ctn;
        // @ts-ignore
        var width = container.clientWidth;
        // @ts-ignore
        var height = container.clientHeight;
        colorScale.domain([0, maxCluster]);
        svg = d3.select(container)
            .append('svg')
            .attr('id', 'scattersvg')
            .attr('width', width)
            .attr("height", height);

        mp.on('complete', () => {
            customLayer = new AMap.CustomLayer(svg?.node(), {
                zIndex: 100,
                zooms: [3, 18] // 设置可见级别，[最小级别，最大级别]
            });

            // @ts-ignore
            customLayer.render = onRender.bind(this);
            mp.add(customLayer);
        });
    }
    const update = function (dt: Data) {
        data = dt.data;
        maxCluster = dt.maxId;
        colorScale.domain([0, maxCluster]);
        // @ts-ignore
        this.onRender();
    }
    const dataProcess = function (dt: DataPoint[]) {
        dt.forEach(d => {
            let lnglat = new AMap.LngLat(d.lnglat[0], d.lnglat[1]); //给定的经纬度创建一个地理坐标
            let pixl = map.lngLatToContainer(lnglat); //返回地图图层上与地理坐标相一致的点
            d.latX = pixl.y;
            d.lngY = pixl.x;
        });
    }
    const onRender = function () {
        dataProcess(data);

        svg
            .selectAll('circle')
            .data(data)
            .join(
                (enter:any) => enter
                    .append('circle')
                    .attr('cx', (d:any)=> d.lngY)
                    .attr('cy', (d:any) => d.latX)
                    .attr('r', 1)
                    .attr('fill', (d:any) => colorScale(d.cluster)),
                (update:any) => update
                    .attr('cx', (d:any) => d.lngY)
                    .attr('cy', (d:any) => d.latX)
                    .attr('fill', (d:any) => colorScale(d.cluster)),
                (exit:any) => exit.remove()
            );
    };
    return {
        init: init,
        update: update,
        dataProcess: dataProcess,
        onRender: onRender
    }
})();