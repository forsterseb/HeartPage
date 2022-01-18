console.log("hello im jherr")

async function pulsing(){
    while (true){
        console.log("get pulse")
        await sleep(500)
    }

}

function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

if (!!window.EventSource) {
    var source = new EventSource('/api/pulse');
    source.onmessage = function(e) {
      document.getElementById('pulse_div').innerText = (e.data);
      console.log(e.data);
      //$("#pulse_div").text(e.data);
    }
  }



//pulsing();