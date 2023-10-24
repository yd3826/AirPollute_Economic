
export type DataAction = setMapData | setLineData

export interface setMapData{
    type:'setMapData',
    data:any
}

export interface setLineData{
    type:'setCityData',
    data:any
}