
$("#form_login").validate(
{
    submitHandler:function(form){

        var vc_email    = $("#vc_email").val();
        var vc_password = $("#vc_password").val();
        
        $.post( "controler/request_api/request.php", 
            {     "command":"login"
                , "action":"get_login"
                , "vc_email": vc_email
                , "vc_password": vc_password
            }
            , function( data )
              {
				  
                var result = JSON.stringify(result);
                var json   = JSON.parse(data);
                
                 if (json["b_status"]){
 
                    $.post("controler/dashboard/action.php", 
                    {
                        "set_session":true,
                        "vc_name": json.data[0].vc_name, 
                        "vc_last_name": json.data[0].vc_last_name, 
                        "vc_photo": json.data[0].vc_photo, 
                        "vc_email": json.data[0].vc_email
                    },
                    );
                    
                    $("#get_error").addClass();
                    window.location= "dashboard.php";
                }
                else{
                    $("#get_error").removeClass("hide");
                }
                
             }
       );
    
    
    }
});

