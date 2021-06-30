
//create arrays
var sample_values=[];
var otu_ids=[];
var otu_labels=[];
var ids=[];

//buildData function///////////////////////////////
function buildData(sampleData){
    d3.json("data/samples.json").then((data)=> {
        console.log(data);
        console.log(sampleData);
        var metadata = data.metadata;
            
        //clear the table
        
    });
}



//buildChart function/////////////////////////////////
function buildChart(sampleChartData){
    d3.json("data/samples.json").then((data)=> {
        console.log(data);
        console.log(sampleChartData);
        //sort sample values
        var sample_values= data.samples.sort(function(a,b){
            return parseInt(b.sample_values) - parseInt(a.sample_values);
        });
            
        //slice the first 10
        var sample_values = sample_values.slice(0,10);
        //reverse array
        sample_values= sample_values.reverse();
            
        var trace1={
            x: sample_values.map(row => row.otu_ids),
            y: sample_values.map(row => row.sample_values),
            text: sample_values.map(row => row.otu_labels),
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
}


// handleclick button//////////////////////// -done
function optionChanged(dropdownValue){
    buildData(dropdownValue);
    buildChart(dropdownValue);

}

// init function /////////////////////////////
function init(){
    d3.json("data/samples.json").then((data)=> {
        //find the names
        var ids = data.names;
        //populate dropdown
        var dropdown = d3.select("#selDataset");
        //iterate thru ids
        ids.forEach(function(id){
            dropdown.append("option").text(id).property("value");
        });
            
        //find the first sample
        const firstId = ids[0];
        buildChart(firstId);
        buildData(firstId);
    });
}

//initialize functions//////////////////////////
init();

