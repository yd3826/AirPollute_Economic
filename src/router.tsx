import CLayout from "./Layout/CLayout";
import CRootJump from "./Layout/CRootJump";
import Home from "./Page/Home";
import {Pollute} from "./Page/Pollute";


export interface IBaseRouter {
    id: number
    path: string
    component?: any
}

export interface IRouter extends IBaseRouter {
    title: string
    icon?: any
    children?: IRouter[]
}

export const mainRouter: IBaseRouter[] = [
    {id: 0, path: "/", component: <CRootJump/>},
    {id: 1, path: "/c/*", component: <CLayout/>},
]


export const CLayoutRouter: IBaseRouter[] = [
    {id: 0, path: "/home", component: <Home/>},
    {id: 1,path:"/pollute",component:<Pollute />},
    {id:2,path:'/economic',component:""}
]
export const headerMenu: IRouter[] = [
    {id: 0, title: "主页", path: "/c/home",},
    {id: 1, title: "大气污染时空态势", path: "/c/pollute",},
    {id: 2, title: "大气污染时空经济效益", path: "/c/economic",},
]
