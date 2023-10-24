function getDate(datestr:any) {
    let temp = datestr.split("-");
    let date = new Date(temp[0], temp[1] - 1, temp[2]);
    //    console.log(date);
    return date;
}

export function getTotalDate(){
    let date_all = []
    let i = 0
    let start = "2013-01-01";
    let end = "2018-12-31";
    let startTime = getDate(start);
    let endTime = getDate(end);
    while ((endTime.getTime() - startTime.getTime()) >= 0) {
        let year1 = startTime.getFullYear();
        let month1 = (startTime.getMonth() + 1).toString().length == 1 ? "0" + (startTime.getMonth() + 1).toString() : (startTime.getMonth() + 1).toString();
        let day1 = startTime.getDate().toString().length == 1 ? "0" + startTime.getDate() : startTime.getDate();
        date_all[i] = year1 + "-" + month1 + "-" + day1;
        startTime.setDate(startTime.getDate() + 1);
        i += 1;
    }
    return date_all
}