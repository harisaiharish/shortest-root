NEARBY_SEARCH = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=cruise&location=-33.8670522%2C151.1957362&radius=1500&type=restaurant&key=AIzaSyC-8yJHf4WGRxTvRDMaRtYos7wxkE6C86A"
console.log("HIIIIII")
/*
fetch(NEARBY_SEARCH)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return JSON.stringify(response.json());
  })
  .then(data => {
    console.log(JSON.stringify(data));
  })
  .catch(error => {
    console.error('Error:', error);
  });

  */

  const userAction = async () => {
    console.log("IM INSIDE")
    const response = await fetch(NEARBY_SEARCH);
    const myJson = await response.json(); //extract JSON from the http response
    console.log(myJson)
    console.log(myJson.results.business_status)
    console.log(JSON.stringify(myJson.results))
    // do something with myJson
  }

  userAction()