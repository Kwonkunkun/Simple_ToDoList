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
    checkBtn.addEventListener("click", deleteToDo);
    deleteBtn.addEventListener("click", deleteToDo);

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
    const loadtoDoes = localStorage.getItem(TODOES_LS);

    console.log(loadtoDoes);

    if (toDoes === null) {
        return;
    }

    for (let toDo of toDoes) {
        paintToDo(toDo);
    }
}

function uploadList() {
    if (input.value === "") {
        console.log("input이 비어있소");
        return;
    }

    //중복일시 여기서 다끊자!

    //input text가 안비어있다면 input 자워주고 paintToDo실행
    paintToDo(input.value);
    input.value = "";
}

//plusBtn을 눌렀을시 input초기화, list에 올리기
function init() {
    loadData();
    plusBtn.addEventListener("click", uploadList);
    input.addEventListener("submit", uploadList);
}

init();
