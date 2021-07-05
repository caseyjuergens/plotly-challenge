
//buildData function///////////////////////////////
function buildData(sampleData){
    //read in data
    d3.json("data/samples.json").then((data)=> {
        // create variable for metadata
        var metadata = data.metadata;

        //filter metadata for demo info
        selectData= metadata.filter(d => d.id == sampleData);
        result= selectData[0];
        console.log(result);

        //select demo panel, clear panel
        var panel= d3.select('#sample-metadata');
        panel.html("");

        // apply demo info to panel 
        Object.entries(result).forEach(
        ([key,value]) => d3.select("#sample-metadata").append("p").text(`${key}: ${value}`)
        );

    });
}

//buildChart function/////////////////////////////////
function buildChart(sampleChartData){
    //read in data
    d3.json("data/samples.json").then((data)=> {
        //console.log(sampleChartData);

        //set first sample as the default for the chart to build
        buildDefault= data.samples;
        
        //filter for default info
        selectData= buildDefault.filter(d => d.id == sampleChartData);
        results= selectData[0];

        //slice the top 10 and reverse the sample_values, otu_ids, and otu_labels for the default
        defaultSampVal= results.sample_values;
        defaultSampVal= defaultSampVal.slice(0,10).reverse();
        defaultOTUid= results.otu_ids;
        defaultOTUid= defaultOTUid.slice(0,10).reverse();
        defaultOTULabel= results.otu_labels;
        defaultOTULabel= defaultOTULabel.slice(0,10).reverse();

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
            title: "Top 10 Bacteria Cultures found",
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 100
            }
        };
        var config ={responsive: true};
        Plotly.newPlot("bar", chartData, layout, config);

        //use sample values for bubble chart
        var trace2 = {
            x: defaultOTUid.map(defaultOTUid=> `OTU ${defaultOTUid}`),
            y: defaultSampVal,
            mode: 'markers',
            marker: {
            size:defaultSampVal,
            color: defaultOTUid,
            colorscale: "Viridis"
            }
        };
        
        var data2 = [trace2];
        
        var layout2 = {
            title: 'Bacteria Cultures Per Sample',
            showlegend: false,
            height: 600,
            width: 600
        };
        
        Plotly.newPlot('bubble', data2, layout2, config);

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