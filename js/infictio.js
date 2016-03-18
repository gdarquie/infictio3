/* Les Paramètres */

var _title = "infictio"
var _start = $("#infictio").load("views/main.html");
var _save = [];
var _saveActive = 0;


/* Système de sauvegarde - requiert js-cookie  https://github.com/js-cookie/js-cookie */

function activeSave(){
	if (_saveActive == 0){
		_saveActive = 1;
	}
	else{
		_saveActive = 0;
	}
}

function save(frag){
	//un tableau-cookie dans lequel sont conservés tous les noms de fragment
	console.log("Sauvegarde réalisée");
	//à chaque save, je rajoute l'adresse du frag dans le tableau

	var cookie = Cookies.set(_title, frag, { expires: 999999 });
	//_save.push(frag);	
}

function loadCookie(){

	var myCookie = Cookies.get('infictio')
	if(  myCookie != null ){
		$("#infictio").load(Cookies.get('infictio'));
		console.log(myCookie);
	}
}

function reset(){
	Cookies.remove('infictio');

	if(!mySound){
		mySound = '';
	}
	else{
		mySound.mute();
	}
	// $("#infictio").html(_start);
	// $("#infictio").load('views/parts/titre.html');

}


/* Notes pour le système de sauvegarde : prendre le tableau _save, ajouter à chaque fois un cookie et copier ce qui est dedans dans un cookie ??? 
Si trop difficile, continuer avec une sauvegarde du dernier item seulement */

/* Fonctions de chargement*/


//charger un nouveau passage (en cours)

function page(click, load, frag){
	//sur ce fragment, je mets ce lien
	$(click).click(function() {
		$(load).load(frag);
		save(frag);
	});

	console.log("Fonction page()");
}

//un lien interne au récit
function fragments(){
	//reconnaitre les mots
}

//valeurs de liens

//function pour repérer le type de lien
	//commence par regarder le type du fragment
	//s'il y a un lien associé au passage, active la fonction passage
	//s'il y a double crochet, active la fonction passage


/* Fonctions de positionnement */

function hauteur(x){
	_height = $(window).height();
	_itemHeight = $(x).height();
	console.log("Auteur de la fenêtre = "+_height+"px");
	console.log("Auteur de l'item = "+_itemHeight+"px");
}

//calcul de la taille
function fontSize(x){
	hauteur();
	$(x).css("fontSize", (_height/2.5)+"px");
}

//calcul de la margin top
function verticalAlign(x){
	hauteur(x);

	if(_itemHeight< _height){
		var _margin = (_height - _itemHeight) / 2;
		$(x).css("marginTop", _margin);
		console.log("Taille de la marge : "+_margin);
	}

}

/* Fonctions gestion du temps */


//reprendre cette fonction (ne marche pas pour l'instant)
function timer(){
	_timer = 0;

	function time(){
		_timer +1;
	}
	setInterval(function(){time()}, 100);
	console.log(_timer);
}

/* Fonctions d'animation */

function bottom(x, y){

	hauteur(x);

	//faire descendre le texte
	$(x).css("position", "relative");
	$(x).animate({
		bottom : "+="+_itemHeight,
	}, 3000, function(){
		y();
	});
}

function fade(x,y){
	$(x).hide();
	$(x).fadeIn(y);
}

function blink(x, y, interval){
	setInterval(function(){fade(x, y)}, interval);
}
/*Fonction test */

function testInfictio(){
	console.log("Ceci est un test d'infictio");
}

/* Menu */

function hideMenu(){
	$("#menu").hide();
}

function showMenu(){
	$("#menu").hide();
	$("#menu").fadeIn();
}

/* Initialisation */

function init(){
	$("#infictio").html(_start);
	if(_saveActive == 1){
	loadCookie();
	}
	
}

init();
