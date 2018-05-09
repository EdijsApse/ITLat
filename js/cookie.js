function cookie_object(){
		 this.cookie = document.cookie;
		 this.check_cookie = function(){
			 if(this.cookie.length != 0){
				 return true;
			 }
			 else{
				 return false;
			 }
		 }
		 this.validation = function(x){
			var data = x,
		 		is_valid = {};
			if(data == ""){
				is_valid.message = "Ievades lauki nedrīkst būt tukši";
				is_valid.value = false;
			}
			else{
				for(var i = 0; i < data.length; i++){
					if(data[i] == "*" || data[i] == "~"){
						is_valid.message = "Atvaino, simbols, kuru tu ievadīji (" + data[i] +") nav atļauts";
						is_valid.value = false;
					}
					else{
						is_valid.message = "Darāmais darbs veiksmīgi pievienots!";
						is_valid.value = true;
						
					}
				}
			}
			return is_valid;
		 }
		 this.succesfull = function(a,b){
			var title = this.validation(a),
				description = this.validation(b);
				if(title.value == true && description.value == true){
					this.set_cookie();
					$("#job-title").val("");
					$("#job-description").val("");
					$("#notification > h3").text(title.message);
					$("#notification").css("border-color","#49c62d");
				}
				else{
					if(title.value == false){
						$("#notification > h3").text(title.message);
						$("#notification").css("border-color","#d82020");
					}
					else{
						$("#notification > h3").text(description.message);
						$("#notification").css("border-color","#d82020");
					}
				}
				$("#notification").fadeIn("fast");
		 }
		 this.create_job_list = function(){
			var cookie_exists = this.check_cookie(),
				existing_jobs,
				existing_job_array,
				job_title,
				job_description,
				job_template,
				existing_jobs_splited,
				container = document.createElement("div");
			if(cookie_exists == true){
				existing_jobs = this.get_cookie();//Cookie value = string
				existing_job_array = existing_jobs.value.split("~");
				for(var i = 0; i < existing_job_array.length; i++){
					container = document.createElement("div");
					existing_jobs_splited = existing_job_array[i].split("*");
					job_title = existing_jobs_splited[0];
					job_description = existing_jobs_splited[1];
					job_template = '<h1>' + job_title + '</h1>' +
							'<p class="description">' + job_description + '</p>'+
							'<button class="remove" type="button">Dzēst darbu</button>';
					$(container).addClass("job");
					$(container).css("display","none");
					$(container).html(job_template);
					$(".left-sidebar").prepend($(container));
					$(container).fadeIn("fast");
				}
			}
			else{
				$(container).attr("id","no-job");
				$(container).html("<h2>Tu neesi pievienojis nevienu darāmo darbu.</h2>");
				$(container).css("display","none");
				$(".left-sidebar").prepend($(container));
				$(container).fadeIn("fast");
			}
			$(".add-job").fadeIn("fast");
		}
		 this.get_cookie = function(){
			var outgoing_object = {},//Function will return object which contains cookie name and value - return outgoin_object
				cookie = this.cookie,
				cookie_keyValue,//Contains cookie name=value string
				cookie_keyValue_seperate,//Contains cookie name=value, but splited into array [name, value]
				cookie_value;//Contains cookie value
			cookie_keyValue = this.cookie.split(";");//Returns Cookies name=value in array - array containig only 1 element
			cookie_keyValue_seperate = cookie_keyValue[0].split('=');//Splits returning array elemnt into 2 parts by = symbol
			cookie_value = cookie_keyValue_seperate[1];
			outgoing_object.name = cookie_keyValue_seperate[0];
			outgoing_object.value = cookie_value;
			return outgoing_object;
		 }
		 this.set_cookie = function(){
			var job_title = $("#job-title").val(),
				job_description = $("#job-description").val(),
				new_job,
				container = document.createElement("div"),
				existing_jobs,
				tmp_jobs,//Existing Jobs in string
				date = new Date(),
				cookie_exists = this.check_cookie(),
				expire_date,
				job_template;
				job_template = '<h1>' + job_title + '</h1>' +
							'<p class="description">' + job_description + '</p>'+
							'<button class="remove" type="button">Dzēst darbu</button>';
				date.setFullYear(date.getFullYear() + 1);
				expire_date = "expires=" + date.toUTCString();//Cookies expiration date
				new_job = job_title + "*" + job_description;//New Job which will go into cookie
				if(cookie_exists == true){
					existing_jobs = this.get_cookie();
					tmp_jobs = existing_jobs.value + "~" + new_job;
					document.cookie = "ToDoList=" + tmp_jobs + ";" + expire_date + ";path=/";
					$(container).addClass("job");
					$(container).css("display","none");
					$(container).html(job_template);
					$(".left-sidebar").prepend($(container));
					$(container).fadeIn("slow");
				}
				else{
					document.cookie = "ToDoList=" + new_job + ";" + expire_date + ";path=/";
					$("#no-job").fadeOut("fast",function(){
						$(container).addClass("job");
						$(container).css("display","none");
						$(container).html(job_template);
						$(".left-sidebar").prepend($(container));
						$(container).fadeIn("slow");
					})
				}
				this.cookie = document.cookie;
		 }
		 this.delete_job = function(a,b){
			var title = a,
				description = b,
				remaining_job = "",
				date = new Date(),
				expire_date,
				tmp_jobs = "",
				existing_jobs = this.get_cookie(),
				existing_jobs_array,
				last_job = false;
			existing_jobs_array = existing_jobs.value.split("~");
			for(var i = 0,tmp_arr, tmp_arr_title, tmp_arr_description; i < existing_jobs_array.length; i++){
				tmp_arr = existing_jobs_array[i].split("*");
				tmp_arr_title = tmp_arr[0];
				tmp_arr_description = tmp_arr[1];
				if(tmp_arr_title == title){
					if(tmp_arr_description != description){
						remaining_job += existing_jobs_array[i] + "~";
					}
				}
				else{
					remaining_job += existing_jobs_array[i] + "~";
				}
			}
			//So i know if cookie must be deleted or not
			if(remaining_job.length == 0){
				date.setFullYear(date.getFullYear() - 1);
			}
			else{
				date.setFullYear(date.getFullYear() + 1);
				for(var j = 0; j < remaining_job.length - 1; j++){
					tmp_jobs += remaining_job[j];//So we dont add ~ symbol to the last job
				}
				remaining_job = tmp_jobs;
			}
			expire_date = "expires=" + date.toUTCString();
			document.cookie = "ToDoList=" + remaining_job + ";" + expire_date + ";path=/";
		 }
	}
$(document).ready(function(){
	var cookie = new cookie_object(),
		title,
		description;
	cookie.create_job_list();
	$("#add-job").click(function(){
        $(".add-job-form-body").fadeIn("fast");
		if(navigator.cookieEnabled == false){
			$("#notification").fadeIn("fast");
		}
    });
	$("#decline").click(function(){
		$(".add-job-form-body").fadeOut("fast",function(){
			$("#notification").css("display","none");
		});
		$("#job-title").val("");
		$("#job-description").val("");
	});
	$("#accept").click(function(){
		title = $("#job-title").val();
		description = $("#job-description").val();
		cookie.succesfull(title, description);
	});
    $(".remove").click(function(){
		var this_job = $(this).parent(),
			title,
			description;
		title = $(this_job).children("h1").text();
		description = $(this_job).children(".description").text();
		cookie.delete_job(title, description);
    });
})