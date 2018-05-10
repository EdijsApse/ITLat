$(document).ready(function(){
    var end_date = new Date(2018, 7, 31, 13, 00, 00, 0),
        current_date = new Date(),
        day_not,
        days_left;
        days_left = end_date.getTime() - current_date.getTime();
        day_not = (days_left > 1) ? " Dienām":" Dienas";
    $("#countdown").text(Math.floor(days_left / 86400000) + day_not);
})