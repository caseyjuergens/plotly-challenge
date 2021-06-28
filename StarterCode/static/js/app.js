d3.json("data/samples.json").then((data)=> {
    console.log(data);
    var metadata = data.metadata;

function buildData(sampleData){
    console.log(sampleData);
    //clear the table


}

function buildChart(sampleChartData){
    console.log(sampleChartData);


}


// handleclick button
function optionChanged(dropdownValue){
    buildData(dropdownValue);
    buildChart(dropdownValue);

}

function init(){
    //read in dataset

    //find the names

    //poulate dropdown

    //find the first sample




    buildData(first);
    buildChart(first);
}

//initialize functions
init();





    //sort sample values
    var sortedSample= data.samples.sort(function(a,b){
        return parseInt(b.sample_values) - parseInt(a.sample_values);
    });

    //slice the first 10
    var top10 = sortedSample.slice(0,10);
    //reverse array
    top10= top10.reverse();

    var trace1={
        x: top10.map(row => row.),
        y: top10.map(row => row.),
        text: data.map(row => row.),
        type: "bar",
        orientation: "h"
    };
    var chartData = [trace1];
    var layout= {
        title: "Top 10 OTUs found",
        margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 100
        }
    };
    Plotly.newPlot("bar", chartData, layout);


});
    
