import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit'
import {rootReducers} from "./rootReducer";
import thunk from "redux-thunk";
import {useDispatch as useReduxDispatch} from 'react-redux';

// 全局就管理一个store
export const store = configureStore({
    reducer: rootReducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    devTools: process.env.NODE_ENV !== 'production',  // 只有在非生产环境下开启 devtools
})

export type RootState = ReturnType<typeof store.getState>;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

export const useDispatch = () => useReduxDispatch<AppDispatch>();