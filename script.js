const AMOUNT = 5;

const NA_WZOR = [
    ['tlenek żelaza (III)','Fe2O3'],
    ['tlenek glinu','Al2O3'],
    ['tlenek węgla (IV)','CO2'],
    ['tlenek węgla (II)','CO'],
    ['tlenek azotu (V)','N2O5'],
    ['tlenek wodoru','H2O'],
    ['tlenek siarki (VI)','SO3'],
    ['tlenek fluoru','F2O'],
    ['tlenek srebra (I)','Ag2O'],
    ['tlenek baru','BaO'],
    ['tlenek cyny (IV)','SnO2'],
    ['tlenek cynku','ZnO'],
    ['tlenek bromu (III)','Br2O3'],
    ['tlenek potasu','K2O'],
    ['tlenek sodu','Na2O'],
    ['tlenek magnezu','MgO'],
    ['tlenek litu','Li2O'],
    ['tlenek wapnia','CaO'],
    ['tlenek rtęci (I)','Hg2O'],
    ['tlenek ołowiu (IV)','PbO2'],
    ['tlenek miedzi (II)','CuO'],
    ['tlenek fosforu (V)','P2O5'],
    ['tlenek molibdenu (VI)','MoO3'],
    ['tlenek berylu','BeO']
    ];

const NA_NAZWE = [
    ['Cl<sub>2</sub>O',['tl.chloru','(i)',false]],
    ['NO<sub>2</sub>',['tl.azotu','(iv)',false]],
    ['Na<sub>2</sub>O',['tl.sodu','(i)',true]],
    ['FeO',['tl.zelaza','(ii)',false]],
    ['SiO<sub>2</sub>',['tl.krzemu','(iv)',false]],
    ['MgO',['tl.magnezu','(ii)',true]],
    ['H<sub>2</sub>O',['tl.wodoru','(i)',true]],
    ['Cl<sub>2</sub>O<sub>5</sub>',['tl.chloru','(v)',false]],
    ['BaO',['tl.baru','(ii)',true]],
    ['Cu<sub>2</sub>O',['tl.miedzi','(i)',false]],
    ['N<sub>2</sub>O<sub>5</sub>',['tl.azotu','(v)',false]],
    ['SO<sub>2</sub>',['tl.siarki','(ii)',false]],
    ['K<sub>2</sub>O',['tl.potasu','(i)',true]],
    ['Rb<sub>2</sub>O',['tl.rubidu','(i)',true]],
    ['CO<sub>2</sub>',['tl.węgla','(iv)',false]],
    ['MnO<sub>3</sub>',['tl.manganu','(vi)',false]],
    ['RaO',['tl.radu','(ii)',true]],
    ['Co<sub>2</sub>O<sub>3</sub>',['tl.kobaltu','(iii)',false]],
    ['CrO<sub>3</sub>',['tl.chromu','(vi)',false]],
];

const POLSKIE_ZNAKI = {'ą':'a','ć':'c','ę':'e','ł':'l','ń':'n','ó':'o','ś':'s','ź':'z','ż':'z'};
const WRONG_COLOR = '#ff8080';
const RIGHT_COLOR = '#80ff80';
const dlugoscNaWzor = NA_WZOR.length;
const dlugoscNaNazwe = NA_NAZWE.length;

let ansOn = false;
let checked = false;
let anwsers = [];
let prev = [];
let content, buttons, verb2, ansbutton, checkbutton, overlay, lastFocused;

function generate() {
    checked = false;
    checkbutton.disabled = false;
    ansbutton.disabled = false;
    ansOn = false;
    ansbutton.innerText = "Pokaż odpowiedzi";
    anwsers = [];
    prev = [];
    verb2.innerHTML = '<span style="text-align:center;font-weight:bold;font-size:1.25em;margin:.25em 0 0;">Zadanie 1</span>';
    const naWzor = NA_WZOR.slice();
    for (let i = dlugoscNaWzor; i > (dlugoscNaWzor - AMOUNT); i--) {
        let l = naWzor.splice(Math.floor(Math.random() * i), 1)[0];
        verb2.innerHTML += `<div class="row"><span>${l[0]}</span><input type="text"></div>`;
        anwsers.push(l[1]);
    }
    verb2.innerHTML += '<span style="text-align:center;font-weight:bold;font-size:1.25em;">Zadanie 2</span>';
    const naNazwe = NA_NAZWE.slice();
    for (let i = dlugoscNaNazwe; i > (dlugoscNaNazwe - AMOUNT); i--) {
        let l = naNazwe.splice(Math.floor(Math.random() * i), 1)[0];
        verb2.innerHTML += `<div class="row"><span>${l[0]}</span><input type="text"></div>`;
        anwsers.push(l[1]);
    }
}

function onload() {
    content = document.getElementById('content');
    buttons = document.getElementById('buttons');
    verb2 = document.getElementById("verb2");
    ansbutton = document.getElementById("ans");
    checkbutton = document.getElementById("check");
    overlay = document.getElementById('overlay');
    generate();
    onResize();
    window.addEventListener('resize', onResize);
    document.addEventListener('focusin', function(e) {
        if (e.target.tagName === 'INPUT') {
            lastFocused = e.target;
        }
    });
    overlay.addEventListener('click', function() {
        this.style.display = 'none';
        if (lastFocused) lastFocused.focus();
    });
    document.addEventListener('keydown', function() {
        if (overlay.style.display === 'flex') {
            overlay.style.display = 'none';
            if (lastFocused) lastFocused.focus();
        }
    });
}

function check() {
    if (checked) {
        checked = false;
        for (let i = 0; i < AMOUNT; i++) {
            let text = verb2.children[i+1].children[1];
            if (text.dataset.state === 'wrong') {
                text.disabled = false;
                text.style.backgroundColor = "#ffffff";
            }
        }
        for (let i = AMOUNT; i < 2*AMOUNT; i++) {
            let text = verb2.children[i+2].children[1];
            if (text.dataset.state === 'wrong') {
                text.disabled = false;
                text.style.backgroundColor = "#ffffff";
            }
        }
    } else {
        checked = true;
        let correctAnwsers = 0;
        for (let i = 0; i < AMOUNT; i++) {
            let text = verb2.children[i+1].children[1];
            text.disabled = true;
            if (text.value.trim() === anwsers[i]) {
                text.style.backgroundColor = RIGHT_COLOR;
                text.dataset.state = 'right';
                correctAnwsers++;
            } else {
                text.style.backgroundColor = WRONG_COLOR;
                text.dataset.state = 'wrong';
            }
        }
        for (let i = AMOUNT; i < 2*AMOUNT; i++) {
            let text = verb2.children[i+2].children[1];
            text.disabled = true;
            const normalizedText = text.value.toLowerCase().replace('tlenek', 'tl.').replace(/[ąćęłńóśźż]/g, match => POLSKIE_ZNAKI[match]).replace(/(?<!\w)\s|\s(?!\w)/g, '');
            const currentAnwsers = anwsers[i];
            if (normalizedText === currentAnwsers[0]+currentAnwsers[1] || currentAnwsers[2] && normalizedText === currentAnwsers[0]) {
                text.style.backgroundColor = RIGHT_COLOR;
                text.dataset.state = 'right';
                correctAnwsers++;
            } else {
                text.style.backgroundColor = WRONG_COLOR;
                text.dataset.state = 'wrong';
            }
        }
        if (2*AMOUNT === correctAnwsers) {
            checkbutton.disabled = true;
            ansbutton.disabled = true;
        }
    }
}

function toggleAnwsers() {
    if (ansOn) {
        ansOn = false;
        ansbutton.innerText = "Pokaż odpowiedzi";
        for (let i = 0; i < AMOUNT; i++) {
            let text = verb2.children[i+1].children[1];
            text.value = prev[i];
        }
        for (let i = AMOUNT; i < 2*AMOUNT; i++) {
            let text = verb2.children[i+2].children[1];
            text.value = prev[i];
        }
    } else {
        if (!checked) check();
        ansOn = true;
        ansbutton.innerText = "Ukryj odpowiedzi";
        checkbutton.disabled = true;
        for (let i = 0; i < AMOUNT; i++) {
            let text = verb2.children[i+1].children[1];
            prev[i] = text.value;
            text.disabled = true;
            if (text.dataset.state === 'wrong') {
                text.value = anwsers[i];
            }
        }
        for (let i = AMOUNT; i < 2*AMOUNT; i++) {
            let text = verb2.children[i+2].children[1];
            prev[i] = text.value;
            text.disabled = true;
            if (text.dataset.state === 'wrong') {
                const currentAnwsers = anwsers[i];
                text.value = `${currentAnwsers[0].replace("tl.","tlenek ")} ${currentAnwsers[2] ? "" : currentAnwsers[1].toUpperCase()}`;
            }
        }
    }
}

function onResize() {
    const img = document.getElementById('ukladokresowy');
    if (img.clientWidth < window.innerWidth) {
        img.style.cursor = 'pointer';
    } else {
        img.style.cursor = 'default';
    }
}

function openOverlay() {
    const img = document.getElementById('ukladokresowy');
    if (img.clientWidth < window.innerWidth) {
        document.getElementById('overlay').style.display = 'flex';
    }
}
