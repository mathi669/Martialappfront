$(document).on('ready', function(){
	/*PopUpLogin*/
	$('.btn-PopUpLogin').on('click', function(){
		var PopUpLogin=$('.PopUpLogin');
		if(PopUpLogin.css('display')=="none"){
			PopUpLogin.fadeIn('fast');
		}else{
			PopUpLogin.fadeOut('fast');
		}
	});
	/*Buscador movil*/
	$('.btn-search-mobile').on('click', function(){
		var search=$('.Search-mobile');
		if(search.css('display')=="none"){
			search.fadeIn('fast');
		}else{
			search.fadeOut('fast');
		}
	});
	/*Menu movil*/
	$('.show-menu-mobile').on('click', function(){
		var menu=$('.NavBar-Nav');
		if(menu.hasClass('NavBar-Nav-show')){
			menu.removeClass('NavBar-Nav-show');
		}else{
			menu.addClass('NavBar-Nav-show');
		}
	});
	/*Anuncios*/
	$('.btn-change-post').on('click', function(){
		var post=$('.post');
		if(post.hasClass('post-block')){
			post.removeClass('post-block');
			$(this).removeClass('fa-list').addClass('fa-th-large');
		}else{
			post.addClass('post-block');
			$(this).removeClass('fa-th-large').addClass('fa-list');
		}
	});
	/* Menus Desplegables*/
	$('.btn-dropdown-conatiner').on('click', function(){
		var containerDropdown=$(this).attr('data-drop-cont');
		$(containerDropdown).slideToggle('fast');
	});
	/*Input file*/
	$(".custom-input-file input:file").change(function(){
        $(".archivo").html($(this).val());
    });
    /*Mostrar respuesta de mensajes*/
    $('.btn-res').on('click', function(){
    	var resMsj=$(this).next('.res-msj');
    	resMsj.slideToggle('fast');
    });
});
(function($){
    $(window).load(function(){
        $(".menu-mobile-c").mCustomScrollbar({
            theme:"dark-thin",
            scrollbarPosition: "inside",
            autoHideScrollbar: true,
            scrollButtons:{ enable: true }
        });
    });
})(jQuery);

function procesarRegistro() {
    // Obtener los valores del formulario
    var nombre = $('#nombre').val();
    var apellidoPaterno = $('#apellidoPaterno').val();
    var apellidoMaterno = $('#apellidoMaterno').val();
    var fechaNacimiento = $('#fecha_nacimiento').val();
    var genero = $('#genero').val();
    var correo = $('#correo').val();
    var contraseña = $('#contraseña').val();
    // Guardar los datos en localStorage
    localStorage.setItem("nombre", nombre);
    localStorage.setItem("apellidoPaterno", apellidoPaterno);
    localStorage.setItem("apellidoMaterno", apellidoMaterno);
    localStorage.setItem("fechaNacimiento", fechaNacimiento);
    localStorage.setItem("genero", genero);
    localStorage.setItem("correo", correo);
    // Mostrar el nombre en la barra de navegación
    $('.NavBar-logo').text(nombre);
    // Ocultar el formulario de registro
    $('.container-login').hide();
}
$(document).ready(function() {
    // Manejar el envío del formulario de registro
    $('#formRegistro').submit(function(event) {
        event.preventDefault(); // Evitar el envío del formulario
        procesarRegistro(); // Procesar los datos del registro
    });
});

function mostrarDatosRegistro() {
    // Obtener los datos almacenados en localStorage
    var nombre = localStorage.getItem("nombre");
    var apellidoPaterno = localStorage.getItem("apellidoPaterno");
    var apellidoMaterno = localStorage.getItem("apellidoMaterno");
    var fechaNacimiento = localStorage.getItem("fechaNacimiento");
    var genero = localStorage.getItem("genero");
    var correo = localStorage.getItem("correo");
    // Mostrar los datos en la página de perfil del gimnasio
    $('#nombre').text(nombre);
    $('#apellidoPaterno').text(apellidoPaterno);
    $('#apellidoMaterno').text(apellidoMaterno);
    $('#fechaNacimiento').text(fechaNacimiento);
    $('#genero').text(genero);
    $('#correo').text(correo);
}

// Código para guardar la información del gimnasio cuando se registra
$(document).ready(function() {
    $('#btnRegistro').click(function() {
        var nombreGimnasio = $('#nombreGimnasio').val();
        var telefonoGimnasio = $('#telefonoGimnasio').val();
        var ubicacionGimnasio = $('#ubicacionGimnasio').val();

        // Guardar la información del gimnasio en localStorage
        localStorage.setItem('nombreGimnasio', nombreGimnasio);
        localStorage.setItem('telefonoGimnasio', telefonoGimnasio);
        localStorage.setItem('ubicacionGimnasio', ubicacionGimnasio);
    });
});

// Código para mostrar la información del gimnasio en la página de perfil del gimnasio
$(document).ready(function() {
    // Recuperar la información del gimnasio almacenada en localStorage
    var nombreGimnasio = localStorage.getItem('nombreGimnasio');
    var telefonoGimnasio = localStorage.getItem('telefonoGimnasio');
    var ubicacionGimnasio = localStorage.getItem('ubicacionGimnasio');

    // Mostrar la información del gimnasio en la página de perfil del gimnasio
    $('#nombreGimnasio').text(nombreGimnasio);
    $('#telefonoGimnasio').text(telefonoGimnasio);
    $('#ubicacionGimnasio').text(ubicacionGimnasio);
});


// Llamar a la función para mostrar los datos del registro cuando el documento esté listo
$(document).ready(function() {
    mostrarDatosRegistro();
});

// Este código se ejecutará cuando el DOM esté completamente cargado
$(document).ready(function() {
    // Evento que se activa cuando cambia la selección del menú desplegable
    $('#tipoRegistro').change(function() {
        // Obtener el valor seleccionado
        var seleccion = $(this).val();

        // Ocultar todos los campos de registro
        $('#camposRegistro').hide();
        $('#camposGimnasio').hide();
        $('#camposGenero').hide(); // Ocultar los campos de género

        // Si se selecciona "Gimnasio", mostrar campos específicos de gimnasio
        if (seleccion === 'Gimnasio') {
            $('#camposRegistro').show();
            $('#camposGimnasio').show();
        } else if (seleccion === 'Usuario') {
            // Si se selecciona "Usuario", mostrar campos de usuario
            $('#camposRegistro').show();
            $('#camposGenero').show(); // Mostrar los campos de género
        } else {
            // Si se selecciona "Selecciona una opción", ocultar todos los campos y mostrar mensaje de error
            $('#camposRegistro').hide();
            $('#camposGimnasio').hide();
            $('#camposGenero').hide(); // Ocultar los campos de género
            alert("Por favor, seleccione la opción de Gimnasio o Usuario.");
        }
    });
});


// Función para cerrar sesión
function cerrarSesion() {
    // Eliminar el nombre del gimnasio de localStorage
    localStorage.removeItem("nombreGimnasio");
    // Redirigir a la página de inicio de sesión
    window.location.href = "login.html"; // Cambia "inicio_sesion.html" por la ruta correcta de tu página de inicio de sesión
}

// Asignar la función cerrarSesion al botón de cerrar sesión
$("#btnCerrarSesion").click(cerrarSesion);

document.addEventListener('DOMContentLoaded', function() {
    // Agrega un evento de cambio al menú desplegable para seleccionar el tipo de inicio de sesión
    document.getElementById('userType').addEventListener('change', function() {
        var selectedOption = this.value;
        if (selectedOption === 'usuario') {
            document.getElementById('usuarioForm').style.display = 'block';
            document.getElementById('gimnasioForm').style.display = 'none';
            document.getElementById('loginForm').action = 'iniciousuario.html';
        } else if (selectedOption === 'gimnasio') {
            document.getElementById('usuarioForm').style.display = 'none';
            document.getElementById('gimnasioForm').style.display = 'block';
            document.getElementById('loginForm').action = 'perfilgimnasio.html';
        } else {
            document.getElementById('usuarioForm').style.display = 'none';
            document.getElementById('gimnasioForm').style.display = 'none';
            document.getElementById('loginForm').action = '';
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Obtener el parámetro de la URL
    var urlParams = new URLSearchParams(window.location.search);
    var clase = urlParams.get('clase');
    
    // Mostrar la clase en el banner si existe
    if (clase) {
        document.getElementById('claseNombre').innerText = clase;
    }
});