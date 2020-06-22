var data_scorm = null
var score = 100
var limit_score = 100
var total_attemps = 1
var tiempo_anterior = 0//en segundos
var tiempos = []
var name_game = 'Residuos'

//var intentos_txt = document.getElementById('intentos-txt')

function initScorm(){
	startTimeStamp = new Date();

	//iniciar
	ScormProcessInitialize();
	
	//getNames()
	console.log("vamos a cargar los datos")
	getScorm()

}

function getScorm(){
	//se tiene que poner si o si
	var status_ = ScormProcessGetValue("cmi.core.lesson_status");
    if (status_ == "not attempted"){
        ScormProcessSetValue("cmi.core.lesson_status", "incomplete");
        ScormProcessCommit()
	}
	
	var data_ = ScormProcessGetValue("cmi.suspend_data")
	var tiempo_ = ScormProcessGetValue("cmi.core.total_time")
	console.log("----data----")
	console.log(data_)
	console.log("----tiempo----")
	console.log(tiempo_)
	console.log("----lesson---")
	console.log(status_)
	
	if(data_!=null&&data_!=""&&data_!=undefined){
		var suspend_parsed = JSON.parse(data_)
		
		data_scorm = suspend_parsed
		total_attemps = data_scorm.total_attemps
		total_attemps++
		
        tiempos = data_scorm.tiempos
        console.log("---tiempos---")
        console.log(tiempos)
        		
	}else{
		console.log("no definida suspend data")
	}

	tiempo_anterior_txt.innerHTML = 'Mejor puntaje - '+tiempo_anterior
    //intentos_txt.innerHTML = 'Intento #'+total_attemps
    console.log('Intento #'+total_attemps)
	startGame()
}

function guardarScorm(finish){
	console.log("vamos a guardar los datos")
	var data_prepare = prepareSaveScorm()
	
	ScormProcessSetValue("cmi.suspend_data",data_prepare.data)

	if(finish){
		console.log("completaa")
		reachedEnd = true
		ScormProcessSetValue("cmi.core.exit", "");
		ScormProcessSetValue("cmi.core.lesson_status", "completed");

		ScormProcessSetValue("cmi.core.score.raw", score);//calificacion
		ScormProcessSetValue("cmi.core.score.min", "0");
		ScormProcessSetValue("cmi.core.score.max", "100");
		
		/*if (score >= limit_score){
			ScormProcessSetValue("cmi.core.lesson_status", "passed");
		}else{
			ScormProcessSetValue("cmi.core.lesson_status", "failed");
		}*/
	}else{
		//no finaliza
	}
	
	ScormProcessCommit()
	console.log("Los datos han sido guardados")
	
}

function prepareSaveScorm(){
	tiempos.push({seg:time_scorm,score:0})
	var preparar_data = {
		tiempos:tiempos,
        total_attemps:total_attemps,
        nombrejuego:name_game
	}
	
    var suspend = JSON.stringify(preparar_data);
	return {data:suspend}
}


function getTimeText(secs){
    var minutos = 0
    var horas = 0
    var seconds = 0

    var segundos_txt = ""
    var horas_txt = ""
    var minutos_txt = ""

    if(secs<60){
        horas = 0
        minutos = 0
        seconds = secs
    }else{
        minutos = parseInt(secs/60)
        seconds = secs-(minutos*60)

        if(minutos>=60){
            horas = parseInt(minutos/60)
            minutos = minutos-(horas*60)
        }
    }

    if(horas>=0&&horas<=9){
        horas_txt = "0"+horas
    }else{
        horas_txt = horas
    }
    if(minutos>=0&&minutos<=9){
        minutos_txt = "0"+minutos
    }else{
        minutos_txt = minutos
    }
    if(seconds>=0&&seconds<=9){
        segundos_txt = "0"+seconds
    }else{
        segundos_txt = seconds
    }

    return horas_txt+':'+minutos_txt+':'+segundos_txt
}

var time_scorm = 0
var animacion_reloj = null
function iniciarReloj(){
	animacion_reloj = setInterval(animacionReloj,1000)
}
function pararReloj(){
	clearInterval(animacion_reloj)
}
function animacionReloj(){
	time_scorm+=1
}
function getRelojTime(){
	return time_scorm
}