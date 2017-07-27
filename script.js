var myKeyList = "MY_TO_TAKE_NUMBERS";
var myKeyLast = "MY_LAST_NUMBER";
var myKeyLastList = "THIS_IS_MY_LIST_CONTAINING_ALL_THE_LAST_POKEMON";

var myList;
var lastList;
var haslocalstorage;
var lastPokemon;
var linkLocation = 'https://www.bisafans.de/pokedex/001.php';

if (typeof(Storage) !== "undefined") {			
	haslocalstorage = true;
		
	var randomMon; 
	if(localStorage.getItem(myKeyList) === null) {
						
		var myToTakeList = new Array();
		
		for(var i = 0; i < 150; i++) {
			myToTakeList.push(i + 1);									
		}								
		
		myList = myToTakeList;
		localStorage.setItem(myKeyList, JSON.stringify(myToTakeList));
		//alert("Liste erfolgreich erstellt!");
		
	} else {
		
		myList = JSON.parse(localStorage.getItem(myKeyList));				
		//alert("Liste erfolgreich geladen!");
	}
	
	randomMon = Math.floor(Math.random() * myList.length);
	
	if(localStorage.getItem(myKeyLastList) === null) {
						
		lastList = new Array();
		lastList.push(randomMon);
		
		localStorage.setItem(myKeyLastList, JSON.stringify(lastList));
		//alert("Leere Liste erfolgreich erstellt!");
		
	} else {
		
		lastList = JSON.parse(localStorage.getItem(myKeyLastList));				
		//alert("Letzte Pokemon Liste erfolgreich geladen!");
	}

	if(localStorage.getItem(myKeyLast) === null) {
						
		lastPokemon = randomMon;
		localStorage.setItem(myKeyLast, JSON.stringify(lastPokemon));
		
		var lastString = lastPokemon + "";
		
		if (lastPokemon < 10) {
			lastString = "00" + lastPokemon;
		} else if (lastPokemon < 100) {
			lastString = "0" + lastPokemon;
		}

		var newList = new Array();
		for (var i = 0; i < myList.length; i++) {
			if (myList[i] != randomMon) {
				newList.push(myList[i]);
			}
		}
		localStorage.setItem(myKeyList, JSON.stringify(newList));
				
		linkLocation = "https://www.bisafans.de/pokedex/" + lastString + ".php";
		document.getElementById("myPokemonImage").src="https://media.bisafans.de/ba6dd92/thumbs/300x300/pokemon/artwork/" + lastString + ".png";			
		
		//alert("Letztes Pokemon reseted!");				
	} else {
	
		lastPokemon = JSON.parse(localStorage.getItem(myKeyLast));
		
		var lastString = lastPokemon + "";
		
		if (lastPokemon < 10) {
			lastString = "00" + lastPokemon;
		} else if (lastPokemon < 100) {
			lastString = "0" + lastPokemon;
		}
		
		var newList = new Array();
		for (var i = 0; i < myList.length; i++) {
			if (myList[i] != randomMon) {
				newList.push(myList[i]);
			}
		}
		localStorage.setItem(myKeyList, JSON.stringify(newList));
		
		linkLocation = "https://www.bisafans.de/pokedex/" + lastString + ".php";
		document.getElementById("myPokemonImage").src="https://media.bisafans.de/ba6dd92/thumbs/300x300/pokemon/artwork/" + lastString + ".png";			
		
		//alert("Letztes Pokemon erfolgreich geladen!");
	}

	document.getElementById("lastPokemon").value=lastPokemon;
	document.getElementById("todoPokemon").value=lastPokemon;				
} else {
	alert("There is no local storage");
	haslocalstorage = false;			
}													

function nextPokemonButton() {
	//alert("Under construction!");
	
	myList = JSON.parse(localStorage.getItem(myKeyList));	
	lastList = JSON.parse(localStorage.getItem(myKeyLastList));
	
	var randomNbr = Math.floor(Math.random() * (myList.length));	
	var randomMon = myList[randomNbr];
	
	var newList = new Array();
	for (var i = 0; i < myList.length; i++) {
		if (myList[i] != randomMon) {
			newList.push(myList[i]);
		}
	}
	
	lastList.push(randomMon);
	
	var lastString = randomMon;
	
	if (randomMon < 10) {
			lastString = "00" + randomMon;
		} else if (randomMon < 100) {
			lastString = "0" + randomMon;
	}
	
	linkLocation = "https://www.bisafans.de/pokedex/" + lastString + ".php";
	document.getElementById("myPokemonImage").src="https://media.bisafans.de/ba6dd92/thumbs/300x300/pokemon/artwork/" + lastString + ".png";
	document.getElementById("lastPokemon").value=lastList;			
	document.getElementById("todoPokemon").value=randomMon;			
	
	localStorage.setItem(myKeyList, JSON.stringify(newList));
	localStorage.setItem(myKeyLastList, JSON.stringify(lastList));
	localStorage.setItem(myKeyLast, JSON.stringify(randomMon));
	
	//alert("I picked Pokedex entry: " + randomMon);
	
	//alert("lastlenght " + lastList.length + " totakelenght " + newList.length + " sum " + (newList.length + lastList.length));
	
}

function nextInfo() {
	window.open(linkLocation,'_blank');
	
	//var myLink = "http://httpbin.org/ip";
	//var myLink = "https://pokemongo.gamepress.gg/de/pokemon/232";	
	
	//httpGetAsync(myLink);
}

// async get request
function httpGetAsync(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
			callback(xmlHttp.responseText);            
		}
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

// callback
function callback(myText) {	
	alert(myText);
}

function buttonCancelPressed() {
	
	if(confirm("Reset?")) {
		localStorage.clear();
		
		//alert("Reset succesful!");
		
		location.reload();
	}	
}
