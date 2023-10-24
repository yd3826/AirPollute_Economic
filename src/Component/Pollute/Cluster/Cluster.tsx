import {PolMap} from "../PolMap";
import {Card} from "antd";
import {ClusterHex} from "./ClusterHex";

export const Cluster = (props:any)=>{
    return(
        <>
            <Card style={{width: '800px', height: '500px'}}>
                {/*<div style={{width: "100%", height: "99vh"}} ref={ref}></div>*/}
                <ClusterHex year={props.year} type={props.pollution} />
            </Card>
        </>
    )
}