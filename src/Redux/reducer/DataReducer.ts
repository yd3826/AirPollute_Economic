import {DataState} from "../../Type/data";
import {DataAction} from "../action/DataAction";
import deepClone from "../../Util/deepClone";

const initState:DataState = {
    mapData:undefined,
    cityData:undefined
}
export const DataReducer =(state:DataState=initState,action:DataAction)=>{
    let State: DataState = deepClone(state);
    switch (action.type){
        case "setMapData":
            State.mapData = action.data
            break
        case "setCityData":
            State.cityData = action.data
            break
        default:
            break
    }
    return State
}