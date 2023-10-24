import {combineReducers} from "redux";
import {DataReducer} from "../reducer/DataReducer";


// 全局创建多个 reducer 在这里合并统一调度
export const rootReducers =
    combineReducers({
        DataReducer
    })