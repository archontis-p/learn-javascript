
let myLeads = [];
// JSON.parse
// JSON.stringify
let currentTab = ""

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn");
const delBtn = document.getElementById("del-btn")
const tabBtn = document.getElementById("tab-btn")
const ulEl = document.getElementById("ul-el")

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
console.log(leadsFromLocalStorage)

if (leadsFromLocalStorage){
    myLeads=leadsFromLocalStorage
    render(myLeads)
}

inputBtn.addEventListener("click", function(){
    myLeads.push(inputEl.value)
    inputEl.value = "";
    localStorage.setItem("myLeads",JSON.stringify(myLeads));
    render(myLeads);
})


function getTab(){
    chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
        return tabs[0];
    })
}



tabBtn.addEventListener("click",function(){
    currentTab = getTab()
    myLeads.push(tabs[0].url)
    localStorage.setItem("myLeads",JSON.stringify(myLeads));
    render(myLeads);


})

delBtn.addEventListener("dblclick",function(){
    localStorage.clear()
    myLeads = [];
    render(myLeads);
    console.log("Cleared local storage")
})

function render(arr){
    let listItems = ""
    for(let i=0;i<arr.length;i++){
        // listItems += "<li> <a target='blank' href=\"https://" + arr[i] + "\">" + arr[i] +"</a></li>"
        listItems += `
            <li>
                <a target="blank" href="https://${arr[i]}">
                    ${arr[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems;
}

