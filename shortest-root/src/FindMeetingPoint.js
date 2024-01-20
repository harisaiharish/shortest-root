user_Locations = [{0:lat , 0:long }, {2:lat, 2:long}, {5:lat, 5:long}]

function findDistance(a, b){
    
}

function findMedianCoordinate(coords){
    cartesian = []
    for(var coord in coords){
        cartesian.push([Math.cos(coord.lat)*Math.cos(coord.long),
                        Math.cos(coord.lat) * Math.sinsin(coord.long),
                        Math.sin(coord.lat)])
    }
    var avg_x = 0, avg_y = 0, avg_z = 0
    for(var coord in cartesian){
        avg_x += coord[0]
        avg_y += coord[1]
        avg_z += coord[2]
    }
    avg_x /= cartesian.length
    avg_y /= cartesian.length
    avg_z /= cartesian.length

    Lon = Math.atan2(avg_y, avg_x)
    Hyp = Math.sqrt(avg_x * avg_x + avg_y * avg_y)
    Lat = Math.atan2(avg_z, hyp)

    return [Lat, Lon]
}
