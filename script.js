/*=========================================
  NUTRILAB - BLOQUE 1
  VARIABLES Y ELEMENTOS DEL DOM
=========================================*/

// ---------- Plato Inteligente ----------
const botonesAlimentos = document.querySelectorAll(".alimento");
const botonAnalizar = document.getElementById("analizar-plato");
const resultadoPlato = document.getElementById("resultado-plato");

// ---------- Juegos ----------
const preguntaClasificacion = document.getElementById("pregunta-clasificacion");
const opcionesClasificacion = document.querySelectorAll(".opcion-juego");
const resultadoJuego = document.getElementById("resultado-juego");
const barraProgreso = document.getElementById("progreso-juego");

const preguntaMito = document.getElementById("pregunta-mito");
const respuestasMito = document.querySelectorAll(".respuesta-mito");
const resultadoMito = document.getElementById("resultado-mito");

// ---------- Autoevaluación ----------
const respuestasAuto = document.querySelectorAll(".respuesta-auto");
const botonResultadoAuto = document.getElementById("resultado-auto");
const resultadoAuto = document.getElementById("resultado-autoevaluacion");

// ---------- NutriBot ----------
const mensajesBot = document.getElementById("mensajes-bot");
const preguntaBot = document.getElementById("pregunta-bot");
const enviarBot = document.getElementById("enviar-bot");

// ---------- Bienestar ----------
const entradaEmocional = document.getElementById("entrada-emocional");
const mensajeEmocional = document.getElementById("mensaje-emocional");

// ---------- Certificado ----------
const nombreParticipante = document.getElementById("nombre-participante");
const generarCertificado = document.getElementById("generar-certificado");
const nombreCertificado = document.getElementById("nombre-certificado"); 
 /*=========================================
   NUTRILAB - BLOQUE 2
   PLATO INTELIGENTE
=========================================*/


let alimentosSeleccionados = [];


// Seleccionar alimentos
botonesAlimentos.forEach(boton => {

    boton.addEventListener("click", () => {

        const alimento = boton.dataset.alimento;


        if(alimentosSeleccionados.includes(alimento)){

            alimentosSeleccionados =
            alimentosSeleccionados.filter(item => item !== alimento);

            boton.classList.remove("seleccionado");

        } else {

            alimentosSeleccionados.push(alimento);
            boton.classList.add("seleccionado");

        }

    });

});



// Analizar plato
if(botonAnalizar){

    botonAnalizar.addEventListener("click", () => {


        if(alimentosSeleccionados.length === 0){

            resultadoPlato.innerHTML = `
            <h3>Análisis nutricional</h3>
            <p>
            Selecciona algunos alimentos para analizar tu plato.
            </p>
            `;

            return;

        }



        let mensaje = "";



        const tieneProteina = alimentosSeleccionados.some(a =>
            [
                "pollo",
                "pescado",
                "huevo",
                "carne",
                "lentejas",
                "frejoles",
                "yogur"
            ].includes(a)
        );



        const tieneCarbohidrato = alimentosSeleccionados.some(a =>
            [
                "arroz",
                "papa",
                "camote",
                "avena",
                "quinua",
                "pan-integral",
                "pasta"
            ].includes(a)
        );



        const tieneFrutaVerdura = alimentosSeleccionados.some(a =>
            [
                "manzana",
                "platano",
                "naranja",
                "fresa",
                "papaya",
                "mandarina",
                "lechuga",
                "zanahoria",
                "brocoli",
                "tomate",
                "espinaca"
            ].includes(a)
        );




        if(tieneProteina && tieneCarbohidrato && tieneFrutaVerdura){

            mensaje = 
            "¡Excelente! Tu plato tiene variedad de grupos alimenticios y es equilibrado.";

        } 
        else {

            mensaje =
            "Tu plato puede mejorar agregando más variedad de alimentos.";

        }



        resultadoPlato.innerHTML = `

        <h3>Análisis nutricional</h3>

        <p>
        Alimentos seleccionados:
        ${alimentosSeleccionados.join(", ")}
        </p>

        <p>
        ${mensaje}
        </p>

        `;



    });

}
 /*=========================================
   NUTRILAB - BLOQUE 3
   JUEGOS INTERACTIVOS
=========================================*/


// ===============================
// JUEGO 1: CLASIFICACIÓN
// ===============================


const preguntasClasificacion = [
    {
        alimento:"Manzana",
        respuesta:"Fruta"
    },
    {
        alimento:"Pollo",
        respuesta:"Proteína"
    },
    {
        alimento:"Arroz",
        respuesta:"Carbohidrato"
    },
    {
        alimento:"Lechuga",
        respuesta:"Verdura"
    },
    {
        alimento:"Huevo",
        respuesta:"Proteína"
    }
];


let preguntaActual = 0;
let puntajeJuego = 0;



function cargarPregunta(){

    if(!preguntaClasificacion){
        return;
    }


    preguntaClasificacion.innerHTML =
    `¿A qué grupo pertenece: <b>${preguntasClasificacion[preguntaActual].alimento}</b>?`;

}


cargarPregunta();



opcionesClasificacion.forEach(opcion => {


    opcion.addEventListener("click", () => {


        opcionesClasificacion.forEach(btn =>
            btn.classList.remove("seleccionada")
        );


        opcion.classList.add("seleccionada");



        if(opcion.textContent === preguntasClasificacion[preguntaActual].respuesta){

            resultadoJuego.textContent =
            " ¡Correcto!";

            puntajeJuego++;

        } 
        else {

            resultadoJuego.textContent =
            " Intenta aprender más sobre este grupo.";

        }



        let progreso =
        ((preguntaActual + 1) / preguntasClasificacion.length) * 100;


        if(barraProgreso){

            barraProgreso.style.width = progreso + "%";

        }



        setTimeout(() => {


            preguntaActual++;


            if(preguntaActual >= preguntasClasificacion.length){

                resultadoJuego.textContent =
                `🎉 Juego terminado. Puntaje: ${puntajeJuego}/${preguntasClasificacion.length}`;

                return;

            }


            cargarPregunta();


            opcionesClasificacion.forEach(btn =>
                btn.classList.remove("seleccionada")
            );


        },1000);



    });


});





// ===============================
// JUEGO 2: MITO O REALIDAD
// ===============================


const preguntasMito = [

    {
        pregunta:"Beber agua ayuda al funcionamiento del organismo.",
        respuesta:"Verdadero"
    },

    {
        pregunta:"Una alimentación saludable significa eliminar todos los alimentos que gustan.",
        respuesta:"Falso"
    },

    {
        pregunta:"Las frutas y verduras aportan vitaminas y minerales.",
        respuesta:"Verdadero"
    },

    {
        pregunta:"Dormir bien no tiene relación con el bienestar.",
        respuesta:"Falso"
    }

];


let mitoActual = 0;



function cargarMito(){

    if(!preguntaMito){
        return;
    }


    preguntaMito.textContent =
    preguntasMito[mitoActual].pregunta;

}


cargarMito();



respuestasMito.forEach(respuesta => {


    respuesta.addEventListener("click", () => {


        respuestasMito.forEach(btn =>
            btn.classList.remove("seleccionada")
        );


        respuesta.classList.add("seleccionada");



        if(respuesta.textContent === preguntasMito[mitoActual].respuesta){

            resultadoMito.textContent =
            " ¡Respuesta correcta!";

        }
        else{

            resultadoMito.textContent =
            " Esa respuesta es incorrecta.";

        }



        setTimeout(() => {


            mitoActual++;


            if(mitoActual >= preguntasMito.length){

                resultadoMito.textContent =
                " Terminaste el juego de Mito o Realidad.";

                return;

            }


            cargarMito();


            respuestasMito.forEach(btn =>
                btn.classList.remove("seleccionada")
            );


        },1000);



    });


});
/*=========================================
   NUTRILAB - BLOQUE 4
   AUTOEVALUACIÓN DE HÁBITOS
=========================================*/


let respuestasSeleccionadas = [];



// Seleccionar respuestas
respuestasAuto.forEach(respuesta => {


    respuesta.addEventListener("click", () => {


        const pregunta =
        respuesta.parentElement;



        const botones =
        pregunta.querySelectorAll(".respuesta-auto");



        botones.forEach(btn => {

            btn.classList.remove("seleccionada");

        });



        respuesta.classList.add("seleccionada");



        const respuestaTexto =
        respuesta.textContent.trim();



        const indicePregunta =
        [...document.querySelectorAll(".pregunta")]
        .indexOf(pregunta);



        respuestasSeleccionadas[indicePregunta] =
        respuestaTexto;



    });


});





// Mostrar resultado
if(botonResultadoAuto){


    botonResultadoAuto.addEventListener("click", () => {



        let puntaje = 0;



        respuestasSeleccionadas.forEach(respuesta => {


            if(respuesta === "Siempre"){

                puntaje += 2;

            }


            else if(respuesta === "A veces"){

                puntaje += 1;

            }


        });





        let recomendacion = "";



        if(puntaje >= 16){


            recomendacion =
            " ¡Excelente! Mantienes hábitos saludables y cuidas tu bienestar.";


        }


        else if(puntaje >= 9){


            recomendacion =
            " Vas por buen camino. Puedes mejorar algunos hábitos poco a poco.";


        }


        else{


            recomendacion =
            " Recuerda que pequeños cambios pueden ayudarte a mejorar tu alimentación y bienestar.";


        }





        resultadoAuto.innerHTML = `

        <h3>Resultado de tu autoevaluación</h3>

        <p>
        Puntaje obtenido: ${puntaje}
        </p>

        <p>
        ${recomendacion}
        </p>

        `;



    });


}
/*=========================================
  NUTRILAB - BLOQUE 5
  NUTRIBOT Y CHAT EMOCIONAL
=========================================*/


// ===============================
// NUTRIBOT MEJORADO
// ===============================

function responderBot(){

    let pregunta = preguntaBot.value.toLowerCase().trim();


    let respuesta =
    " Puedo ayudarte con temas de alimentación saludable, nutrientes, hábitos y bienestar. Intenta preguntarme sobre algún tema de nutrición.";



    const respuestasBot = [

        {
            palabras:["agua","hidratacion","hidratar"],
            respuesta:
            " El agua es fundamental para el organismo. Ayuda a regular la temperatura corporal, transportar nutrientes y mantener un buen funcionamiento del cuerpo."
        },


        {
            palabras:["vitamina","vitaminas"],
            respuesta:
            " Las vitaminas son nutrientes que ayudan al crecimiento, defensas y funcionamiento del organismo. Se encuentran en frutas, verduras y otros alimentos variados."
        },


        {
            palabras:["mineral","minerales","hierro","calcio"],
            respuesta:
            " Los minerales cumplen funciones importantes. Por ejemplo, el calcio ayuda a los huesos y dientes, mientras que el hierro participa en el transporte de oxígeno."
        },


        {
            palabras:["proteina","proteínas","proteinas"],
            respuesta:
            " Las proteínas ayudan a formar y reparar tejidos. Se encuentran en alimentos como huevo, pescado, pollo, carnes, legumbres y lácteos."
        },


        {
            palabras:["carbohidrato","carbohidratos"],
            respuesta:
            " Los carbohidratos proporcionan energía al cuerpo. Algunos ejemplos son arroz, papa, avena, quinua y pan integral."
        },


        {
            palabras:["fruta","frutas","verdura","verduras"],
            respuesta:
            " Las frutas y verduras aportan fibra, vitaminas, minerales y antioxidantes importantes para una alimentación equilibrada."
        },


        {
            palabras:["alimentacion saludable","comer sano","dieta saludable"],
            respuesta:
            " Una alimentación saludable incluye variedad de alimentos, suficiente agua y un equilibrio entre diferentes grupos alimenticios."
        },


        {
            palabras:["actividad fisica","ejercicio","deporte"],
            respuesta:
            " La actividad física ayuda al bienestar físico y emocional. Es importante combinar movimiento, descanso y buena alimentación."
        },


        {
            palabras:["trastorno","trastornos","alimenticio","alimenticios","anorexia","bulimia"],
            respuesta:
            " Los trastornos alimenticios son problemas relacionados con la alimentación y la relación con la comida. Es importante buscar apoyo profesional y hablar con personas de confianza."
        },


        {
            palabras:["obesidad","diabetes"],
            respuesta:
            " Algunas enfermedades relacionadas con la alimentación pueden prevenirse con hábitos saludables, controles médicos y una alimentación equilibrada."
        },


        {
            palabras:["habito","habitos","saludable","bienestar"],
            respuesta:
            " Los hábitos saludables incluyen alimentarse bien, dormir suficiente, mantenerse activo, hidratarse y cuidar las emociones."
        }

    ];



    respuestasBot.forEach(item => {


        item.palabras.forEach(palabra => {


            if(pregunta.includes(palabra)){

                respuesta = item.respuesta;

            }


        });


    });




    mensajesBot.innerHTML += `

    <p>
    <b>Tú:</b> ${pregunta}
    </p>

    <p class="mensaje-bot">
    ${respuesta}
    </p>

    `;



    preguntaBot.value = "";

}
if(enviarBot){

    enviarBot.addEventListener("click", responderBot);

}


if(preguntaBot){

    preguntaBot.addEventListener("keypress", function(e){

        if(e.key === "Enter"){
            responderBot();
        }

    });

}





// ===============================
// CHAT EMOCIONAL MEJORADO
// ===============================

function responderEmocion(){


    let texto = entradaEmocional.value.toLowerCase().trim();



    let mensaje = 
    " Gracias por compartir cómo te sientes. Recuerda que tus emociones son importantes y merecen ser escuchadas.";



    if(
        texto.includes("triste") ||
        texto.includes("llorar") ||
        texto.includes("mal") ||
        texto.includes("solo")
    ){

        mensaje =
        " Siento que estés pasando por eso. Está bien sentir emociones difíciles. Intenta hablar con alguien de confianza y darte un momento para cuidarte.";

    }



    else if(
        texto.includes("feliz") ||
        texto.includes("contento") ||
        texto.includes("bien")
    ){

        mensaje =
        " Me alegra mucho saberlo. Sigue disfrutando esos momentos positivos y continúa cuidando tu bienestar.";

    }



    else if(
        texto.includes("estres") ||
        texto.includes("tarea") ||
        texto.includes("cansado") ||
        texto.includes("presion")
    ){

        mensaje =
        " Cuando sientas mucha presión, intenta organizar tus actividades, descansar un poco y respirar. Cuidarte también es importante.";

    }



    else if(
        texto.includes("miedo") ||
        texto.includes("preocupado") ||
        texto.includes("preocupada")
    ){

        mensaje =
        " Es normal sentir preocupación a veces. Puedes expresar lo que sientes y buscar apoyo en personas que te hagan sentir acompañado.";

    }



    else if(
        texto.includes("comida") ||
        texto.includes("peso") ||
        texto.includes("alimentacion")
    ){

        mensaje =
        " Recuerda que la alimentación forma parte del cuidado personal. Tu cuerpo necesita nutrientes y también necesita que lo trates con respeto.";

    }



    else if(
        texto.includes("gracias")
    ){

        mensaje =
        " De nada. Me alegra poder acompañarte. Sigue cuidando tu mente y tu bienestar.";

    }



    mensajeEmocional.innerHTML = `

    <p>
    ${mensaje}
    </p>

    `;



    entradaEmocional.value = "";


}
/*=========================================
  NUTRILAB - BLOQUE 6
  CERTIFICADO Y FUNCIONES FINALES
=========================================*/


// ===============================
// GENERAR CERTIFICADO
// ===============================


if(generarCertificado){


    generarCertificado.addEventListener("click", () => {


        let nombre =
        nombreParticipante.value.trim();



        if(nombre === ""){


            nombreCertificado.textContent =
            "Escribe tu nombre";


            return;

        }



        nombreCertificado.textContent =
        nombre;



    });


}





// ===============================
// MENU ACTIVO AL DESPLAZARSE
// ===============================


const secciones =
document.querySelectorAll("section");


const enlacesMenu =
document.querySelectorAll(".menu a");



window.addEventListener("scroll", ()=>{


    let actual = "";



    secciones.forEach(seccion =>{


        const altura =
        seccion.offsetTop - 150;



        if(window.scrollY >= altura){

            actual = seccion.getAttribute("id");

        }


    });




    enlacesMenu.forEach(enlace =>{


        enlace.classList.remove("activo");



        if(enlace.getAttribute("href") === "#" + actual){


            enlace.classList.add("activo");


        }



    });



});






// ===============================
// MENSAJE INICIAL CONSOLA
// ===============================


console.log(
" NutriLab cargado correctamente"
);