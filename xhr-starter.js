// XHT and XMLHttpRequest = same
// The XMLHttpRequest object can be used to request data from a web server.

// The XMLHttpRequest object is a developers dream, because you can:
// Update a web page without reloading the page
// Request data from a server - after the page has loaded
// Receive data from a server  - after the page has loaded
// Send data to a server - in the background
var startTime = Date.now()
console.log("Date Begin", startTime);
// for (var i = 0; i < 2000000; i++){
// 	//running a loop for fun
// 	var x = i + 1/1 * 6 - 4;
// }
// console.log("I just looped ", i, " times.");

var dataRequest = new XMLHttpRequest();
// dataRequest.addEventListener("progress", updateProgress);
dataRequest.addEventListener("load", dataRequestComplete);
dataRequest.addEventListener("error", dataRequestFailed);
// dataRequest.addEventListener("abort", transferCanceled);

function dataRequestComplete(event) {
  console.log("The BIG transfer is complete and we have data.");
  var dataDumpTime = Date.now();
  console.log("Date of Data Dump", dataDumpTime, "since the startTime", dataDumpTime - startTime);
  var data = JSON.parse(event.target.responseText);
  console.log("the BIG data", data);
  console.log("How Long to takes to Process Data:", Date.now() - dataDumpTime);
}

function dataRequestFailed(event) {
  console.log("Oops, an error occurred while transferring the file.");
}
//open() - Initializes a request.
dataRequest.open("GET", "JEOPARDY_QUESTIONS1.json");
console.log("go get the data");

// send() Sends the request. 
//If the request is asynchronous (which is the default), 
//this method returns as soon as the request is sent. 
//Useful with progress
dataRequest.send(); //adds it to the event loop. 

/////////////////////////////////////////////////////////////////

//second request
var dataRequest2 = new XMLHttpRequest();
dataRequest2.addEventListener("load", dataRequest2LoadComplete);
dataRequest2.addEventListener("error", dataRequest2Error);

function dataRequest2LoadComplete(event){
	console.log("Small data has LOADED");
	var smallData = JSON.parse(event.target.responseText);
	console.log("smallData", smallData);
	showData(smallData);
}

function showData(itDontMatter){
	var colorDiv = document.getElementById("all-my-colors");

  for(whatever in itDontMatter) {
    var colorData = '';
    var colorItem = itDontMatter[whatever];
    colorData += "<div>";
    colorData += "<h2>" + colorItem.color + ": " + colorItem.value + "</h2>"
    colorData += "</div>";

    colorDiv.innerHTML += colorData;
  }

}

function dataRequest2Error(event){
	console.log("DataRequest2 - Error", event.target.responseText);
}
dataRequest2.open("GET", "color.json");
dataRequest2.send();

console.log("Date End of Page", Date.now());


//example json files 
// https://www.sitepoint.com/10-example-json-files/