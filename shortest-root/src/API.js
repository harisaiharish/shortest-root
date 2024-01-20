API_KEY = "AIzaSyC-8yJHf4WGRxTvRDMaRtYos7wxkE6C86A"

NEARBY_SEARCH = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=cruise&location=-33.8670522, 151.1957362&radius=1500&type=restaurant&key=AIzaSyC-8yJHf4WGRxTvRDMaRtYos7wxkE6C86A"
console.log("HIIIIII")

function setAPIcall(keyword, lat, long, radius = 50000){
    return `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=${keyword}&location=${lat},${long}&radius=${radius}&key=${API_KEY}`
}

const userAction = async () => {
    console.log("IM INSIDE")
    const response = await fetch(NEARBY_SEARCH);
    const myJson = await response.json(); //extract JSON from the http response
    console.log(myJson)
    console.log(myJson.results.business_status)
    console.log(JSON.stringify(myJson.results))
}  

  userAction()