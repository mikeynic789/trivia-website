const start=document.querySelector(".start-button");                //target html elements
const div1=document.querySelector(".title");
const div2=document.querySelector(".start");
const cats=document.querySelector(".categories");
const catsOn=document.querySelector(".categories-selected");
const quest=document.querySelector(".question");
const choice1=document.querySelector(".choice-1");
const choice2=document.querySelector(".choice-2");
const choice3=document.querySelector(".choice-3");
const choice4=document.querySelector(".choice-4");
const score=document.querySelector(".score")
const current=document.querySelector(".current-category");
const notes=document.querySelector(".notifications");
const rulesText=document.querySelector(".rules");
const reset=document.querySelector(".reset-btn");
const statsDiv=document.querySelector(".stats");
const stats=document.querySelector(".stats-btn");
let gamesWon=JSON.parse(localStorage.getItem("gamesWon")) || 0;
let gamesLost=JSON.parse(localStorage.getItem("gamesLost")) || 0;
let gamesPlayed=JSON.parse(localStorage.getItem("gamesPlayed")) || 0;
let currentString;
let correct=0;
let asked=JSON.parse(localStorage.getItem("asked")) || [];
let qnum=0;
//let count=0;
let store;
let s=0;
//let x;
let categories=[];
let catOrder=[];
localStorage.setItem("asked",JSON.stringify(asked));
localStorage.setItem("gamesWon",JSON.stringify(gamesWon));
localStorage.setItem("gamesLost",JSON.stringify(gamesLost));
localStorage.setItem("gamesPlayed",JSON.stringify(gamesPlayed));
function resetStorage() {
	asked=JSON.parse(localStorage.getItem("asked"));
	asked=[];
	localStorage.setItem("asked",JSON.stringify(asked));
	notes.innerHTML="<p>Question memory cleared</p>"
}
reset.addEventListener("click",() => resetStorage());
function rules() {							//display rules after pressing start
	div1.innerHTML="<h1>How to play</h1>"; 
	rulesText.innerHTML="<p>You will select 5 categories of trivia and you will get 5 questions per category. Each set of 5 questions will start very easy and increasingly get more difficult.</p><br><p>Some questions are very easy and some are very hard, you must answer at least 18 questions correctly to win. Good luck!</p>";
	div2.innerHTML="<button class=\"start-trivia\">Begin</button>";
	const ready=document.querySelector(".start-trivia");
	ready.addEventListener("click",() => showCats())
	statsDiv.innerHTML=`<p></p>`
};

start.addEventListener("click",() => rules());


function statsFunc() {
	div2.innerHTML=`<p>Games won: ${localStorage.getItem("gamesWon")}<br>Games lost: ${localStorage.getItem("gamesLost")}<br>Games played: ${localStorage.getItem("gamesPlayed")}</p>`;
	statsDiv.innerHTML=`<button class="back-btn">Back</button>`;

	const backBtn=document.querySelector(".back-btn");
	backBtn.addEventListener("click",() => statsBack());
}

function statsBack() {
	div2.innerHTML=`<button class="start-button">Start</button>`;
	statsDiv.innerHTML=`<button class="stats-btn">Stats</button>`;
 	const stats=document.querySelector(".stats-btn");
	const start=document.querySelector(".start-button");   
	stats.addEventListener("click",() => statsFunc());
	start.addEventListener("click",() => rules());
}
stats.addEventListener("click",() => statsFunc());

	
	
	


function catSelect(n) {					//select categories
	if (categories.includes(n)) {
		notes.innerHTML="<p></p>"
		catOrder.splice(categories.indexOf(n),1);
		categories.splice(categories.indexOf(n),1);
	} else if (categories.length==5) {
		notes.innerHTML="<p>Too many categories, only select 5.</p>";
		return;
	}else {
		notes.innerHTML="<p></p>"
		categories.push(n);							//add category questions to question list
		if (n=="Science") {
			catOrder.push(science);
		};
		if (n=="Mathematics") {
			catOrder.push(math);
		}
		if (n=="TV Shows") {
			catOrder.push(tvShows)
		}
		if (n=="Movies") {
			catOrder.push(movies)
		}
		if (n=="Music") {
			catOrder.push(music)
		}
		if (n=="Sports") {
			catOrder.push(sports)
		}
		if (n=="Video Games") {
			catOrder.push(videoGames)
		}
	};
	catsOn.innerHTML=`<h3>Selected Categories</h3> <p>${categories[0]}      ${categories[1]}      ${categories[2]}      ${categories[3]}      ${categories[4]}</p>`
	return
	};




function showCats() { 						   //category buttons
div1.innerHTML="<h2>Select 5 categories</h2>";
cats.innerHTML="<button class=\"science\">Science</button> <button class=\"math\">Mathematics</button> <button class=\"shows\">TV Shows</button> <button class=\"music\">Music</button> <button class=\"sports\">Sports</button> <button class=\"movies\">Movies</button> <button class=\"video-games\">Video Games</button>";
div2.innerHTML="<button class=\"im-ready\">I'm ready</button>";
const imReady=document.querySelector(".im-ready")
const science=document.querySelector(".science");
const math=document.querySelector(".math");
const shows=document.querySelector(".shows");
const music=document.querySelector(".music");
const sports=document.querySelector(".sports");
const movies=document.querySelector(".movies");
const videoGames=document.querySelector(".video-games");
rulesText.innerHTML="";


	science.addEventListener("click",() => catSelect("Science"));
	math.addEventListener("click",() => catSelect("Mathematics"));
	shows.addEventListener("click",() => catSelect("TV Shows"));
	music.addEventListener("click",() => catSelect("Music"));
	sports.addEventListener("click",() => catSelect("Sports"));
	movies.addEventListener("click",() => catSelect("Movies"));
	videoGames.addEventListener("click",() => catSelect("Video Games"));
imReady.addEventListener("click",() => newQuestion1());

};
//_______________________________science____________________________________

/*function question() {
	let x;
	for (let i=0;i<=0;i++) {
		for (let j=0;<=4;j++) {
			x=Math.floor(Math.random()*5);
quest.innerHTML=catOrder[i][j][x].question;
choice1.innerHTML=catOrder[i][j][x].choice1;
choice2.innerHTML=catOrder[i][j][x].chocie2;
choice3.innerHTML=catOrder[i][j][x].chocie3;
choice4.innerHTML=catOrder[i][j][x].chocie4;
		}
	}

}*/
let c=0;
let q=0;
function newQuestion1() {
if (categories.length!=5) {
notes.innerHTML="<p>Select 5 categories</p>";
	return
}
notes.innerHTML="<p></p>"
			//show first question
	let count=0;
	let x=Math.floor(Math.random()*5);
	asked=JSON.parse(localStorage.getItem("asked"))
while (asked.includes(catOrder[c][q][x].question)) {
x=Math.floor(Math.random()*5);
count++
if (count==100) {
	asked=[];
	notes.innerHTML="<p>reset</p>";
}
}

asked.push(catOrder[c][q][x].question)
localStorage.setItem("asked",JSON.stringify(asked));
	div1.innerHTML="<h2></h2>";
currentString=`<h3>${categories[c]}</h3>`;
	current.innerHTML=currentString;
	cats.innerHTML="<p></p>";
quest.innerHTML=catOrder[c][q][x].question;
choice1.innerHTML=catOrder[c][q][x].choice1;
choice2.innerHTML=catOrder[c][q][x].choice2;
choice3.innerHTML=catOrder[c][q][x].choice3;
choice4.innerHTML=catOrder[c][q][x].choice4;
if (q==4) {
	c++;
	q=0;
} else {
	q++;
};
div2.innerHTML="<button class=\"submit\">Submit</button>";
let submit=document.querySelector(".submit");
submit.addEventListener("click",() => newQuestion2());
};


function newQuestion2() {			//show new question
let selected=document.querySelector('input[name="choice"]:checked');
if (!selected) {
notes.innerHTML="<p>select an answer before submitting</p>"
} else {notes.innerHTML=""
	let x=Math.floor(Math.random()*5)
asked=JSON.parse(localStorage.getItem("asked"))
	let count=0;
while (asked.includes(catOrder[c][q][x].question)) {
x=Math.floor(Math.random()*5);
count++
if (count==100) {
	asked=[];
	notes.innerHTML="<p>reset</p>";
}
}

asked.push(catOrder[c][q][x].question)
localStorage.setItem("asked",JSON.stringify(asked));

quest.innerHTML=catOrder[c][q][x].question;
choice1.innerHTML=catOrder[c][q][x].choice1;
choice2.innerHTML=catOrder[c][q][x].choice2;
choice3.innerHTML=catOrder[c][q][x].choice3;
choice4.innerHTML=catOrder[c][q][x].choice4;
currentString=`<h3>${categories[c]}</h3>`;
	current.innerHTML=currentString
if (q==4) {
	c++;
	q=0;
} else {
	q++;
};
if (selected.classList.contains("correct")) {
	correct=correct+1
}



qnum=qnum+1;
store=`<h3><sup>${correct}</sup>/<sub>${qnum}</sub></h3>`;
score.innerHTML=store;
div2.innerHTML="<button class=\"submit\">Submit</button>";


let submit=document.querySelector(".submit");
if (qnum==24) {
	submit.addEventListener("click",() => finish())
} else {
submit.addEventListener("click",() => newQuestion2());
}
};
};

function finish() {
	let selected=document.querySelector('input[name="choice"]:checked');
	if (!selected) {
notes.innerHTML="<p>select an answer before submitting</p>"
} else {
if (selected.classList.contains("correct")) {
correct=correct+1;}
qnum=qnum+1;
		
gamesWon=JSON.parse(localStorage.getItem("gamesWon"));
gamesLost=JSON.parse(localStorage.getItem("gamesLost"));
gamesPlayed=JSON.parse(localStorage.getItem("gamesPlayed"));

gamesPlayed=gamesPlayed+1
if (correct>=18) {
gamesWon=gamesWon+1
quest.innerHTML=`<h3>Congratulations, you got ${correct} out of ${qnum} correct. You Win!\nReload to play again. You'll get a different set of questions every time.</h3>`;
} else {
gamesLost=gamesLost+1
quest.innerHTML=`<h3>You only got ${correct} out of ${qnum} correct. You lose, but you can reload to play again. You'll get a different set of questions every time you play.`
}
localStorage.setItem("gamesPlayed",JSON.stringify(gamesPlayed));
localStorage.setItem("gamesWon",JSON.stringify(gamesWon));
localStorage.setItem("gamesLost",JSON.stringify(gamesLost));
		
choice1.innerHTML="<p></p>";
choice2.innerHTML="<p></p>";
choice3.innerHTML="<p></p>";
choice4.innerHTML="<p></p>";
notes.innerHTML="<p></p>";
current.innerHTML="<p></p>";
score.innerHTML="<p></p>";
div2.innerHTML="<p></p>";
div1.innerHTML="<p></p>";
catsOn.innerHTML="<p></p>";
}
}


let science1=[];
science1.push({question:"<p>What is the transition from liquid to gas called?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Freezing</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Melting</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"3\"><label for=\"3\">Vaporization</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Precipitation</label>"
})
science1.push({
	question:"<p>What is the chemical symbol for oxygen?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Ox</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Oy</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"3\"><label for=\"3\">O</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">L</label>"
})
science1.push({
	question:"<p>Who originally derived E=mc<sup>2</sup>?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Isaac Newton</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Erwin Schrödinger</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">J. Robert Oppenheimer</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"4\"><label for=\"4\">Albert Einstein</label>"
})
science1.push({question:"<p>What is the powerhouse of the cell?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Cytoplasm</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"2\"><label for=\"2\">Mitochondria</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Vacuole</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Endoplasmic Reticulum</label>"
})
science1.push({
	question:"<p>What percent of the atmosphere is oxygen?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"1\"><label for=\"1\">21%</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">2.5%</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">78%</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">96%</label>"
})

let science2=[];
science2.push({
question:"<p>What does amu stand for?</p>",
choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">accelerated mass uncertainty</label>",
choice2:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"2\"><label for=\"2\">atomic mass unit</label>",
choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">all microscopic universe</label>",
choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">unsaturated molecular unit</label>"
	})
science2.push({
	question:"<p>Which part of the brain is responsible for physical movement?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"1\"><label for=\"1\">motor cortex</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">amygdala</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">hippocampus</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Wernicke's area</label>"
})

science2.push({
	question:"<p>Who originally derived the heliocentric model?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Johannes Kepler</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Leonhard Euler</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Galileo Galilei</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"4\"><label for=\"4\">Nicolaus Copernicus</label>"
})

science2.push({
	question:"<p>Which planet is second from the Sun?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Earth</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"2\"><label for=\"2\">Venus</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Mars</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Mercury</label>"
})
science2.push({
	question:"<p>What is the top layer of the skin called?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">epicenter</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">crest</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"3\"><label for=\"3\">epidermis</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">rough</label>"
})



let science3=[];
science3.push({
	question:"<p>Who discovered the nucleus?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">J.J. Thompson</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Neils Bohr</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"3\"><label for=\"3\">Ernest Rutherford</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Leonhard Euler</label>"
})

science3.push({
	question:"<p>Which of the following is a noble gas?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Hydrogen</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Iodine</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"3\"><label for=\"3\">Krypton</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Caesium</label>"
})

science3.push({
	question:"<p>What is the largest vein in the human body?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Aorta</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"2\"><label for=\"2\">Vena Cava</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Alpha Aorta</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Vena majora</label>"
})

science3.push({
	question:"<p>How many tiers are there in Maslow's hierarchy of needs?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">3</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"2\"><label for=\"2\">5</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">7</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">9</label>"
})

science3.push({
	
	question:"<p>Which layer of the atmosphere is the coldest?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Troposphere</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Stratosphere</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"3\"><label for=\"3\">Mesopshere</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Thermosphere</label>"
})

let science4=[];
science4.push({
	question:"<p>What phenomenon does the equation K<sub>max</sub>=hf-&phi; describe?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"1\"><label for=\"1\">Photoelectric effect</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Covalent bonding</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">quantum tunneling</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">constructive interference</label>"
})

science4.push({
	question:"<p>What us Erik Erikson's sixth stage of development?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">integrity vs. despair</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">trust vs. mistrust</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"3\"><label for=\"3\">intimacy vs. isolation</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">industry vs. inferiority</label>"
})

science4.push({
	question:"<p>Which is not a real element?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Americium</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"2\"><label for=\"2\">Newtonium</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Europium</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Einsteinium</label>"
})
science4.push({
question:"<p>Who discovered Radium?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Werner Heisenberg</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Erwin Schrödinger</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"3\"><label for=\"3\">Marie Curie</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Ernest Rutherford</label>"
})
science4.push({
	question:"<p>Which vascular plant tissue brings water and nutrients from the roots to the rest of the plant?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Chlorophyll</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Phloem</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Pistol</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"4\"><label for=\"4\">Xylem</label>"
})

let science5=[];

science5.push({
	question:"<p>Which particle is not a boson?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"1\"><label for=\"1\">muon</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">gluon</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">photon</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">meson</label>"
})
science5.push({
	question:"<p>What does FORTRAN stand for?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">forecast transition</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"2\"><label for=\"2\">formula translation</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">foreign transistor</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">form transitivity</label>"
})
science5.push({
	question:"<p>Which electrical component is found in typical logic gates?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">LEDs</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">polarized capacitors</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">OpAmps</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"4\"><label for=\"4\">CMOS Transistors</label>"
})

science5.push({
	question:"<p>What is the transmission probability of a particle quantum tunneling outside the infinite potential well?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">one</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">infinite</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"3\"><label for=\"3\">zero</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">undefined</label>"

})

science5.push({
	question:"<p>Which compound is aromatic?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Cyclooctatetraene</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"2\"><label for=\"2\">Benzene</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Cyclobutadiene</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Furanoxide</label>"
})
const science=[science1,science2,science3,science4,science5];


//__________________________________math___________________________________________________________________________________________________________________-
let math1=[];

math1.push({
	question:"<p>What is 33+77?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">100</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">90</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"3\"><label for=\"3\">110</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">111</label>"
})

math1.push({
	question:"<p>Which operation returns the difference between two scalar values?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Addition</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Division</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Multiplication</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"4\"><label for=\"4\">Subtraction</label>"
});

math1.push({
	question:"<p>How many degrees are in one revolution?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">45<sup>o</sup></label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">90<sup>o</sup></label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">180<sup>o</sup></label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"4\"><label for=\"4\">360<sup>o</sup></label>"
})
math1.push({
	question:"<p>What is the square root of 81?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">18</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">40.5</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"3\"><label for=\"3\">9</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">81</label>"
})
math1.push({
	question:"<p>Which type of triangle does the pythagorean theorem apply to?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Scalene</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"2\"><label for=\"2\">Right</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Iscosceles</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Equilateral</label>"
})


let math2=[];

math2.push({
	question:"<p>What is &pi; rounded to 3 decimal places?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">3.121</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">3.141</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">6.283</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"4\"><label for=\"4\">3.142</label>"
})


math2.push({
	question:"<p>What is the multiplicative identity?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">0</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">10</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"3\"><label for=\"3\">1</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">100</label>"
})

math2.push({
	question:"<p>What is the eccentricity of a circle?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"1\"><label for=\"1\">0</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">1</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">0.5</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">0.99</label>"
})

math2.push({
	question:"<p>f(x)=3x+|x|, what is f(-3) equal to?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"1\"><label for=\"1\">-6</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">-9</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">6</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">9</label>"
})


math2.push({
	question:"<p>What is the slope of a vertical line?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">&infin;</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"2\"><label for=\"2\">undefined</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">0</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">1</label>"
})

math3=[];


math3.push({
	question:"<p>Which binary operation returns a vector orthogonal to both input vectors?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Dot product</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"2\"><label for=\"2\">Cross product</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">inner product</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">parameterization</label>"
})


math3.push({
	question:"<p>Who is credited with developing calculus?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Albert Einstein</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Leonhard Euler</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Johann Bernoulli</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"4\"><label for=\"4\">Isaac Newton</label>"
})

math3.push({
	question:"<p>What is known as the most beautiful equation?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">a<sup>2</sup>+b<sup>2</sup>=c<sup>2</sup></label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">e<sup>i&theta;</sup>=cos(&theta;)+isin(&theta;)</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"3\"><label for=\"3\">e<sup>i&pi;</sup>+1=0</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">0=&lambda;<sup>2</sup>-&tau;&lambda;+&Delta;</label>"
})


math3.push({
	question:"<p>If Z is a complex number then what is Z<sup>*</sup></p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"1\"><label for=\"1\">complex conjugate</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">real component</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">imaginary component</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">inverse</label>"
})

math3.push({
	question:"<p>What is the derivative of e<sup>x</sup>?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">e</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">x<sup>e</sup></label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"3\"><label for=\"3\">e<sup>x</sup></label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">x</label>"
})

math4=[];
math4.push({
	question:"<p>What is a statement that is always true called?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">contradiction</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">truthy</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"3\"><label for=\"3\">tautology</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">homeomorphism</label>"
})

math4.push({
	question:"<p>What type of function does the statement {y|&forall;y&isin;Y,&exist;x&isin;X,f(x)=y} describe?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Injection</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"2\"><label for=\"2\">Surjection</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Bijection</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Isomorphism</label>"
})


math4.push({
	question:"<p>What does the german word, ansatz, roughly mean?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"1\"><label for=\"1\">guess</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">incorrect</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">contradiction</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">derivative</label>"
})


math4.push({
	question:"<p>Who proved the brachistochrone problem</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Isaac Newton and James Bernoulli</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"2\"><label for=\"2\">Joseph-Louis Lagrange and Leonhard Euler</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Albert Einstein and J. Robert Oppenheimer</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Euclid and Pythagoras</label>"
})

math4.push({
	question:"<p>What is &tau; equal to?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">&pi;</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">cos(90)</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">e</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"4\"><label for=\"4\">2&pi;</label>"
})



let math5=[];
math5.push({
	question:`<p>which solution solves y&#x0308;=-y?</p>`,
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">sin(3x)</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"2\"><label for=\"2\">e<sup>it</sup></label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">tan(x)</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">sinh(t)</label>"
})


math5.push({
	question:"<p>Which operator represents the divergence of the gradient?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Lagrangian</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Feynman integral</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"3\"><label for=\"3\">Laplacian</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">nabla</label>"
})


math5.push({
	question:"<p>What are vectors that do not change direction under transformations called?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">constants</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">identity vectors</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"3\"><label for=\"3\">eigenvectors</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">euclidvectors</label>"
})


math5.push({
	question:"<p>What is the probability of an event falling under a probability density function</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"1\"><label for=\"1\">1</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">0</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">100</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\"><sup>1</sup>/<sub>10</sub></label>"
})

math5.push({
	question:"<p>which matrix form approximates diagonalization?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"1\"><label for=\"1\">Jordan-normal</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Gauss-Jordan</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">symmetric</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">mirror</label>"
})


const math=[math1,math2,math3,math4,math5];
//______________________________________________tvshows________________________________________________________________________________________________________________________________

let tvShows1=[];


tvShows1.push({question:"<p>Who is Ross Geller's sibling?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"1\"><label for=\"1\">Monica Geller</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Judy Geller</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Jack Geller</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Russ Geller</label>"
})


tvShows1.push({
	question:"<p>Where is Will Byers brought after getting kidnapped?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">inside-out</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">sideways-swirl</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"3\"><label for=\"3\">upside-down</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">black and white</label>"
})

tvShows1.push({
	question:"<p>What is the company in 'The Office'?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">ACME</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"2\"><label for=\"2\">Dunder Mifflin</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Oscorp</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Mad Style</label>"
})

tvShows1.push({
	question:"<p>Who plays Lucy Ricardo?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Desi Arnaz</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Shelley Long</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Marilyn Monroe</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"4\"><label for=\"4\">Lucille Ball</label>"
})


tvShows1.push({
	question:"<p>Who is Batman's sidekick?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Nightwing</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Green Lantern</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Wonder Boy</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"4\"><label for=\"4\">Robin</label>"
})

let tvShows2=[];



tvShows2.push({
		question:"<p>Who recorded video diaries for Charlie Duncan to watch when she's older?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">PJ Duncan</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Bob Duncan</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"3\"><label for=\"3\">Teddy Duncan</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Charlie Duncan</label>"
})

tvShows2.push({
	question:"<p>Who is the owner of Cheers?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Norm</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"2\"><label for=\"2\">Sam Malone</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Diane Chambers</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Cliff Clavin</label>"
})

tvShows2.push({
	question:"<p>Which character does not return for the 'Fuller House' reboot?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"1\"><label for=\"1\">Michelle</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Stephanie</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">DJ</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Danny</label>"
})


tvShows2.push({
	question:"<p>What is Phoebe Buffay's twin's name?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Frank Buffay</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Lily Buffay</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"3\"><label for=\"3\">Ursula Buffay</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Frank Buffay Jr.</label>"
})

tvShows2.push({
	question:"<p>What are the creatures from 'Stranger Things' called?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"1\"><label for=\"1\">Demogorgons</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Ganondorf</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Strangers</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Creul Angels</label>"
})


let tvShows3=[];


tvShows3.push({
	question:"<p>According to the Munsters, who is the \"ugliest\" in the family?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Herman Munster</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"2\"><label for=\"2\">Marilyn Munster</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Eddie Munster</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Lily Munster</label>"
})


tvShows3.push({
	question:"<p>Which name does Ross Geller incorrectly say on the alter?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Emily</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Monica</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Carol</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"4\"><label for=\"4\">Rachel</label>"
})

tvShows3.push({
	question:"<p>What is Sheldon Cooper's profession?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Experimental Physicist</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Astrophysicist</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"3\"><label for=\"3\">Theoretical Physicist</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Engineer</label>"
})


tvShows3.push({
	question:"<p>Who plays Charlie Kelly in 'It's Always Sunny in Philadelphia'?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"1\"><label for=\"1\">Charlie Day</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Danny Devito</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Deandra Reynolds</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Glenn Howerton</label>"
})


tvShows3.push({
	question:"<p>How many players were in 'Squid Game' season 1?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">100</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">300</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">514</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"4\"><label for=\"4\">456</label>"
})


let tvShows4=[];

tvShows4.push({
	question:"<p>What is Chandler Bing's job?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Trade auditing and finance modeling</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Paleontology professor</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Transponster</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"4\"><label for=\"4\">Statistical analysis and data reconfiguration</label>"
})


tvShows4.push({
	question:"<p>Who was gored by 'Nestor the happy bull'?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"1\"><label for=\"1\">Robert Barone</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Ray Barone</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Jerry Seinfeld</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Doug Heffernon</label>"
})


tvShows4.push({
	question:"<p>What are Deacon Palmer's kids' names?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">George and Jet</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"2\"><label for=\"2\">Kirby and Major</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Nikki and Alex</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Parker and Jeffrey</label>"
})

tvShows4.push({
	question:"<p>What player number is oh Il-nam?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"1\"><label for=\"1\">001</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">456</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">128</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">007</label>"
})


tvShows4.push({
	question:"<p>Which former Yankee appears on Seinfeld?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Hideki Matsui</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Mariano Rivera</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"3\"><label for=\"3\">Paul O'neil</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">C.C. Sabathia</label>"
})

let tvShows5=[];



tvShows5.push({
	question:"<p>What is Jackie Burkhart's middle name?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Mariam</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Gloria</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Gertrude</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"4\"><label for=\"4\">Beulah</label>"
})


tvShows5.push({
	question:"<p>Who is the original Professor Proton?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Sheldon Cooper</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"2\"><label for=\"2\">Arthur Jeffries</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Ross Geller</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Mayim Bealik</label>"
})


tvShows5.push({
	question:"<p>What is Rachel Green's middle name?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"1\"><label for=\"1\">Karen</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Maryse</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Gillian</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Julia</label>"
})

tvShows5.push({
	question:"<p>What show is the 'Flinstones' based on?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">I Love Lucy</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">The Munsters</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"3\"><label for=\"3\">The Honeymooners</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">The Three Stooges</label>"
})


tvShows5.push({
	question:"<p>What were Ray and Debra Barone's twins' names at the beginning of the show?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Michael and Jeffrey</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Nikki and Alex</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Zack and Cody</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"4\"><label for=\"4\">Gregory and Matthew</label>"
})


const tvShows=[tvShows1,tvShows2,tvShows3,tvShows4,tvShows5];


//________________________________________________sports_________________________________________________________________________________________________

let movies1=[];
//let movies=[];
//let sports=[];
//let music=[];



movies1.push({
	question:"<p>Which Disney princess has the longest hair?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Snow White</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"2\"><label for=\"2\">Rapunzel</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Cinderella</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Ariel</label>"
})

movies1.push({
	question:"<p>What movie is considered the greatest sequel of all time?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Spiderman 2</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Sharknado 2: The Second One</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"3\"><label for=\"3\">The Godfather 2</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Dune: Part Two</label>"
})

movies1.push({
	question:"<p>How did the Wicked Witch of the East die?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">She was liquidated</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">She was stabbed in the heart</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">She magically disappears</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"4\"><label for=\"4\">A house fell on her</label>"
})

movies1.push({
	question:"<p>Who is Batman's arch nemesis?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"1\"><label for=\"1\">The Joker</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">The Riddler</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">The Penguin</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Catwoman</label>"
})




movies1.push({
	question:"<p>Which iconic duo went to shell city?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Nemo and Dory</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"2\"><label for=\"2\">Spongebob and Patrick</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Batman and Robin</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Bert and Ernie</label>"
})

let movies2=[];

movies2.push({
	question:"<p>What was the highest grossing movie of all time?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Titanic</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Avengers: Endgame</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"3\"><label for=\"3\">Avatar</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Spiderman:No Way Home</label>"
})





movies2.push({
	question:"<p>What movie is the quote \"Pay no attention to the man behind the curtain\" from?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"1\"><label for=\"1\">The Wizard of Oz</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">The Magician</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">The Godfather</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">The Greatest Show on Earth</label>"
})

movies2.push({
	question:"<p>What sport does Forrest Gump play in the military?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Basketball</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Tennis</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"3\"><label for=\"3\">Ping-Pong</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Pickle Ball</label>"
})


/*movies2.push({
	question:"<p>What is Dr. Strange's real name?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Scott Lang</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Bruce Wayne</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"3\"><label for=\"3\">Stephen Strange</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Albert Normal</label>"
})*/

movies2.push({
	question:"<p>What is the name of Thor's hammer?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"1\"><label for=\"1\">Gungnir</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Stormbreaker</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Boulder Breaker</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Mjolnir</label>"
})

movies2.push({
	question:"<p>What are the white armored troops from 'Star Wars' called?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Hotheads</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"2\"><label for=\"2\">Stormtroopers</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Rainmakers</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Droids</label>"
})



let movies3=[];

movies3.push({
	question:"<p>Who says \"Live long and prosper\"?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Captain Kirk</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Darth Vader</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Yoda</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"4\"><label for=\"4\">Spock</label>"
})

movies3.push({
	question:"<p>Who plays Spiderman in 'The Amazing Spiderman'?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Tobey Maguire</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Tom Holland</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"3\"><label for=\"3\">Andrew Garfield</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Miles Morales</label>"
})

movies3.push({
	question:"<p>Who leads the rise of the apes?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Maryse</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"2\"><label for=\"2\">Caesar</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Lucy</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">George</label>"
})

movies3.push({
	question:"<p>What is the name of Rodrick Heffley's band?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"1\"><label for=\"1\">Loaded Diaper</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Sand B4gs</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">DCAC</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Löded Diper</label>"
})


movies3.push({
	question:"<p>What genre of music is played in 'Whiplash'?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Jazz</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Soul</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"3\"><label for=\"3\">Rock</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Metal</label>"
})

let movies4=[];

movies4.push({
	question:"<p>What do the characters in the parallel world have as eyes in 'Coraline'?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">pins</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">staples</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"3\"><label for=\"3\">buttons</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">badges</label>"
})

movies4.push({
	question:"<p>What city did Seita and Setsuko live in?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Tokyo</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"2\"><label for=\"2\">Kobe</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Osaka</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Shanghai</label>"
})

movies4.push({
	question:"<p>Which day of the year do Frank Abagnale Jr. and Carl Hanratty always meet?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">November 22nd</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">January 1st</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">July 4th</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"4\"><label for=\"4\">December 25th</label>"
})


movies4.push({
	question:"<p>Who does Ray Kinsella have a catch with?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Babe Ruth</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Joe Jackson</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"3\"><label for=\"3\">His dad</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">His brother</label>"
})


movies4.push({
	question:"<p>What is the name of Andy's neighbor who tortures toys?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Andie</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Otis</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"3\"><label for=\"3\">Sid</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Buzz</label>"
})

let movies5=[];

movies5.push({
	question:"<p>How many Piston Cups did Doc Hudson win?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">1</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"2\"><label for=\"2\">3</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">4</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">7</label>"
})


movies5.push({
	question:"<p>What is Yubaba's twin sister's name?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Ababuy</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Haku</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Nausicaa</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"4\"><label for=\"4\">Zeniba</label>"
})

movies5.push({
	question:"<p>What is the name of the cave where Aladdin finds Genie's lamp?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"1\"><label for=\"1\">Cave of Wonders</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Cave of Mysteries</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Genie's Abyss</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Cave of Treasures</label>"
})

movies5.push({
	question:"<p>What song does Rooster play on the piano in 'Top Gun: Maverick'</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Danger Zone</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Holding Our For a Hero</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"3\"><label for=\"3\">Great Balls of Fire</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Free Bird</label>"
})

movies5.push({
	question:"<p>Which company brought dinosaurs back to life?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Stark Industries</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"2\"><label for=\"2\">International Genetic Technologies</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Monsters Inc.</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Genetic Engineering Worldwide</label>"
})

const movies=[movies1,movies2,movies3,movies4,movies5];
let music1=[];


music1.push({
	question:"<p>Who is the Piano Man?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Elton John</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"2\"><label for=\"2\">Billy Joel</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Liberace</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Beethoven</label>"
})

music1.push({
	question:"<p>Who is the Rocket Man?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"1\"><label for=\"1\">Elton John</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Billy Joel</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Freddie Mercury</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Michael Jackson</label>"
})

music1.push({
	question:"<p>Who was the main performer on the Eras Tour?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Sabrina Carpenter</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Drake</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Olivia Rodriguez</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"4\"><label for=\"4\">Taylor Swift</label>"
})

music1.push({
	question:"<p>Who has won the most Grammy awards?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Taylor Swift</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Michael Jackson</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"3\"><label for=\"3\">Beyoncé</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Elvis Presley</label>"
})


	music1.push({
	question:"<p>What is Queen's most popular song?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">We Are The Champions</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"2\"><label for=\"2\">Bohemian Rhapsody</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">We Will Rock You</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Don't Stop Me Now</label>"
})

let music2=[];


music2.push({
	question:"<p>Which band played the theme song for 'F.R.I.E.N.D.S.'?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Barenaked Ladies</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"2\"><label for=\"2\">The Rembrandts</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">They Might Be Giants</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Löded Diper</label>"
})

music2.push({
	question:"<p>Who was the first Superbowl halftime performer to draw more viewers than the game itself?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Lady Gaga</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Madonna</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Rihanna</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"4\"><label for=\"4\">Michael Jackson</label>"
})

music2.push({
	question:"<p>Which band returned for one more song over 45 years after breaking up?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Pink Floyd</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">The Rolling Stones</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Queen</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"4\"><label for=\"4\">The Beatles</label>"
})

music2.push({
	question:"<p>What is the most popular song and video on youtube?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"1\"><label for=\"1\">Baby Shark</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Smells Like Teen Spirit</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Despacito</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Gangnam Style</label>"
})

music2.push({
	question:"<p>Which is not a string on a standard guitar?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">E</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">D</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"3\"><label for=\"3\">F</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">G</label>"
})


let music3=[];


music3.push({
	question:"<p>What was the most viewed concert in history, including the television broadcast?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Rod Stewart, 1994</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"2\"><label for=\"2\">Live-Aid, 1985</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Elvis Presley, 1973</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Roger Waters, 1990</label>"
})

music3.push({
	question:"<p>Who wrote the Star Spangled Banner?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Betsy Ross</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">John Smith</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Clara Barton</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"4\"><label for=\"4\">Frances Scott Key</label>"
})

music3.push({
	question:"<p>Where was the Woodstock concert performed?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"1\"><label for=\"1\">Max Yasgur's farm</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Madison Square Garden</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Woodstock, New York</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Rhineback, New York</label>"
})

music3.push({
	question:"<p>Which song was not in 'The Wizard of Oz'?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">If I only Had a Brain</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Over the Rainbow</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">If I Only Had a Heart</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"4\"><label for=\"4\">There's no Place Like Home</label>"
})

music3.push({
	question:"<p>How many notes are on the Circle of Fifths?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">5</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">10</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"3\"><label for=\"3\">12</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">15</label>"
})

let music4=[];

music4.push({
	question:"<p>Who is tall and tan and young and lovely?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Prince</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"2\"><label for=\"2\">The Girl From Ipanema</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">The Ghost of Tsushima</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Madonna</label>"
})

music4.push({
	question:"<p>The bullfrog was a good friend of mine. I never understood a single word he said, but I helped him drink his wine. What was the bullfrog's name?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Lewis</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Louis</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"3\"><label for=\"3\">Jeremiah</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Conrad</label>"
})

music4.push({
	question:"<p>Who was Led Zeppelin's bassist?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Neil Peart</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">John Bohnam</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"3\"><label for=\"3\">John Paul Jones</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Jon Bon Jovi</label>"
})

music4.push({
	question:"<p>Which of the following is not a real musical note?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"1\"><label for=\"1\">E#</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">F</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">C</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">G#</label>"
})

music4.push({
	question:"<p>What song plays at Yankee Stadium when the Yankees win?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">My Way</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">You Make me Feel So Young</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Fly Me To The Moon</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"4\"><label for=\"4\">New York, New York</label>"
})

let music5=[];

music5.push({
	question:"<p>Who was originally asked to be the lead singer of Led Zeppelin?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Robert Plant</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"2\"><label for=\"2\">Terry Reid</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Steve Perry</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Roger Daltrey</label>"
})

music5.push({
	question:"<p>Which school did Ice Spice attend?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Stony Brook</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Fredonia</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"3\"><label for=\"3\">Purchase college</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Juiliard</label>"
})

music5.push({
	question:"<p>Who was originally offered and declined to record Wrecking Ball?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Miley Cyrus</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"2\"><label for=\"2\">Beyoncé</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Sabrina Carpenter</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Taylor Swift</label>"
})

music5.push({
	question:"<p>Which song inspired Lady Gaga's stage name?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"1\"><label for=\"1\">Radio Ga Ga</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Just Dance</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Poker Face</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Bohemian Rhapsody</label>"
})


music5.push({
	question:"<p>How many unique notes are in a chromatic scale?(Exactly one octave apart counts as the same note).</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">7</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">8</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"3\"><label for=\"3\">12</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">13</label>"
})


const music=[music1,music2,music3,music4,music5];


//______________________________sports______________________________________________________________________________________________________________________________
let sports1=[];


sports1.push({
	question:"<p>What sport do the New York Yankees play?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"1\"><label for=\"1\">Baseball</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Basketball</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Football</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Hockey</label>"
})

sports1.push({
	question:"<p>What is the name of Boston's Hockey team?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Bean Eaters</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Red Sox</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Dolphins</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"4\"><label for=\"4\">Bruins</label>"
})


sports1.push({
	question:"<p>What is known as the greatest trophy in all of sports?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">World Series Trophy</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">FIFA World Cup Trophy</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"3\"><label for=\"3\">Stanley Cup trophy</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Lombardi trophy</label>"
})

sports1.push({
	question:"<p>Which sport is played at Wimbledon</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Golf</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"2\"><label for=\"2\">Tennis</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Pickleball</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Squash</label>"
})

sports1.push({
	question:"<p>Who holds the most superbowl rings?(2025)</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">New England Patriots</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"2\"><label for=\"2\">Tom Brady</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Pittsburgh Steelers</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Patrick Mahomes</label>"
})



let sports2=[];
sports2.push({
	question:"<p>What is Basketball's championship trophy called?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Vince Lombardi</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"2\"><label for=\"2\">Larry O'Brien</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Stanley Cup</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">World Series</label>"
})

sports2.push({
	question:"<p>In hockey, who is known as the great one?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"1\"><label for=\"1\">Wayne Gretsky</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Mario Lemieux</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Mike Richter</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Alex Ovetchkin</label>"
})

sports2.push({
	question:"<p>Which sport is played in the Rose Bowl?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"1\"><label for=\"1\">Football</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Basketball</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Olympic Ice Skating</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Soccer</label>"
})


sports2.push({
	question:"<p>Who never won a major Golf tournament?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Bryson DeChambeau</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Fred Couples</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Rory Mcllroy</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"4\"><label for=\"4\">Tony Finau</label>"
})

sports2.push({
	question:"<p>Who is known as \"The Greatest\"?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Wayne Gretsky</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Babe Ruth</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"3\"><label for=\"3\">Muhmmad Ali</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Tom Brady</label>"
})




let sports3=[];
sports3.push({
	question:"<p>Which award is given annually to the NHL's greatest goalie of the regular season?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Hart trophy</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Conn Smythe trophy</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"3\"><label for=\"3\">Vezina trophy</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Norris trophy</label>"
})

sports3.push({
	question:"<p>Which is not a real MLB team?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Red Sox</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">White Sox</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"3\"><label for=\"3\">Black Sox</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Reds</label>"
})

sports3.push({
	question:"<p>How old are Kentucky Derby Horses?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">2 years old</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"2\"><label for=\"2\">3 years old</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">4 years old</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">5 years old</label>"
})

sports3.push({
	question:"<p>Who said \"Do you believe in miracles?\"?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"1\"><label for=\"1\">Al Michaels</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Vin Scully</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Kenny Albert</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">John Madden</label>"
})

sports3.push({
	question:"<p>Other than basketball, which sport did Michael Jordan play professionally?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Volleyball</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Bowling</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Football</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"4\"><label for=\"4\">Baseball</label>"
})

let sports4=[];

sports4.push({
	question:"<p>Who is MLB's only 40/70 man?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Shohei Ohtani</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Bobby Witt Jr.</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"3\"><label for=\"3\">Ronald Acuña Jr.</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Bryce Harper</label>"
})

sports4.push({
	question:"<p>Which of the following is not a decathlon event?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Javelin</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">High Jump</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Pole Vault</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"4\"><label for=\"4\">Hammer Throw</label>"
})


sports4.push({
	question:"<p>Who has not won a triple crown?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Seabiscuit</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"2\"><label for=\"2\">Secretariat</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Justify</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">American Pharoah</label>"
})

sports4.push({
	question:"<p>Who holds the record for the most olympic gold medals?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Simone Biles</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"2\"><label for=\"2\">Michael Phelps</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Larisa Latynina</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Kerri Strug</label>"
})


sports4.push({
	question:"<p>Who is MLB's current active home runs leader?(2025).</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Aaron Judge</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"2\"><label for=\"2\">Giancarlo Stanton</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Shohei Ohtani</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Mike Trout</label>"
})

let sports5=[];

sports5.push({
	question:"<p>Which sport debuted at the 2024 Paris Olympic games?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Cricket</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Dodgeball</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"3\"><label for=\"3\">Breaking</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Ice dancing</label>"
})

sports5.push({
	question:"<p>Other than basketball, which sport inducted Wilt Chamberlain into the hall of fame?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Baseball</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"2\"><label for=\"2\">Volleyball</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Golf</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Tennis</label>"
})

sports5.push({
	question:"<p>Which team did MLB's New York Giants convert to?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Los Angeles Dodgers</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">San Diego Padres</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"3\"><label for=\"3\">San Francisco Giants</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Los Angeles Angels</label>"
})


sports5.push({
	question:"<p>Who holds the NFL record for NFL sacks all-time?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Willie McGinest</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Frank Clark</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Lawrence Taylor</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"4\"><label for=\"4\">Harvey Martin</label>"
})

sports5.push({
	question:"<p>Which team's home field is known as \" The Big Egg\"?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"1\"><label for=\"1\">Yomiuri Giants</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Toronto Blue Jays</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Los Angeles Dodgers</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Yokoama DeNa Baystars</label>"
})

const sports=[sports1,sports2,sports3,sports4,sports5]




let videoGames1=[];

videoGames1.push({
	question:"<p>What is Super Mario's brother's name?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Mario</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"2\"><label for=\"2\">Luigi</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Waluigi</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Wario/label>"
})


videoGames1.push({
	question:"<p>What does COD stand for?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Cry of the Deity</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Crisis of Dorado</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"3\"><label for=\"3\">Call of Duty</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Code of Destruction</label>"
})

videoGames1.push({
	question:"<p>Which game franchise features 'Master Chief'?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Call of Duty</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Battlefield</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Portal</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"4\"><label for=\"4\">Halo</label>"
})


videoGames1.push({
	question:"<p>Who is the hero of time?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Mario</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Luigi</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"3\"><label for=\"3\">Link</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Zelda</label>"
})

videoGames1.push({
	question:"<p>Which pokémon directly evolves from Bulbasaur?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"1\"><label for=\"1\">Ivysaur</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Venusaur</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Charizard</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Torterra</label>"
})

let videoGames2=[];


videoGames2.push({
	question:"<p>What is the best-selling video game of all time?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Fortnite</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Assasin's Creed</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"3\"><label for=\"3\">Minecraft</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Overwatch</label>"
})

videoGames2.push({
	question:"<p>What is Sans' brothers name?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Mettaton</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"2\"><label for=\"2\">Papyrus</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Ninten</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Chara</label>"
})

videoGames2.push({
	question:"<p>Who says \"Thank you Mario! But our princess is in another castle!\"?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Luigi</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Mario</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"3\"><label for=\"3\">Toad</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Bowser</label>"
})

videoGames2.push({
	question:"<p>Which video game features James Bond as the main character?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Doom 64</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Hitman</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"3\"><label for=\"3\">GoldenEye 007</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Thunderball 007</label>"
})

videoGames2.push({
	question:"<p>Which video game series features the infamous character known as 'Purple Guy'?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Pikmin</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Mariokart</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Doom</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"4\"><label for=\"4\">Five Nights at Freddy's</label>"
})


let videoGames3=[];

videoGames3.push({
	question:"<p>Which of the following is not a real Mariokart track?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Maple Treeway</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Coconut Mall</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"3\"><label for=\"3\">Mushroom George</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Toad's Factory</label>"
})

videoGames3.push({
	question:"<p>Which animal is featured in the Bloons Tower Defense games?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Pigs</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"2\"><label for=\"2\">Monkeys</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Wolves</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Elephants</label>"
})

videoGames3.push({
	question:"<p>What planet does Kirby come from?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"1\"><label for=\"1\">Pop Star</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Dream Land</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Robobot</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Patch Land</label>"
})

videoGames3.push({
	question:"<p>What is the first form of fast travel in Hollow Knight?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Teleportation</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Roach Riding</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Beetle Boulevard</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"4\"><label for=\"4\">Stag Station</label>"
})

videoGames3.push({
	question:"<p>What is the most hostile species of slime?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Black Slime</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Sludge Slime</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"3\"><label for=\"3\">Tarr Slime</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Ganondorf</label>"
})


let videoGames4=[];


videoGames4.push({
	question:"<p>What is Joel Miller's daughter's name?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Ellie</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"2\"><label for=\"2\">Sarah</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Ashley</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Angie</label>"
})

videoGames4.push({
	question:"<p>Which pokémon has the power to move continents?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Arceus</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Groudon</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Garchomp</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"4\"><label for=\"4\">Regigigas</label>"
})

videoGames4.push({
	question:"<p>Which of the following is not one of the Pac-man ghosts?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Inky</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Pinky</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"3\"><label for=\"3\">Dinky</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Blinky</label>"
})

videoGames4.push({
	question:"<p>How did Felix White prove Henry Stickmin not guilty?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"1\"><label for=\"1\">The knot was tied on the outside of the bag</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">The truck drove to the wrong location</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">He framed someone else</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">He didn't</label>"
})




videoGames4.push({
	question:"<p>Which character iconically dematerializes into separate pieces and rematerializes in the middle of combat?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Dracula</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"2\"><label for=\"2\">Yellow Devil</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Ganondorf</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Andross</label>"
})


let videoGames5=[];


videoGames5.push({
	question:"<p>Who's initial on his hat was drawn backwards on the cover art for 'Mariokart: Double Dash'?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Mario</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"2\"><label for=\"2\">Luigi</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Wario</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Waluigi</label>"
})


videoGames5.push({
	question:"<p>What color is Don Pianta?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Blue</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Pink</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Yellow</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"4\"><label for=\"4\">Orange</label>"
})


videoGames5.push({
	question:"<p>What planet was Bart Torgal crash land on?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Zebes</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"2\"><label for=\"2\">4546-B</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Tallon-IV</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Duna</label>"
})

videoGames5.push({
	question:"<p>What Yoshi's full name?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"1\"><label for=\"1\">Yoshi</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">T. Yoshisaurus Bowsabustus</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"3\"><label for=\"3\">T. Yoshisaur Munchakoopas</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Dragonsaur Yoshidon</label>"
})

videoGames5.push({
	question:"<p>Who is the oldest recurring video game character?</p>",
	choice1:"<input type=\"radio\" name=\"choice\" class=\"choice correct\" id=\"1\"><label for=\"1\">Mr. Game & Watch</label>",
	choice2:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"2\"><label for=\"2\">Pac-man</label>",
	choice3:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"3\"><label for=\"3\">Megaman</label>",
	choice4:"<input type=\"radio\" name=\"choice\" class=\"choice\" id=\"4\"><label for=\"4\">Donkey Kong</label>"
})


const videoGames=[videoGames1,videoGames2,videoGames3,videoGames4,videoGames5];
