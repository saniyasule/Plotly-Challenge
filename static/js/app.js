function getPlot(id) {
    d3.json("samples.json").then((data)=> {
        var wfreq = data.metadata.map(d => d.wfreq)
        // Get ids 
        var samples = data.samples.filter(s => s.id.toString() === id)[0];
        
        // Top 10 
        var samplevalues = samples.sample_values.slice(0, 10).reverse();
  
        // Reversing list for display 
        var OTU_top = (samples.otu_ids.slice(0, 10)).reverse();
        
        // Get the OTU ID's formatted to plot
        var OTU_id = OTU_top.map(d => "OTU " + d)
  
        // Get the labels for the plot
        var labels = samples.otu_labels.slice(0, 10);
  
        // Create trace, data and layout variables
        var trace = {
            x: samplevalues,
            y: OTU_id,
            text: labels,
            marker: {
              color: 'rgb(65,105,225)'},
            type:"bar",
            orientation: "h",
        };
        var data = [trace];
        var layout = {
            title: "Top 10 Belly Button Bacteria",

            xaxis: { title: "OTU Bacteria Counts"},
            
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30
            }
        };
  
        // Plot bar graph
        Plotly.newPlot("bar", data, layout);
    
        // Plot bubble chart
        var trace1 = {
            x: samples.otu_ids,
            y: samples.sample_values,
            mode: "markers",
            marker: {
                size: samples.sample_values,
                color: samples.otu_ids
            },
            text: samples.otu_labels
  
        };
  
        var layout_b = {
            xaxis:{title: "OTU ID"},
            height: 600,
            width: 1000
        };
  
        var data1 = [trace1];
        Plotly.newPlot("bubble", data1, layout_b); 
     });
  };
   
  function getInfo(id) {
    // Get data from josn file
    d3.json("samples.json").then((data)=> {
        var metadata = data.metadata;
  
        // Get IDs
        var result = metadata.filter(meta => meta.id.toString() === id)[0];
        var demographicInfo = d3.select("#sample-metadata");
        
        // Reset 
        demographicInfo.html("");
  
        // Get data using ID
        Object.entries(result).forEach((key) => {   
                demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
        });
    });
  };
  
  function optionChanged(id) {
    getPlot(id);
    getInfo(id);
  };
  
  function init() {
    var dropdown = d3.select("#selDataset");
  
    // Get data from json file 
    d3.json("samples.json").then((data)=> {
        console.log(data)
  
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });
  
        getPlot(data.names[0]);
        getInfo(data.names[0]);
    });
  };
  
  init();