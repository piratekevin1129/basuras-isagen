function loadImage(data){
    var img = new Image()
    img.onload = function(){
        img.onerror = null
        img.onload = null
        data.callBack()
    }
    img.onerror = function(){
        console.log("error cargando la imagen "+img.url)
        img.onerror = null
        img.onload = null
        data.callBack()
    }
    img.src = data.url
}

/////////////////////////////AUDIO/////////////////////////
function loadAudio(data){
    var url = data.src

    var audio_fx = null
    audio_fx = document.createElement('audio')
    audio_fx.setAttribute('src',url)
    audio_fx.load()
    audio_fx.addEventListener('loadeddata',function(){
        //alert("cargo")
        data.callBack(audio_fx)
    })
    audio_fx.addEventListener('error',function(){
        data.callBack(null)
    })
}

var cargador = getI('cargador')
var cargador_txt = getI('cargador_txt')
var cargador_barras = getI('cargador_cont').getElementsByTagName('div')
var animacion_cargador = null

function setCargador(){
    cargador.className = 'cargador_on'
    setCargadorText('Cargando...')
    animacion_cargador = setInterval(animacionCargador,200)
}

var secuencia = 0
function animacionCargador(){
    if(secuencia==0){
        cargador_barras[0].className = 'cargador_bateria_off'
        cargador_barras[1].className = 'cargador_bateria_off'
        cargador_barras[2].className = 'cargador_bateria_off'
        cargador_barras[3].className = 'cargador_bateria_off'
    }else if(secuencia==1){
        cargador_barras[0].className = 'cargador_bateria_off'
        cargador_barras[1].className = 'cargador_bateria_off'
        cargador_barras[2].className = 'cargador_bateria_off'
        cargador_barras[3].className = 'cargador_bateria_on'
    }else if(secuencia==2){
        cargador_barras[0].className = 'cargador_bateria_off'
        cargador_barras[1].className = 'cargador_bateria_off'
        cargador_barras[2].className = 'cargador_bateria_on'
        cargador_barras[3].className = 'cargador_bateria_on'
    }else if(secuencia==3){
        cargador_barras[0].className = 'cargador_bateria_off'
        cargador_barras[1].className = 'cargador_bateria_on'
        cargador_barras[2].className = 'cargador_bateria_on'
        cargador_barras[3].className = 'cargador_bateria_on'
    }else if(secuencia==4){
        cargador_barras[0].className = 'cargador_bateria_on'
        cargador_barras[1].className = 'cargador_bateria_on'
        cargador_barras[2].className = 'cargador_bateria_on'
        cargador_barras[3].className = 'cargador_bateria_on'
    }
    secuencia++
    if(secuencia==5){
        secuencia = 0
    }
}

function setCargadorText(txt){
    cargador_txt.innerHTML = txt
}

var element_loaded = 1
function setCargadorText2(){
    setCargadorText('Cargando '+(porcentaje_carga*element_loaded)+'%')
    element_loaded++
}

function unsetCargador(){
    clearInterval(animacion_cargador)
    animacion_cargador = null
    cargador.className = 'cargador_off'
}