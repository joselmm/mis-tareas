	const chatContent = document.getElementById('ventana-chat-content');
	const entradaTexto = document.getElementsByName('mensaje-a-dialogflow')[0];
	const btnEnviar = document.getElementById('btn-enviar');

	btnEnviar.addEventListener('click', enviarMensaje)

	function enviarMensaje(){

		
		mostrarMensajeEnLaVentana(
			{
				message:entradaTexto.value,
				claseMensajeSpan: 'mensajes-enviados',
				claseMensajeDiv: 'div-mensaje-enviado'
			}
			)

		hacerScrollChat ()

		const body = 
				{
					"senderName":"José Cuentas",
					"senderMessage":entradaTexto.value,
					"messageDateTime":"1637982025602"
				}

				fetch("https://servidorconcors.herokuapp.com/",{
					method:"POST",
					headers:{
						'Content-Type':'application/json'
					},
					body:JSON.stringify(body)
				})
				.then((res)=>{
					return res.text()
				})
				.then(text=>{
					
					const jsAHtml = text.replace(/\\n/g, '<br>');
					const json = JSON.parse(jsAHtml);
					console.log(json)
					const mensajeRecibido = json.data[0].message;

					mostrarMensajeEnLaVentana(
						{
							message:mensajeRecibido,
							claseMensajeDiv: 'div-mensaje-recibido',
							claseMensajeSpan: null
							
						}
						);
					hacerScrollChat ()
				})
	}


	function mostrarMensajeEnLaVentana(options) {
		const {message, claseMensajeSpan, claseMensajeDiv} = options;
		const mensajeEnviadoDiv = document.createElement('div');
		mensajeEnviadoDiv.setAttribute('class', claseMensajeDiv)
		const mensajeEnviadoSpan = document.createElement('span');
		mensajeEnviadoSpan.innerHTML=message
		mensajeEnviadoDiv.appendChild(mensajeEnviadoSpan)		
		mensajeEnviadoSpan.classList.add(claseMensajeSpan)	
		chatContent.appendChild(mensajeEnviadoDiv)
	}



	function hacerScrollChat () {
		let alturaVentana = 0;
		for (var i = 0; i < chatContent.children.length; i++) {
			alturaVentana += chatContent.children[i].clientHeight
		};

		alturaVentana;
		chatContent.scroll(0, alturaVentana)
	}