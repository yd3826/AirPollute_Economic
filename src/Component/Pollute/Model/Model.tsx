import {Card} from "antd";
import {PolMap} from "../PolMap";
import {AeronauticalMap} from "./AeronauticalMap";

export const Model = (props:any)=>{
    const {city,pollution,year,day,month,setCity} = props
    return(
        <div style={{display: 'flex'}}>
            <Card style={{width: '800px', height: '800px'}}>
                <PolMap ciyt={city} pollution={pollution} year={year} day={day} month={month} setCity={setCity} height={'700px'}/>
            </Card>
            <Card style={{width: '800px', height: '800px'}}>
                <AeronauticalMap year={year} month={month} day={day}/>
            </Card>
        </div>
    )
}