
$("#form_register").validate({
	rules: {
		vc__pwd: "required",
		vc_password_repeat: {
			equalTo: "#vc__pwd"
		},
		vc__email: "required",
		vc_email_repeat: {
			equalTo: "#vc__email"
		}
	},
	submitHandler:function(form){
		
		var vc_name       = $("#vc_name").val();
		var vc_last_name  = $("#vc_last_name").val();
		var vc__email     = $("#vc__email").val();
		var vc__pwd       = $("#vc__pwd").val();

		var obj = { "command":"user", "action":"set_user", "vc_name": vc_name, "vc_last_name": vc_last_name, "vc_email": vc_email, "vc_password": vc_password};

		var url = document.referrer+"apis/";
		
		//~ alert(url);
		$.post(url, obj, function(data){
		  alert(data);
		});
		
	}
});

