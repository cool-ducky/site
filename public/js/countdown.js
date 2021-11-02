let end = new Date('11/3/2021 7:00 AM EST');
let end1 = new Date('11/10/2021 7:00 AM EST');

let _second = 1000;
let _minute = _second * 60;
let _hour = _minute * 60;
let _day = _hour * 24;
let timer;

function getESTOffset() {

    return new Date().getTimezoneOffset() - (end.getTimezoneOffset())
}

function getESTOffset1() {

    return new Date().getTimezoneOffset() - (end1.getTimezoneOffset())
}



function showRemaining() {
    let now = new Date();
    let distance = end - now - getESTOffset() * _hour;
    if (distance < 0) {

        clearInterval(timer);
        document.getElementById('countdown').innerHTML = 'STARTED!';
        document.getElementById("theme").innerHTML = "Halloween"
        document.getElementById("theme").style = "color: orange;font-size: 80px;"
        timer1 = setInterval(showRemaining1, 1000)
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
function showRemaining1() {
    let now = new Date();
    let distance = end1 - now - getESTOffset1() * _hour;
    if (distance < 0) {

        clearInterval(timer);
        document.getElementById('countdown').innerHTML = 'Submissions are now closed!';
        return;
    }
    let days = Math.floor(distance / _day);
    let hours = Math.floor((distance % _day) / _hour);
    let minutes = Math.floor((distance % _hour) / _minute);
    let seconds = Math.floor((distance % _minute) / _second);

    document.getElementById('time').innerHTML = days + ' Days ';
    document.getElementById('time').innerHTML += hours + ' Hours ';
    document.getElementById('time').innerHTML += minutes + ' Minutes ';
    document.getElementById('time').innerHTML += seconds + ' Seconds';
}

timer = setInterval(showRemaining, 1000);