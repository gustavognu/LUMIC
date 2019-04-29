<!DOCTYPE html>
<html lang="en" class="login_page">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Robie - Login</title>

    <!-- Bootstrap framework -->
    <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css" />
    <!-- theme color-->
    <link rel="stylesheet" href="css/blue.css" />
    <!-- tooltip -->
    <link rel="stylesheet" href="lib/qtip2/jquery.qtip.min.css" />
    <!-- main styles -->
    <link rel="stylesheet" href="css/style.css" />

    <!-- favicon -->
    <link rel="shortcut icon" href="../favicon.ico" />

    <link href='https://fonts.googleapis.com/css?family=PT+Sans' rel='stylesheet' type='text/css'>

    <!--[if lt IE 9]>
            <script src="js/ie/html5.js"></script>
            <script src="js/ie/respond.min.js"></script>
        <![endif]-->

</head>

<body>

    <div class="login_box">

          <form action="#" id="form_login" method="post">
            <div class="top_b">Login Robie</div>
            <div class="cnt_b">
                <div class="form-group">
                    <div class="input-group">
                        <span class="input-group-addon input-sm"><i class="glyphicon glyphicon-user"></i></span>
                        <input class="form-control input-sm" type="text" id="vc_user" name="vc_user" placeholder="Usuario" value="" title="Requerido" required />
                    </div>
                </div>
                <div class="form-group">
                    <div class="input-group">
                        <span class="input-group-addon input-sm"><i class="glyphicon glyphicon-lock"></i></span>
                        <input class="form-control input-sm" type="password" id="vc_password" name="vc_password" placeholder="Contraseña" title="Requerido" value="enterrobie" required />
                    </div>
                </div>
            </div>
            <div class="btm_b clearfix">
               <button class="btn btn-primary btn-sm pull-right" id="submit" type="submit">Iniciar sesión</button>
               <br>
               <div class="cnt_b" style="text-align:center;">
                    <span class="str error_login hide">
                    El nombre de usuario que ingresaste no pertenece a ninguna cuenta. Comprueba el nombre de usuario y vuelve a intentarlo.
                    </span>
                </div>
            </div>
        </form>
               
        <div class="links_b links_btm clearfix">
            <span class="linkform hide"><a href="#">¿Olvidaste tu contraseña?</a></span>
            <span class="linkform" style="display:none">Never mind, <a href="login.html#login_form">send me back to the sign-in screen</a></span>
        </div>

    </div>

    <script src="js/jquery.min.js"></script>
    <script src="js/jquery.actual.min.js"></script>
    <script src="dist/js/jquery.validate.min.js"></script>
    <script src="bootstrap/js/bootstrap.min.js"></script>
    <script>
        $(document).ready(function(){
            $("#form_login").validate(
            {
                submitHandler:function(form){
                    
                    $("#submit").text("Cargando");
                    
                    var vc_user    = $("#vc_user").val();
                    var vc_password = $("#vc_password").val();
                    $.post( "../api_robie/controler/request_api/request.php", 
                        {     "command":"login"
                            , "action":"get_login_root"
                            , "vc_user": vc_user
                            , "vc_password": vc_password
                            , "vc_token_firebase": "----------------------------------------"
                        }
                        , function( data )
                          {
                            var result = JSON.stringify(result);
                            var json   = JSON.parse(data);
                            
                            console.log(json);
                            if (json["b_status"]){
                                $.post("../api_robie/controler/dashboard/action.php", 
                                {
                                    "set_session":true,
                                    "id_root": json.data.id_root, 
                                    "id_profile": json.data.id_profile, 
                                    "vc_name": json.data.vc_name, 
                                    "vc_last_name": json.data.vc_last_name, 
                                    "vc_photo": json.data.vc_photo, 
                                    "vc_user": json.data.vc_user
                                },
                                );
                                
                                $("#get_error").addClass();
                                window.location= "../dashboard.php#dashboard";
                               
                            }
                            else{
                                $("#submit").text("Iniciar sesión");
                                $(".error_login").removeClass("hide");
                            }
                            
                         }
                   );
                }

            }); 
        });
    </script>
</body>
</html>

