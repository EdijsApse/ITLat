$(document).ready(function() {
	$("img").click(function(){
		var image_src = $(this).attr("src"),
			image = document.createElement("img");
		$("#preview").fadeIn("fast", function(){
			$(image).attr("src", image_src);
			$("#preview > #image").append(image);
			$("#preview > #image").fadeIn("fast", function(){
				$(image).fadeIn("fast", function(){
					$(".close").fadeIn("slow");
				});
			});
		});
		$(".close").click(function(){
			$("#preview").fadeOut(200, function(){
				$("#image > img").remove();
				$(".close, #image").css("display", "none");
			});
		});
	});
	$(".video").click(function(){
		var video = document.createElement("iframe"),
			video_src = $(this).children("iframe").attr("src");
		$("#preview").fadeIn("fast", function(){
			$(video).attr("src", video_src);
			$("#preview > #video").append(video);
			$("#preview > #video").fadeIn("fast", function(){
				$(".close").fadeIn("fast");
			});
			
		});
		$(".close").click(function(){
			$("#preview").fadeOut(200, function(){
				$("#video > iframe").remove();
				$(".close, #video").css("display", "none");
			});
		});
	});
	$(".social-icon > a > img").off("click");
});