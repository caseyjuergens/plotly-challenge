//read in samples.json file
d3.json("data/samples.json").then((data)=> {
    console.log(data);

    //2. create a horizontal bar chart with a dropdown menu to display the top 10 OTUS found
    var data = data;

    //sort sample values
    var sortedSample= data.samples.sort(function(a,b){
        return parseInt(b.sample_values) - parseInt(a.sample_values);
    });

    //slice the first 10
    var top10 = sortedSample.slice(0,10);
    //reverse array
    top10= top10.reverse();




    //3. create a bubble chart that displays each sample


    //4. display the sample metadata, i.e. an individual's demographic info



    //5. display each key-value pair from the metadata JSON object somewhere on the page

    //6.create function when dropdown menu item selected
    //d3.select("#selDataset").on("change", updatePlotly);
    
    //function updatePlotly(){
        //var dropdownMenu= d3.select("#selDataset").node();
        //var dataset = dropdownMenu.value;
        //choose a test subject here? "id"
        //values for bar chart are "sample_values"
        //use "otu_ids" for bar chart labels
    //}




});
    
