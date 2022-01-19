const data = {
    labels: [0, 10, 5, 2, 20, 30, 45],
    datasets: [{
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255,255,255)',
      data: [0, 10, 5, 2, 20, 30, 45],
    }]
};

const config = {
    type: 'line',
    data: data,
    options: {
        scales:{
            xAxes: {
                display: false
            }
        },
        plugins:{
            legend:{
                display: false
            }
        }
    }
};

/**
 * Get data and update the graph for hist_bpm
 */
async function load_hist_bpm(){
    const histBPMChart = new Chart(document.getElementById('hist_bpm_div'), config);
    while (true){
        $.ajax({
            url: "/api/hist_bpm",
            contentType: 'application/json',
            success: function(response){
                console.log(response);
                addNewData(histBPMChart, response);
            },
            error: function(response){
                console.log("Error ");
                console.log(response)
            }
        });
        await sleep(500);
    }
}

/**
 * Get data and update the graph for raw_data
 */
async function load_raw_data(){
    const rawDataChart = new Chart(document.getElementById('raw_data_div'), config);
    while (true){
        $.ajax({
            url: "/api/raw_data",
            contentType: 'application/json',
            success: function(response){
                console.log(response);
                addNewData(rawDataChart, response);
            },
            error: function(response){
                console.log("Error ");
                console.log(response)
            }
        });
        await sleep(500);
    }
}

/**
 * Update data in a char and removes all old data
 * @param {*} chart 
 * @param {*} data 
 */
function addNewData(chart, data){
    chart.data.labels = data;
    chart.data.datasets = [{
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255,255,255)',
        'data': data,
      }]
    chart.update(mode='none');
}

function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}