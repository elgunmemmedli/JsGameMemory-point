let timer = document.querySelector(".timer");
let moves = 0;
let counter = document.querySelector(".moves");
const stars = document.querySelectorAll(".fa-star");
document.getElementById("popup1").style.display="none";
let A = [];
let M = [];
let Img = [];
let Memory = [0, 0, 0];
let K = [];

setTimeout(Hide, 1500);
onload = function () {
    Arr(4);
    Build(4);
}

function Arr(n) {
    let x, k = 1;
    for (let i = 0; i < 16; i++) {
        if (k > 8) {
            k = 1;
        }
        else {
            k = k;
        }
        A[i] = k++;
    }
    for (let i = 0; i < n; i++) {
        M[i] = [];
        Img[i] = [];
        K[i] = [];
        for (let j = 0; j < n; j++) {
            x = Math.floor(Math.random() * A.length);
            M[i][j] = A[x];
            Img[i][j] = A[x];
            A.splice(x, 1);
        }
    }
}
function Build(n) {
    let tbl = "";
    for (let i = 0; i < n; i++) {
        tbl += "<tr>";
        for (let j = 0; j < n; j++) {
            tbl += `<td><img id="A${i}_${j}" src="img/${M[i][j]}.png" onclick = "Click(${i}, ${j})" /></td>`;
        }
        tbl += "</tr>";
    }
    document.getElementsByTagName("table")[0].innerHTML = tbl;
}

function Hide() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            M[i][j] = 0;
        }
    }
    Build(4);
}
function Click(i, j) {
    M[i][j] = Img[i][j];
    Build(4);
    if (Memory[2] == 0) {
        Memory[0] = i;
        Memory[1] = j;
        Memory[2] = Img[i][j];
        document.getElementById(`A${i}_${j}`).style.animation = "mynewmove 0.7s "
        document.getElementById(`A${i}_${j}`).style.width="150px";
        document.getElementById(`A${i}_${j}`).style.height="150px";
        MovesMove();
    }
    else {
        if (Memory[2] != Img[i][j] || (Memory[0] == i && Memory[1] == j)) {
            M[i][j] = 0;
            M[Memory[0]][Memory[1]] = 0;
            document.getElementById(`A${i}_${j}`).style.animation = "mynewmove 0.2s "
            document.getElementById(`A${i}_${j}`).style.width="150px";
            document.getElementById(`A${i}_${j}`).style.height="150px";
            setTimeout(function () {
                Build(4);
                Delete();
            }, 500);
        }
        else {
            console.log("K1");
            console.log(K);
            K[i][j] = 1;
            K[Memory[0]][Memory[1]] = 1;
            Del();
        }
        Memory[2] = 0;
    }
    Delete();
    setTimeout(Check, 700);
}


function Delete() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (K[i][j] == 1) {
                console.log("K2");
                document.getElementById(`A${i}_${j}`).removeAttribute("onclick");
            }
        }
    }
}


function Del() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (K[i][j] == 1) {
                console.log("K2");
                document.getElementById(`A${i}_${j}`).style.animation = "mynew1 1s ";
            }
            else{
                document.getElementById(`A${i}_${j}`).style.animation = "mynew1 1s ";
            }
        }
    }
}


let second = 0;
let minute = 0;
let hour = 0;
timer.innerHTML = minute + " minut " + second + " second ";
function StartTime() {
    timer.innerHTML = minute + " minut " + second + " second ";
    second++;
    if (second == 60) {
        minute++;
        second = 0;
    } if (minute == 60) {
        hour++;
        minute = 0;
    }
}



function MovesMove() {
    moves++;
    counter.innerHTML = moves;
    if (moves == 1) {
        setInterval(() => {
            StartTime()
        }, 1000);
    }


    if (moves > 8 && moves < 12) {
        for (i = 0; i < 3; i++) {
            if (i > 1) {
                stars[i].style.visibility = "collapse";
            }
        }
    }
    else if (moves > 13) {
        for (i = 0; i < 3; i++) {
            if (i > 0) {
                stars[i].style.visibility = "collapse";
            }
        }
    }
}
Stars();

function Stars() {
    moves = 0;
    counter.innerHTML = moves;
    for (let i = 0; i < stars.length; i++) {
        stars[i].style.color = "#FFD700";
        stars[i].style.visibility = "visible";
    }
    second = 0;
    minute = 0;
    hour = 0;
    let timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
}

function Check(){
    finalTime = timer.innerHTML;
    let starRating = document.querySelector(".stars").innerHTML;
    let z = 0;
    for(let i=0; i<4; i++){
        for(let j=0; j<4; j++){
          if(K[i][j] == 1){
              z++;
          }
        }
    }
    if(z==16){
        document.getElementById("popup").style.display="none";
        document.getElementById("popup1").style.display="flex";
        document.getElementsByTagName("table")[0].style.display="none";
        document.getElementById("finalMove").innerHTML = moves;
        document.getElementById("starRating").innerHTML = starRating;
        document.getElementById("totalTime").innerHTML = finalTime;
    }
}