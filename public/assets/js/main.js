var i = 0
var j = 0
var k = 0

function getRand(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
}
function getI(idname){
    return document.getElementById(idname)
}

var game_width = 845
var game_height = 507

var residuos = []

function findResiduoData(id,cat){
    var data = null
    for(k = 0;k<residuos.length;k++){
        if(residuos[k].id==id&&residuos[k].categoria==cat){
            data = residuos[k]
        }
    }
    return data
}

function loadResiduos(){
    for(i = 0;i<residuos_data.length;i++){
        var categoria_data = residuos_data[i]
        var residuos_categoria = categoria_data.basuras
        for(j = 0;j<residuos_categoria.length;j++){
            residuos.push({
                id:residuos_categoria[j].id,
                nombre:residuos_categoria[j].nombre,
                descripcion:residuos_categoria[j].descripcion,
                src:residuos_categoria[j].img,
                categoria:categoria_data.categoria,
                width:0,
                height:0,
                width_borde:0,
                height_borde:0
            })
        }
    }
    loadResiduo(0)
}

function loadResiduo(r){
    if(r==residuos.length){
        printResiduos()
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
    //seleccionar 4 residuos de cada categoria al azar
    for(i = 1;i<=4;i++){
        var seleccionados = []
        var seleccionados_id = []
        while(seleccionados.length<4){
            var residuos_disponibles = residuos_data[i-1].basuras
            var num = getRand(0,(residuos_disponibles.length-1))
            if(!seleccionados.includes(num)){
                seleccionados.push(num)
                seleccionados_id.push(residuos_disponibles[num].id)
            }
        }
        
        var obj_push = []
        for(j = 0;j<seleccionados.length;j++){
            obj_push.push({id:seleccionados_id[j]})
        }
        residuos_seleccionados.push(obj_push)
    }

    console.log(residuos_seleccionados)
    
    for(i = 0;i<residuos_seleccionados.length;i++){
        var cat = residuos_data[i].categoria
        var residuos_cat = residuos_seleccionados[i]
        for(j = 0;j<residuos_cat.length;j++){
            var residuo_info = findResiduoData(residuos_cat[j].id,cat)
            var div_residuo = document.createElement('div')
            div_residuo.className = 'basura_cont'
            var id_name = 'basura_id_'+residuos_cat[j].id+'_'+cat
            div_residuo.id = id_name

            var div_imagen = document.createElement('div')
            div_imagen.className = 'basura_cont_imagen'
            var div_marco = document.createElement('div')
            div_marco.className = 'basura_cont_marco'

            var image_producto = document.createElement('div')
            image_producto.style.width = residuo_info.width+'px'
            image_producto.style.height = residuo_info.height+'px'
            image_producto.style.backgroundImage = 'url(public/assets/basuras/'+residuo_info.src+'.png)'
            image_producto.setAttribute('onmouseover',"overBasura(this,'"+id_name+"','"+residuo_info.nombre+"')")
            image_producto.setAttribute('onmouseout',"outBasura('"+id_name+"','"+residuo_info.nombre+"')")
            image_producto.setAttribute('onmousedown',"downBasura(event,"+residuos_cat[j].id+","+cat+")")
            var image_borde = document.createElement('img')
            image_borde.src = 'public/assets/basuras/marcos/'+residuo_info.src+'.png'

            
            div_imagen.appendChild(image_producto)
            div_marco.appendChild(image_borde)
            
            div_residuo.appendChild(div_marco)
            div_residuo.appendChild(div_imagen)

            getI('contenedor_basuras').appendChild(div_residuo)
        }
    }
}

function overBasura(img,id_name,label_name){
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
    var h_img = img.getBoundingClientRect().height
    //console.log(x_img,y_img,h_img,"--",width_label,height_label)

    var real_x = (x_img-(width_label + 20))
    var real_y = ((y_img+(h_img/2))-(height_label / 2))
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
var residuo_tag_width = 0
var residuo_tag_height = 0
var iluminacion_caneca = getI('iluminacion_caneca')
var residuo_actual = null
var basura_clicked = null

function downBasura(event,id,cat){
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

    residuo_tag.style.left = (posx-(residuo_tag_width/2))+'px'
    residuo_tag.style.top = (posy-(residuo_tag_height/2))+'px'
    residuo_tag.className = 'residuo_tag_on'

    document.body.addEventListener('mousemove',moveBasura,false)
    document.body.addEventListener('mouseup',upBasura,false)

    setInstructivo({msg:residuo_actual.descripcion})
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
            console.log("play tapa")
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
function upBasura(event){
    document.body.removeEventListener('mousemove',moveBasura,false)
    document.body.removeEventListener('mouseup',upBasura,false)
    residuo_tag.className = 'residuo_tag_off'
    
    for(i = 0;i<canecas.length;i++){
        canecas[i].className = ''
    }

    iluminacion_caneca.style.opacity = 0
    if(caneca_abierta_ind!=0){
        //spdPlayAnimation({frame:7,stop:11,loop:false},caneca_abierta_ind)
        caneca_abierta_ind = 0
    }
    
    if(caneca_activa!=null){
        var cat = residuo_actual.categoria
        if(cat==caneca_activa_ind){
            //bien
            var div_click_action = basura_clicked.getElementsByClassName('basura_cont_imagen')[0]
            var img_click_action = div_click_action.getElementsByTagName('div')[0]
            img_click_action.setAttribute('onmousedown','')

            correcto_mp3.play()
            caneca_activa.className = 'caneca_deposita'
            setInstructivo({msg:'Correcto!!<br />Continúa asi'})
        }else{
            basura_clicked.classList.remove('basura_cont_selected')
            
            var estrella_mala = getI('estrellas').getElementsByTagName('div')[incorrectos]
            estrella_mala.className = 'estrella_on'
            setInstructivo({msg:'Este residuo no pertenece a esta categoría'})
            error_mp3.play()
            incorrectos++
            if(incorrectos==5){
                alert("perdiste")
            }
        }
    }else{
        basura_clicked.classList.remove('basura_cont_selected')
    }

    caneca_activa = null
    caneca_activa_ind = 0
}

function startGame(){

}

/////////////////INSTRUCTIVO//////////////
var instructivo = getI('instructivo')
var instructivo_txt = getI('instructivo_txt')
var instructivo_state = 'off'
var animacion_instructivo = null

function setInstructivo(data){
    clearTimeout(animacion_instructivo)
    animacion_instructivo = null

    console.log(instructivo_state)
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
        },200)
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
        animacion_mensaje = setTimeout(function(){
            clearTimeout(animacion_mensaje)
            animacion_mensaje = null
            mensaje.className = 'mensaje_off'
            mensaje_state = 'off'
        },3000)
    }else{
        mensaje_state = 'off'
        mensaje.className = 'mensaje_off'
        animacion_mensaje = setTimeout(function(){
            clearTimeout(animacion_mensaje)
            animacion_mensaje = null
            mensaje_txt.innerHTML = data.msg
            mensaje.className = 'mensaje_on'
            mensaje_state = 'on'

            animacion_mensaje = setTimeout(function(){
                clearTimeout(animacion_mensaje)
                animacion_mensaje = null
                mensaje.className = 'mensaje_off'
                mensaje_state = 'off'
            },3000)  
        },200)
    }
}

function unsetMensaje(){
    clearTimeout(animacion_mensaje)
    animacion_mensaje = null

    mensaje.className = 'mensaje_off'
    mensaje_state = 'off'
}

