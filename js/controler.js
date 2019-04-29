$(function() {
    "controler in(dadhboard.php)";
 
    /**
     * Gestión de eventos para el controlador
     * */
    $(window).bind('hashchange', function () {
        // android
        var ua = navigator.userAgent.toLowerCase();
        var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
        var get_width;
        
        // ipad
        // Para el uso dentro de los clientes web normales
        var isiPad = navigator.userAgent.match(/iPad/i) != null;

        // Para uso dentro iPad desarrollador UIWebView
        // Gracias a Andrew Coberturas!
        var ua = navigator.userAgent;
        var isiPad = /iPad/i.test(ua) || /iPhone OS 3_1_2/i.test(ua) || /iPhone OS 3_2_2/i.test(ua);

            
        if(isAndroid || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i)) {
            $("#msg").removeClass("hide");
        }else{
            $("#msg").show();
        }

        // Cuando el usuario hace click lo pasamos en TOP
        $("#toTop").click();
        
        // Limpiamos el contenido actual
        $("#load_page").html("");
        // Mostramo el mensaje de "Cargando"
        //* cargar el primer contenido de la página
        var hash = window.location.hash || '#dashboard';        
        // Varibles
        var get_hash     = hash.split("#");
        var set_hash     = get_hash[1];
        var clear_cache  = get_hash[2];
        var sub_entities = set_hash.split("/");
        var tmp = sub_entities;
        
        $("li").removeClass("active");
        $('.'+set_hash).addClass('active');
        
        if(sub_entities[1]===''){
			 window.history.back();
		}
		
		if(set_hash === "dashboard"){
			$("li").removeClass("active");
		}
				
        var debug= 0;
        var set_controler;
        var id;
        
        // Revisamos si tiene al menos un contenido
        var ancla= set_hash.indexOf("ancla");
        
        //* busqueda de subEntidades
        if (sub_entities[1]	){
            set_controler = sub_entities[0];
            set_hash      = sub_entities[0];
            send_id       = (sub_entities[1]) ? sub_entities[1] : '';
            categoria_id  = (sub_entities[1]) ? sub_entities[1] : '';
            clear_cache   = (sub_entities[2]) ? sub_entities[2] : '';
            
            var get_title = $('a[href$="'+set_hash+'"]:first').text();
            $("#set_new_title").html(get_title);
            
            (id!="undefined") ? id  = sub_entities[2]  : id = -1;
             if(ancla<1){
                $.post("api_robie/controler_page.php",{ // Params
                                              "controler"    : set_controler,
                                              "hash"         : set_hash,
                                              "clear_cache"  : clear_cache,
                                              "id"           : id, 
                                              "send_id"      : send_id,  
                                              "categoria_id" : categoria_id, 
                                              "debug"        : debug
                                            },
                function (data){
                    $("#load_pages").html(data);
                    if(isAndroid || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i)) {
                        $("#msg").removeClass("hide");
                        $("#server_error").removeClass("hide");
                    }else{
                        $("#msg").hide();
                    }
                });
            }
        }
        else{
            // Redireccion  Dashboad
            set_controler = (set_hash) ? set_hash : "dashboard";
            set_hash      = (set_hash) ? set_hash : "dashboard";            
            var get_title = $('a[href$="'+set_hash+'"]:first').text();
            $("#set_new_title").html(get_title);
                if( ancla < 1 ){
				
                $.post("api_robie/controler_page.php",{ "controler" : set_controler,
                                              "hash"      : set_hash,
                                              "id"        : id, 
                                              "debug"     : debug
                },function (data){
                   $("#load_pages").html(data);
                    if(isAndroid || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i)) {
                        $("#msg").removeClass("hide");
                        $("#server_error").removeClass("hide");
                    }else{
                        $("#msg").hide();
                    }
                });
            }
        }
        
      });
    $(window).trigger( "hashchange" );
}(jQuery));


