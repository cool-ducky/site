let end = new Date('11/3/2021 12:00 AM EST');

let _second = 1000;
let _minute = _second * 60;
let _hour = _minute * 60;
let _day = _hour * 24;
let timer;

function getESTOffset() {

    return new Date().getTimezoneOffset() - (end.getTimezoneOffset())
}

function showRemaining() {
    let now = new Date();
    let distance = end - now - getESTOffset() * _hour;
    if (distance < 0) {

        clearInterval(timer);
        document.getElementById('countdown').innerHTML = 'STARTED!';
        document.getElementById("theme").innerHTML = "Halloween"
        document.getElementById("theme").style = "color: orange;font-size: 80px;"
        return;
    }
    let days = Math.floor(distance / _day);
    let hours = Math.floor((distance % _day) / _hour);
    let minutes = Math.floor((distance % _hour) / _minute);
    let seconds = Math.floor((distance % _minute) / _second);

    document.getElementById('countdown').innerHTML = days + ' Days ';
    document.getElementById('countdown').innerHTML += hours + ' Hours ';
    document.getElementById('countdown').innerHTML += minutes + ' Minutes ';
    document.getElementById('countdown').innerHTML += seconds + ' Seconds';
}

timer = setInterval(showRemaining, 1000);
