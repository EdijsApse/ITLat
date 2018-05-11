$(document).ready(function() {
	$("img").click(function(){
		var image_src = $(this).attr("src"),
			image = document.createElement("img");
		$("#preview").fadeIn("fast", function(){
			$(image).attr("src", image_src);
			$("#preview > #image").append(image);
			$(image).fadeIn("fast", function(){
				$("#close").fadeIn("slow");
				//$("body").css("overflow","hidden");
			});
		});
		$("#close").click(function(){
			$("#preview").fadeOut(200, function(){
				$("#image > img").remove();
				$("#close").css("display", "none");
				//$("body").css("overflow","scroll");
			});
		});
	});
	$(".social-icon > a > img").off("click");
});