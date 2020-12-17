"use strict";
const toDoList = document.querySelector(".toDoList");
const plusBtn = document.querySelector(".plus");
const input = document.querySelector(".input");

const TODOES_LS = "toDoes";
let toDoes = [];

function savetoDoes() {
    localStorage.setItem(TODOES_LS, JSON.stringify(toDoes));
}

function deleteToDo(event) {
    const btn = event.target;
    const btnType = btn.classList.item(0);
    const li = btn.parentNode;
    const cleanToDoes = toDoes.filter(function (toDo) {
        return toDo.id !== parseInt(li.id);
    });
    console.log(cleanToDoes);
    toDoes = cleanToDoes;

    //여기다가 나중에 애니메이션이나 파티클 추가할것
    if (btnType === "check") {
        console.log("check");
    } else if (btnType === "delete") {
        console.log("delete");
    }

    toDoList.removeChild(li);
    savetoDoes();
}

//이 부분은.. 하나하나 만들기보단 그냥 html string을 작성하서 넣는게 좋다.
function paintToDo(text) {
    const li = document.createElement("li");
    const checkBtn = document.createElement("button");
    const checkImg = document.createElement("i");
    const deleteBtn = document.createElement("button");
    const deleteImg = document.createElement("i");
    const newId = toDoes.length + 1;

    //add class
    checkBtn.classList.add("check");
    checkImg.classList.add("fas", "fa-check");
    deleteBtn.classList.add("delete");
    deleteImg.classList.add("fas", "fa-trash-alt");

    checkBtn.append(checkImg);
    deleteBtn.appendChild(deleteImg);
    // checkBtn.addEventListener("click", deleteToDo);
    // deleteBtn.addEventListener("click", deleteToDo);

    li.innerText = `${text} `;
    li.append(checkBtn);
    li.append(deleteBtn);
    li.id = newId;

    const toDoObj = {
        text: text,
        id: newId,
    };

    toDoes.push(toDoObj);
    toDoList.append(li);
    savetoDoes();
}

function loadData() {
    const loadToDoes = localStorage.getItem(TODOES_LS);
    if (loadToDoes !== null) {
        const parsedToDoes = JSON.parse(loadToDoes);
        parsedToDoes.forEach(function (toDo) {
            paintToDo(toDo.text);
        });
    }
}

function uploadList() {
    if (input.value === "") {
        console.log("input이 비어있소");
        return;
    }

    //input text가 안비어있다면 input 자워주고 paintToDo실행
    paintToDo(input.value);
    input.value = "";
    input.focus();
}

//plusBtn을 눌렀을시 input초기화, list에 올리기
function init() {
    loadData();
    toDoList.addEventListener("click", (event) => {
        if (
            event.target.classList.item(0) === "delete" ||
            event.target.classList.item(0) === "check"
        ) {
            deleteToDo(event);
        }
    });
    plusBtn.addEventListener("click", uploadList);
    input.addEventListener("keypress", (event) => {
        if (event.keyCode === 13) {
            uploadList();
        }
    });
}

init();
