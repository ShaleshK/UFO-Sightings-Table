// from data.js
var tableData = data;

// UFO-Level-1
// Using the UFO dataset provided in the form of an array of JavaScript objects, write code that appends a table to your web page 
//and then adds new rows of data for each UFO sighting.
//   * Make sure you have a column for `date/time`, `city`, `state`, `country`, `shape`, and `comment` at the very least.
var tbody = d3.select("tbody");
function buildTable(data) {
    tbody.html("");
    data.forEach(function(ufoSightings) {
        console.log(ufoSightings);
        var row = tbody.append("tr");
    
        Object.entries(ufoSightings).forEach(function([key, value]) {
               console.log(key, value);
               var cell = row.append("td"); 
               cell.text(value);
        });
    });
}

// * Use a date form in your HTML document and write JavaScript code that will listen for events and search through the `date/time` column to find rows that match user input.
var button = d3.select("#filter-btn");
button.on("click", function() {
      var inputElement = d3.select("#datetime");
      var inputValue = inputElement.property("value");      
      console.log(inputValue);
      console.log(tableData);
      var filteredData = tableData;
    //   filteredData = filteredData.filter(row => row.datetime === inputValue);

      Object.entries(filters).forEach(([key,value]) => {
        filteredData = filteredData.filter(row => row[key] === value);
      }); 

      console.log(filteredData);
      buildTable(filteredData);
});
buildTable(tableData);

var filters = {};
function updateFilters() {
    var inputElement = d3.select(this).select("input");
    var inputValue = inputElement.property("value");
    var filterID = inputElement.attr("id");
    if (inputValue) {
        filters[filterID] = inputValue;
    } else {
        delete filters[filterID]
    }
}
d3.selectAll(".filter").on("change",updateFilters);