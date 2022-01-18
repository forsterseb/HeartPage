async function pulsing(){
    while (true){
        $.ajax({
            url: "/api/pulse",
            contentType: 'application/json',
            success: function(response){
                document.getElementById('pulse_div').innerText = (response['BPM'] + ' ' + response['current_BPM']);
            },
            error: function(response){
                console.log("Error ");
                console.log(response)
                document.getElementById('pulse_div').innerText = (-1 + ' ' + -1);
            }
        });
        await sleep(500);
    }
}

function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

pulsing();