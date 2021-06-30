
//buildData function///////////////////////////////
function buildData(sampleData){
    //read in data
    d3.json("data/samples.json").then((data)=> {
        //console.log(data);
        var metadata = data.metadata;
        
        //clear the table
        //select variable to update plots with
        var dropdown = d3.select("#selDataset").node();
        var inputValue= dropdown.value;
        console.log(inputValue)

        //select new value from dropdown
        selectData= data.samples.filter(sample => sample.id ===inputValue);
        console.log(selectData);
        //slice the top 10 and reverse the sample_values, otu_ids, and otu_labels for the default
        sampleVals= selectData.sample_values;
        sampleVals= sampleVals.slice(0,10).reverse();
        OTUids= selectData.otu_ids;
        OTUids= OTUids.slice(0,10).reverse().map(OTUids=> `OTU ${OTUids}`);
        OTUlabels= selectData.otu_labels;
        OTUlabels= OTUlabels.slice(0,10).reverse();

        //restyle charts
        Plotly.restyle("bar", "x", [sampleVals]);
        Plotly.restyle("bar", "y", [OTUids]);
        Plotly.restyle("bar", "text", [otu_ids]);



    });
}

//buildChart function/////////////////////////////////
function buildChart(sampleChartData){
    //read in data
    d3.json("data/samples.json").then((data)=> {
        //console.log(sampleChartData);

        //set first sample as the default for the chart to build
        buildDefault= data.samples[0];
        //slice the top 10 and reverse the sample_values, otu_ids, and otu_labels for the default
        defaultSampVal= buildDefault.sample_values;
        defaultSampVal= defaultSampVal.slice(0,10).reverse();
        defaultOTUid= buildDefault.otu_ids;
        defaultOTUid= defaultOTUid.slice(0,10).reverse();
        defaultOTULabel= buildDefault.otu_labels;
        defaultOTULabel= defaultOTULabel.slice(0,10).reverse();

        //display default sample in demographic info chart
        defaultDemoInfo= data.metadata[0];
        console.log(defaultDemoInfo);

        Object.entries(defaultDemoInfo).forEach(
            ([key,value]) => d3.select("#sample-metadata").append("p").text(`${key}: ${value}`)
        );

        //use sample values for bar chart,
        var trace1={
            x: defaultSampVal,
            y: defaultOTUid.map(defaultOTUid=> `OTU ${defaultOTUid}`),
            text: defaultOTULabel,
            name: buildDefault,
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
    //read in data
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
        //run build functions
        buildChart(firstId);
        buildData(firstId);
    });
}

//initialize functions//////////////////////////
init();