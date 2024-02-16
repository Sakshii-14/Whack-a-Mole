const score=document.querySelector("#score");
const holes=document.querySelectorAll(".hole");
const mole=document.querySelectorAll(".mole");
let lasthole;
let timeup=false;
let scorecard=0;

function randomtime(min,max){
    return Math.round(Math.random()*(max-min)+min);
    
}
function randomhole(holes){
    let index = Math.floor(Math.random()*holes.length);
    let hole=holes[index];
    if(hole===lasthole)
    {
        console.log("same hole")
        return randomhole(holes);
        
    }
    lasthole=hole;
    return hole;
}
function peep(){
    const time=randomtime(20,2000);
    const hole=randomhole(holes);
    hole.classList.add('up');
    setTimeout(()=>{
        hole.classList.remove('up')
        if(!timeup) peep();
    },time)
}
function start(){
    let lastscore=JSON.parse(localStorage.getItem("value"));
    score.textContent=0;
    document.querySelector("#high").textContent='';
    timeup=false;
    scorecard=0;
    peep();
    setTimeout(() => {
        timeup=true;
        if(scorecard>lastscore && lastscore!=undefined)
        {
            document.querySelector("#high").textContent="New High Score!!";
        }
    }, 10000);
}
mole.forEach((elem)=>{elem.addEventListener("click",handleclick)})
function handleclick(e){    
    if(!e.isTrusted) return;//cheating or fake clicking
    scorecard++;
    this.classList.remove('up');
    score.textContent=scorecard;
    localStorage.setItem("value",JSON.stringify(scorecard))
}
document.querySelector("button").addEventListener("click",start);
