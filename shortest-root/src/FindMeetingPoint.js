user_Locations = [[12.9235, 77.6851], [12.8862, 77.7459], [12.9722, 77.6843]]

function findDistance(a, b){
    
}
/*
function findMedianCoordinates(coords){
    cartesian = []
    for(var coord in coords){
        cartesian.push([Math.cos(coord.lat) * Math.cos(coord.long),
                        Math.cos(coord.lat) * Math.sin(coord.long),
                        Math.sin(coord.lat)])
    }

    cartesian.map((element) => {
        console.log(element)
    });

    var avg_x = 0, avg_y = 0, avg_z = 0
    for(var coord in cartesian){
        avg_x += coord[0]
        avg_y += coord[1]
        avg_z += coord[2]
    }
    avg_x /= cartesian.length
    avg_y /= cartesian.length
    avg_z /= cartesian.length

    var Lon = Math.atan2(avg_y, avg_x)
    var Hyp = Math.sqrt(avg_x * avg_x + avg_y * avg_y)
    var Lat = Math.atan2(avg_z, Hyp)

    console.log(Lat, Lon)

    return [Lat, Lon]
}
*/

var sumX = 0
var sumY = 0

function getAverage(coords){
    len = coords.length
    for(var i = 0; i < len; i++) {
        sumX += coords[i][0]
        sumY += coords[i][1]
    }
    console.log([sumX, sumY])
    coords.push([sumX/len, sumY/len])

    coords.map((element) => {
        console.log(element)
    });
}
