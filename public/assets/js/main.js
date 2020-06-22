var i = 0
var j = 0
var k = 0

function getRand(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
}
function getI(idname){
    return document.getElementById(idname)
}

function fillRandomArray(len){
    var new_arr = []
    while(new_arr.length<len){
        var rand = getRand(0,(len-1))
        if(!new_arr.includes(rand)){
            new_arr.push(rand)
        }
    }
    return new_arr
}
function unorderArray(arr){
    var nueva = fillRandomArray(arr.length)
    var new_arr = []
    for(var n = 0;n<nueva.length;n++){
        new_arr.push(arr[nueva[n]])
    }
    return new_arr
}

var game_width = 845
var game_height = 507

var pre_residuos = []
var residuos = []
var num_rand = 4

function findResiduoData(id,cat){
    var data = null
    for(k = 0;k<residuos.length;k++){
        if(residuos[k].id==id&&residuos[k].categoria==cat){
            data = residuos[k]
        }
    }
    return data
}

function isInArray(obj,array){
    var is_obj = false
    for(k = 0;k<array.length;k++){
        if(array[k].cat==obj.cat&&array[k].ind==obj.ind){
            is_obj = true
        }
    }
    return is_obj
}

function loadResiduos(){
    var categorias_orden = []
    for(i = 0;i<residuos_data.length;i++){
        for(j = 0;j<num_rand;j++){
            categorias_orden.push(i)
        }
    }
    var categorias_desorden = unorderArray(categorias_orden)
    
    //sacar los necesarios
    var c = 0
    while(pre_residuos.length<categorias_desorden.length){
        var rand_cat = categorias_desorden[c]
        var article = getRand(0,(residuos_data[rand_cat].basuras.length-1))
        var obj = {cat:rand_cat,ind:article}
        if(!isInArray(obj,pre_residuos)){
            pre_residuos.push(obj)
            c++
        }
    }
    //console.log(pre_residuos)

    for(i = 0;i<pre_residuos.length;i++){
        var cat = pre_residuos[i].cat
        var ind = pre_residuos[i].ind
        var residuos_categoria = residuos_data[cat].basuras[ind]
        residuos.push({
            id:residuos_categoria.id,
            nombre:residuos_categoria.nombre,
            descripcion:residuos_categoria.descripcion,
            src:residuos_categoria.img,
            categoria:residuos_data[cat].categoria,
            width:0,
            height:0,
            width_borde:0,
            height_borde:0
        })
    }
}

function repeatUnderground(){
    getI('underground_mp3').play()
}

function loadResiduo(r){
    if(r==residuos.length){
        printResiduos()
        fillCargador()

        setCargadorText('Haz click para comenzar')
        cargador.onclick = function(){
            getI('underground_mp3').play()
            setMensaje({msg:'Deposita en las canecas los residuos que correspondan <span>según su tipo</span>'})
            unsetCargador()

            iniciarReloj()
        }
        
    }else{
        var image = new Image()
        image.onload = function(){
            image.onload = null
            image.onerror = null
            image = null

            residuos[r].width = this.width
            residuos[r].height = this.height

            var image2 = new Image()
            image2.onload = function(){
                image2.onload = null
                image2.onerror = null
                image2 = null

                residuos[r].width_borde = this.width
                residuos[r].height_borde = this.height
                setCargadorText2()
                loadResiduo((r+1))
            }
            image2.onerror = function(){
                
            }
            image2.src = 'public/assets/basuras/marcos/'+residuos[r].src+'.png'
        }
        image.onerror = function(){
            
        }
        image.src = 'public/assets/basuras/'+residuos[r].src+'.png'
    }
}

var residuos_seleccionados = []

function printResiduos(){
    for(i = 0;i<residuos.length;i++){
        var cat = residuos[i].categoria
        var id = residuos[i].id
        var residuo_info = findResiduoData(id,cat)
            
        var div_residuo = document.createElement('div')
        div_residuo.className = 'basura_cont'
        var id_name = 'basura_id_'+id+'_'+cat
        div_residuo.id = id_name

        var div_imagen = document.createElement('div')
        div_imagen.className = 'basura_cont_imagen'
        var div_marco = document.createElement('div')
        div_marco.className = 'basura_cont_marco'

        var image_producto = document.createElement('div')
        image_producto.style.width = residuo_info.width+'px'
        image_producto.style.height = residuo_info.height+'px'
        image_producto.style.backgroundImage = 'url(public/assets/basuras/'+residuo_info.src+'.png)'

        if(ismobile){
            image_producto.setAttribute('onclick',"clickBasura(event,'"+id_name+"',"+cat+","+id+")")
        }else{
            image_producto.setAttribute('onmouseover',"overBasura(this,'"+id_name+"','"+residuo_info.nombre+"')")
            image_producto.setAttribute('onmouseout',"outBasura('"+id_name+"','"+residuo_info.nombre+"')")
            image_producto.setAttribute('onmousedown',"downBasura(event,"+residuo_info.id+","+cat+")")
        }
        
        var image_borde = document.createElement('img')
        image_borde.src = 'public/assets/basuras/marcos/'+residuo_info.src+'.png'
        
        div_imagen.appendChild(image_producto)
        div_marco.appendChild(image_borde)
        
        div_residuo.appendChild(div_marco)
        div_residuo.appendChild(div_imagen)

        getI('contenedor_basuras').appendChild(div_residuo)
    }
    /*var clear_div = document.createElement('div')
    clear_div.style.clear = 'both'
    getI('contenedor_basuras').appendChild(clear_div)*/
}

function overBasura(img,id_name,label_name){
    over_mp3.currentTime = 0
    over_mp3.play()
    var basura_cont = getI(id_name)
    var marco = basura_cont.getElementsByClassName('basura_cont_marco')[0]
    marco.style.opacity = 1

    var label = getI('basura_label')
    label.innerHTML = label_name
    
    var width_label = label.offsetWidth
    var height_label = label.offsetHeight
    var x_img = img.getBoundingClientRect().left
    var y_img = img.getBoundingClientRect().top
    var w_img = img.getBoundingClientRect().width
    var h_img = img.getBoundingClientRect().height
    //console.log(x_img,y_img,h_img,"--",width_label,height_label)

    var real_x = 0
    var real_y = 0
    if(ismobile){
        real_x = ((x_img+(w_img/2))-(width_label / 2))
        if(real_x<0){
            real_x = 0
        }
        if((real_x+width_label)>game_width){
            real_x = game_width-width_label
        }
        real_y = (y_img + h_img + 10)
    }else{
        real_x = (x_img-(width_label + 20))
        real_y = ((y_img+(h_img/2))-(height_label / 2))
    }
    
    label.style.left = real_x+'px'
    label.style.top = real_y+'px'
    
    label.className = 'basura_label_on'
}
function outBasura(id_name,label_name){
    var basura_cont = getI(id_name)
    var marco = basura_cont.getElementsByClassName('basura_cont_marco')[0]
    marco.style.opacity = 0

    var label = getI('basura_label')
    label.className = 'basura_label_off'
}

var residuo_tag = getI('residuo_tag')
var residuo_tag2 = getI('residuo_tag2')
var residuo_tag_width = 0
var residuo_tag_height = 0
var iluminacion_caneca = getI('iluminacion_caneca')
var residuo_actual = null
var basura_clicked = null
var basura_clicked_id = null//esta variable es para el responsive

//////////////////FUNCIONES MOBILE//////////////////////
function clickBasura(event,idname,cat,id){
    if(!animating_depositar&&!game_finished){
        click_mp3.play()
        
        var basura_cont = getI(idname)
        basura_clicked = basura_cont
        var marco = basura_cont.getElementsByClassName('basura_cont_marco')[0]
        marco.style.opacity = 1

        var residuo_info = findResiduoData(id,cat)

        basura_clicked_id = {cat:cat,id:id}

        residuo_actual = findResiduoData(id,cat)

        var posx = event.pageX
        var posy = event.pageY
        console.log(posx,posy)

        residuo_tag_width = residuo_actual.width
        residuo_tag_height = residuo_actual.height

        residuo_tag.style.width = residuo_actual.width+'px'
        residuo_tag.style.height = residuo_actual.height+'px'
        residuo_tag.style.backgroundImage = 'url(public/assets/basuras/'+residuo_actual.src+'.png)'
        residuo_tag.style.left = (posx-(residuo_tag_width/2))+'px'
        residuo_tag.style.top = (posy-(residuo_tag_height/2))+'px'
        
        setInstructivo({msg:'<span>'+residuo_actual.nombre+':</span><br />'+residuo_actual.descripcion})
    }
}

function overCaneca(caneca,code){

}
function outCaneca(caneca,code){

}


function clickCaneca(caneca,code){
    if(ismobile){
        if(basura_clicked_id==null){
            setMensaje({msg:'Debes seleccionar un residuo antes de seleccionar una categoría'})
        }else{
            unsetInstructivo()
            var marco = basura_clicked.getElementsByClassName('basura_cont_marco')[0]
            marco.style.opacity = 0

            if(basura_clicked_id.cat==code){
                //bien
                var div_click_action = basura_clicked.getElementsByClassName('basura_cont_imagen')[0]
                var img_click_action = div_click_action.getElementsByTagName('div')[0]
                img_click_action.setAttribute('onclick','')
                basura_clicked.classList.add('basura_cont_selected')

                depositarBasura2(caneca)
                correcto_mp3.play()
            }else{
                residuo_tag.className = 'residuo_tag_off'
                
                var estrella_mala = getI('estrellas').getElementsByTagName('div')[incorrectos]
                estrella_mala.className = 'estrella_on'
                
                error_mp3.play()
                incorrectos++
                if(incorrectos==5){
                    game_finished = true
                    setMensaje({msg:'<span>Las oportunidades terminaron y el juego tambien</span>!!<br />Vuelve a intentarlo',close:false})
                }else{
                    setMensaje({msg:'Este residuo no pertenece a esta categoría'})
                }
            }

        }
    }
}

function downBasura(event,id,cat){
    if(!animating_depositar&&!game_finished){
        click_mp3.play()
        var posx = event.pageX
        var posy = event.pageY

        basura_clicked = getI('basura_id_'+id+'_'+cat)
        basura_clicked.classList.add('basura_cont_selected')

        residuo_actual = findResiduoData(id,cat)

        residuo_tag_width = residuo_actual.width
        residuo_tag_height = residuo_actual.height

        residuo_tag.style.width = residuo_actual.width+'px'
        residuo_tag.style.height = residuo_actual.height+'px'
        residuo_tag.style.backgroundImage = 'url(public/assets/basuras/'+residuo_actual.src+'.png)'
        residuo_tag2.style.width = residuo_actual.width+'px'
        residuo_tag2.style.height = residuo_actual.height+'px'
        residuo_tag2.style.backgroundImage = 'url(public/assets/basuras/'+residuo_actual.src+'.png)'

        residuo_tag.style.left = (posx-(residuo_tag_width/2))+'px'
        residuo_tag.style.top = (posy-(residuo_tag_height/2))+'px'
        residuo_tag.className = 'residuo_tag_on'

        document.body.addEventListener('mousemove',moveBasura,false)
        document.body.addEventListener('mouseup',upBasura,false)

        setInstructivo({msg:residuo_actual.descripcion})
    }
}

var canecas_rect = [
    getI('caneca_blanca').getBoundingClientRect(),
    getI('caneca_negra').getBoundingClientRect(),
    getI('caneca_verde').getBoundingClientRect(),
    getI('caneca_roja').getBoundingClientRect()
]
var canecas = [
    getI('caneca_blanca'),
    getI('caneca_negra'),
    getI('caneca_verde'),
    getI('caneca_roja')
]
var caneca_activa = null
var caneca_activa_ind = 0
var caneca_abierta_ind = 0

function moveBasura(event){
    var posx = event.pageX
    var posy = event.pageY

    residuo_tag.style.left = (posx-(residuo_tag_width/2))+'px'
    residuo_tag.style.top = (posy-(residuo_tag_height/2))+'px'

    caneca_activa = null
    caneca_activa_ind = 0
    for(i = 0;i<canecas_rect.length;i++){
        if(
            posx>canecas_rect[i].left&&posx<(canecas_rect[i].left+canecas_rect[i].width)&&
            posy>canecas_rect[i].top&&posy<(canecas_rect[i].top+canecas_rect[i].height)
        ){
            caneca_activa = canecas[i]
            caneca_activa_ind = (i+1)
        }
    }

    for(i = 0;i<canecas.length;i++){
        canecas[i].className = ''
    }

    //console.log("tocando: "+caneca_activa)
    if(caneca_activa!=null){
        caneca_activa.className = 'caneca_activa'
        iluminacion_caneca.className = 'spd_sprite iluminacion_caneca_'+caneca_activa_ind
        iluminacion_caneca.style.opacity = 1
        //cerrar la que ya habia
        
        if(caneca_abierta_ind!=caneca_activa_ind){
            if(caneca_abierta_ind!=0){
                //spdPlayAnimation({frame:7,stop:11,loop:false},caneca_abierta_ind)
                caneca_abierta_ind = 0
            }
            caneca_abierta_ind = caneca_activa_ind
            //spdPlayAnimation({frame:1,stop:6,loop:false},caneca_abierta_ind)
            tapa_mp3.play()
        }
    }else{
        iluminacion_caneca.style.opacity = 0
        if(caneca_abierta_ind!=0){
            //spdPlayAnimation({frame:7,stop:11,loop:false},caneca_abierta_ind)
            caneca_abierta_ind = 0
        }
    }
}

var incorrectos = 0
var correctos = 0
var game_finished = false

function upBasura(event){
    document.body.removeEventListener('mousemove',moveBasura,false)
    document.body.removeEventListener('mouseup',upBasura,false)
        
    for(i = 0;i<canecas.length;i++){
        canecas[i].className = ''
    }

    iluminacion_caneca.style.opacity = 0
    if(caneca_abierta_ind!=0){
        //spdPlayAnimation({frame:7,stop:11,loop:false},caneca_abierta_ind)
        caneca_abierta_ind = 0
    }
    unsetInstructivo()
    
    if(caneca_activa!=null){
        var cat = residuo_actual.categoria
        if(cat==caneca_activa_ind){
            //bien
            var div_click_action = basura_clicked.getElementsByClassName('basura_cont_imagen')[0]
            var img_click_action = div_click_action.getElementsByTagName('div')[0]
            img_click_action.setAttribute('onmousedown','')

            depositarBasura()
            correcto_mp3.play()
        }else{
            caneca_activa = null
            caneca_activa_ind = 0
            residuo_tag.className = 'residuo_tag_off'
            basura_clicked.classList.remove('basura_cont_selected')
            
            var estrella_mala = getI('estrellas').getElementsByTagName('div')[incorrectos]
            estrella_mala.className = 'estrella_on'
            
            error_mp3.play()
            incorrectos++
            if(incorrectos==5){
                game_finished = true
                setMensaje({msg:'<span>Las oportunidades terminaron y el juego tambien</span>!!<br />Vuelve a intentarlo',close:false})
            }else{
                setMensaje({msg:'Este residuo no pertenece a esta categoría'})
            }
        }
    }else{
        residuo_tag.className = 'residuo_tag_off'
        basura_clicked.classList.remove('basura_cont_selected')
        caneca_activa = null
        caneca_activa_ind = 0
    }
}

var animacion_depositar = null
var animating_depositar = false

function depositarBasura(){
    correctos++
    var rect_caneca = caneca_activa.getBoundingClientRect()
    var left_residuo = rect_caneca.left+((rect_caneca.width/2)-(residuo_tag_width/2))
    animating_depositar = true
    
    animacion_depositar = setTimeout(function(){
        residuo_tag.classList.add('residuo_tag_animate1')
        residuo_tag2.classList.add('residuo_tag_animate1')
        residuo_tag.style.left = left_residuo+'px'
        residuo_tag2.style.left = left_residuo+'px'
        clearTimeout(animacion_depositar)

        animacion_depositar = setTimeout(function(){
            clearTimeout(animacion_depositar)
            residuo_tag.className = 'residuo_tag_off'
            residuo_tag2.className = 'residuo_tag_on residuo_tag_animate2'
            animacion_depositar = setTimeout(function(){
                clearTimeout(animacion_depositar)
                animacion_depositar = null

                animating_depositar = false
                residuo_tag2.className = 'residuo_tag_off'
            },300)
            
            depositar_mp3.play()
            caneca_activa.className = 'caneca_deposita'
            caneca_activa = null
            caneca_activa_ind = 0
            checkFinalizar()
            
        },250)

    },50)
}

function depositarBasura2(caneca){
    correctos++
    var rect_caneca = caneca.getBoundingClientRect()
    var left_residuo = rect_caneca.left+((rect_caneca.width/2)-(residuo_tag_width/2))
    animating_depositar = true
    
    animacion_depositar = setTimeout(function(){
        residuo_tag.classList.add('residuo_tag_animate2')
        residuo_tag.style.left = left_residuo+'px'
        
        clearTimeout(animacion_depositar)

        animacion_depositar = setTimeout(function(){
            clearTimeout(animacion_depositar)
            animacion_depositar = null
            residuo_tag.className = 'residuo_tag_off'
            animating_depositar = false
            
            depositar_mp3.play()
            caneca.className = 'caneca_deposita'
            checkFinalizar()
        },250)

    },50)
}

function checkFinalizar(){
    if(correctos==residuos.length){
        finish_mp3.play()
        game_finished = true
        setMensaje({msg:'<span>¡Excelente!</span><br />Has completado la actividad',close:false})
        pararReloj()
        guardarScorm(true)
    }else{
        setMensaje({msg:'¡Muy bien!<br /> Continúa asi'})
    }
}

/////////////////INSTRUCTIVO//////////////
var instructivo = getI('instructivo')
var instructivo_txt = getI('instructivo_txt')
var instructivo_state = 'off'
var animacion_instructivo = null

function setInstructivo(data){
    clearTimeout(animacion_instructivo)
    animacion_instructivo = null

    if(instructivo_state=='off'){
        instructivo_txt.innerHTML = data.msg
        instructivo.className = 'instructivo_on'
        instructivo_state = 'on'
    }else{
        instructivo.className = 'instructivo_off'
        animacion_instructivo = setTimeout(function(){
            clearTimeout(animacion_instructivo)
            animacion_instructivo = null
            instructivo_txt.innerHTML = data.msg
            instructivo.className = 'instructivo_on'
            instructivo_state = 'on'
        },300)
    }
}

function unsetInstructivo(){
    clearTimeout(animacion_instructivo)
    animacion_instructivo = null

    instructivo.className = 'instructivo_off'
    instructivo_state = 'off'
}

/////////////////MENSAJE//////////////
var mensaje = getI('mensaje')
var mensaje_txt = getI('mensaje_txt')
var mensaje_state = 'off'
var animacion_mensaje = null

function setMensaje(data){
    clearTimeout(animacion_mensaje)
    animacion_mensaje = null

    if(mensaje_state=='off'){
        mensaje_txt.innerHTML = data.msg
        mensaje.className = 'mensaje_on'
        mensaje_state = 'on'
        if(data.close!=null&&data.close!=undefined){
            
        }else{
            animacion_mensaje = setTimeout(function(){
                clearTimeout(animacion_mensaje)
                animacion_mensaje = null
                mensaje.className = 'mensaje_off'
                mensaje_state = 'off'
            },3000)
        }
        
    }else{
        mensaje_state = 'off'
        mensaje.className = 'mensaje_off'
        animacion_mensaje = setTimeout(function(){
            clearTimeout(animacion_mensaje)
            animacion_mensaje = null
            mensaje_txt.innerHTML = data.msg
            mensaje.className = 'mensaje_on'
            mensaje_state = 'on'

            if(data.close!=null&&data.close!=undefined){
                
            }else{
                animacion_mensaje = setTimeout(function(){
                    clearTimeout(animacion_mensaje)
                    animacion_mensaje = null
                    mensaje.className = 'mensaje_off'
                    mensaje_state = 'off'
                },3000)
            }
        },300)
    }
}

function unsetMensaje(){
    clearTimeout(animacion_mensaje)
    animacion_mensaje = null

    mensaje.className = 'mensaje_off'
    mensaje_state = 'off'
}

