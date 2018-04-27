$(document).ready(function(){
    $("img").click(function(){
        var imgSrc = $(this).attr("src");
        $("#img-full > img").attr("src", imgSrc);
        $("#img-full").fadeIn();
    });
    $("#img-full").click(function(){
        $(this).fadeOut();
    })
});