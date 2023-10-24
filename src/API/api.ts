import request from "./request";

export const Api: { [key: string]: any } = {
    //file文件
    checkFile: async (data: any) => {
        return request.post('/files/upload/valid', data.data);
    },
    getMapData:async (data:any)=>{
        return request.get(`/pollutant/${data.year}/${data.month}/${data.day}`);
    },
    getLine:async (data:any)=>{
        return request.get(`/pollutant/${data.city}/${data.pollution}`);
    },
    getCity:async (data:any)=>{
        return request.get(`/pollutant/${data.city}`);
    },
    getAero:async (data:any)=>{
        return request.get(`/aero/${data.year}/${data.month}/${data.day}`);
    },
    getCluster:async (data:any)=>{
        return request.get((`/pollutant/cluster/${data.year}/${data.type}`));
    }
}
