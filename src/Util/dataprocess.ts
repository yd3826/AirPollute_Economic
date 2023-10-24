export function dataprocess(data: any, key: any) {
    return data.map((d: any) => {
        return (
            {
                lat: d[' lat'],
                lng: d[' lon'],
                count: d[key]
            })
    })
}