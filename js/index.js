var errores= [];
var opciones=['Elija su ciudad','Helsinki','Ubatuba','Pagoa','Cucamonga'];
var slideimgs = ['imgs/slider1.jpg','imgs/slider2.jpg','imgs/slider3.jpg'];
var imagen = $('#slider-img');
var k=0;
var interval;

$(document).ready(function(){ //ESPERA QUE CARGUE HTML ANTES DE EMPEZAR A ANDAR TODO ESTO. SÓLO ANDA LO QUE ESTÁ ACÁ.

	errores=[];//slider(){};
	var select = $('#ciudad'); 
	for (i=0;i< opciones.length;i++){
		value= i; //generalmente se pone i + 1 para no usar el cero, YO NECESITO EL CERO PARA QUE SER SI SABE ELIGIÓ O NO.
		var opcion = '<option value="'+ value +'">'+opciones[i]+'</option>';
		select.append(opcion);

	}//for para select


	//
	$('#gracias').hide();
	$('#ingresar').on('click', function(){
		errores=[];
		console.log('funcionó!');
		validarEmail($('#email').val());
		validarNombre($('#nombre').val());
		validarEdad($('#edad').val());
		validarSelect($('#ciudad').val());
		if (errores.length == 0){ //si el array de los errores es igual a cero, SUBMIT
			//$('#3').submit();
			var datos=$('#3').serialize();
			console.log(datos);
			$.ajax({
				url: "http://mariabelenalegre.com/ada-api/api.php",
				type:"post",
				success: function (response){}//function RESPONSE

			});//termina ajax
			/*$('#gracias').show();  //método de jquery para mostrar
			$('#gracias').append('<p>¡Gracias!</p>');*/
			$('#3')[0].reset();
			console.log('estoy');
			$('#gracias').html('');
			$('#gracias').append('<p>¡Gracias!</p>');
		}else{
			$('#gracias').show(); //sino, recorrer array: en el div con ID error pusheo los errores nombrados en las funciones
			for (i=0;i<errores.length;i++){ 
				$('#gracias').append(errores[i]);
		   }
		}

		/*$('#limpiar').on('click',function(){
			$('#3')[0].reset();
			console.log('estoy');
			$('#gracias').html('');
		});//LIMPIAR*/

	});//termina function de INGRESAR
		$(".mov").on("click", function(){
			//e.preventDefault();
			idA= $(this).data('id');
			id='#'+ idA;
			$("html,body").animate({scrollTop:$(id).offset().top},800)
		});
			
			
	
		//termina función scroll
		//función VER MÁS BOTON
				$(".verMas").on("click",function(){
			var vid= $(this).data('id');
			var id= '#'+ vid;
			if($(id).css('display')==="none"){
				$('.extra').hide();
				$(id).css('display','block');
			}else{
				if($(id).css('display')==="block"){
				$(id).css('display','none');
			}
		}
	});
		//función MODAL		
		$('.chiquita').on('click', function(){	
		id = $(this).data('id');
		img = id;
		console.log('estoy');
		$('#imagenGrande').attr('src', img);
		
	});
		//SLIDER
		slider();

		$('#sliderlink').on('click', function(){
				//console.log('estoy');
				slide();
	
			});

});//TERMINA DOCUMENT READY
//DESPUÉS DE ACÁ, VAN LAS FUNCIONES QUE LLAMO ARRIBA.
	//function (validarSelect){}

	//FUNCTION SLIDE
function slide() {
$(imagen).fadeOut('slow', function() {
	//console.log('hola');
	if (k==(slideimgs.length-1)) {
		k=0;
	} else {k++};

	console.log(slideimgs[k]);	
	$(imagen).attr('src',slideimgs[k]).fadeIn('slow');

	});
};

 //FUNCTION SLIDER!
function slider() {
	interval = setInterval(slide, 4000);
	//console.log('slider');
	$('#sliderlink').on({
		mouseover: function(){
		clearInterval(interval);		
		},

		mouseleave: function(){
		slider();		
		}
	});

};


	function validarSelect(opcion){
		if (opcion == 0){
			console.log('ciudad vacia');
			errores.push("<li>Elija una ciudad</li>");
		}else{
			console.log('ciudad valida');
			return true;
		}return false;

	}
	
	function validarEmail(email) { //Funcion para validar formato de mail//
		var expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; //Expresion regular para chequear formato mail//
		if (email == '' || email == null) {
			console.log('mail vacio');
			errores.push("<li>Por favor completa tu e-mail</li>");
		}else{
			if (!expr.test(email)) {
				console.log('mail invalido');
				errores.push("<li>Por favor ingresá un email válido</li>");
			}else{
				console.log('mail valido');
				return true;
			}
		}return false;
	} //Fin validarEmail//

	function validarNombre(nombre){ //Funcion para validar el nombre//
		if(nombre == '' || nombre == null){
			console.log('nombre vacio');
			//error.style.display = 'block'; //.style > es para cambiar el css
			//error.innerHTML += '<li>Por favor completa el nombre</li>';
			errores.push("<li>Por favor completa tu nombre</li>");
		} 
		else {
			if (!soloLetras(nombre)) {
				console.log('Nombre invalido');
				//error.style.display = 'block';
				//error.innerHTML += '<li>Por favor ingresá un nombre valido</li>';//.innerHTML para poner algo dentro de html
				errores.push("<li>Por favor ingresa tu nombre valido</li>");
			} else {
			console.log('nombre valido');
			return true;
			}
		}return false;
	} //Fin validarNombre//

		function validarEdad(edad) { //Funcion para validar edad//
		if (edad == '' || edad == null) {
			console.log('Edad vacia');
			errores.push("<li>Por favor completa tu edad</li>");
		}else{
			if(isNaN(parseInt(edad))) {
				console.log('Edad invalida');
				errores.push("<li>Por favor ingresa una edad valida</li>");
			} else {
				if (parseInt(edad) > 120 || parseInt(edad) < 18) {
					console.log('Edad invalida');
					errores.push("<li>Por favor ingresa una edad valida</li>");
				}else{
					console.log('Edad valida');
					return true;
				}
			}return false;
		}//validar edad
}
function soloLetras(x) { //Valido apellido y nombre con expresion regular//

	expr = /^([a-zA-Z\s]{3,50})*$/ ; //expresion regular de intervalos de letras min 3 caracteres max 50//
	if(expr.test(x)) {//test > para matchear var y expresión regular. expresionregular.test(variable).
		return true;
	}
	return false;
	}