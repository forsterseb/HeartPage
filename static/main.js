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

async function pulsing_anim(){
    last_sector = -1;
    while (true){
        $.ajax({
            url: "/api/pulse",
            contentType: 'application/json',
            success: function(response){
                document.getElementById('pulse_span').innerText = (response['BPM']);
                pulse = response['BPM']
                sector = get_sector_by_pulse(pulse)
                if (sector != last_sector){
                    last_sector = sector;
                    set_anim_color_by_sector(sector);
                }
            },
            error: function(response){
                console.log("Error ");
                console.log(response)
                document.getElementById('pulse_span').innerText = (-1);
            }
        });
        await sleep(500);
    }
}

function set_anim_color_by_sector(sector) {
    var sector_1 = document.getElementById('arc1');
    var sector_2 = document.getElementById('arc2');
    var sector_3 = document.getElementById('arc3');
    var sector_4 = document.getElementById('arc4');
    var sector_5 = document.getElementById('arc5');
    var pulse_span = document.getElementById('pulse_span');

    var sectors = [sector_1, sector_2, sector_3, sector_4, sector_5];

    sectors.forEach(sector => sector.removeAttribute('class'));
    pulse_span.removeAttribute('class');

    if (sector == 1){
        sectors.forEach(sector => sector.classList.add('bar', 'border-low'));
        sector_1.classList.add('fill-low');
        pulse_span.classList.add('content', 'low');
    }else if (sector == 2) {
        sectors.forEach(sector => sector.classList.add('bar', 'border-normal'));
        sector_2.classList.add('fill-normal');
        pulse_span.classList.add('content', 'normal');
    }else if (sector == 3) {
        sectors.forEach(sector => sector.classList.add('bar', 'border-middle'));
        sector_3.classList.add('fill-middle');
        pulse_span.classList.add('content', 'middle');
    } else if (sector == 4) {
        sectors.forEach(sector => sector.classList.add('bar', 'border-high'));
        sector_4.classList.add('fill-high');
        pulse_span.classList.add('content', 'high');
    }else if (sector == 5) {
        sectors.forEach(sector => sector.classList.add('bar', 'border-extreme'));
        sector_5.classList.add('fill-extreme');
        pulse_span.classList.add('content', 'extreme');
    }
}

function get_sector_by_pulse(pulse){
    if (pulse <= 60) {
        return 1;
    } else if (pulse <= 80) {
        return 2;
    } else if (pulse <= 100) {
        return 3;
    } else if (pulse <= 120) {
        return 4;
    } else {
        return 5;
    }
}

// - 60
// 61 - 80
// 81 - 100
// 101 - 120
// 121 -

function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}