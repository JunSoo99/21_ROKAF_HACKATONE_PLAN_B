import { basicTableRow, topTableRow } from './basicTable.js';
import { alertTable, alertTableRow } from './alertTable.js';
import { mainTableRow, topMainRow } from './mainTable.js';
import { loading } from './loading.js';

export var container = document.getElementById("container");
export var basicTable = document.getElementById("basicTable");
export var alertTableDiv = document.getElementById("alertTable");
export var mainTable = document.getElementById("mainTable");
export var mainTableRecc = document.getElementById("mainTableRecc");
export var stageWidth, stageHeight;
export var basicTableRatio = 0.2
export var alertTableRatio = 0.2
export var mainTableRatio = 0.6
export var rows = [];
export var recc = [];

var reccRows = [];
var currentRecc = 0;
var mainTableLeft = document.getElementById("mainTableLeft");
var mainTableRight = document.getElementById("mainTableRight");
mainTableRecc.addEventListener('click', function () { reccFunc(0) });
mainTableLeft.addEventListener('click', moveLeft);
mainTableRight.addEventListener('click', moveRight);

var container = document.getElementById("container");
container.style.display = 'flex';
container.style.flexDirection = 'row';

basicTable.style.margin = "15px";
alertTableDiv.style.margin = "15px";
mainTable.style.margin = "15px";
mainAlert.style.margin = '15px';

function reccFunc(index){
    var Loading = new loading('스케줄표 생성중...');
    setTimeout(function(){
        reccFunc2(index)
        Loading.deleteThis();
    }, 1500);
}

function reccFunc2(index) {
    for (var i = 0; i < reccRows.length; i++) {
        reccRows[i].deleteThis();
    }
    var table = recc[index];
    for (var i = 0; i < table.length; i++) {
        reccRows.push(new mainTableRow(table[i][0], table[i][1], table[i][2], table[i][3], table[i][4], table[i][5], table[i][6]));
    }
}

function moveLeft(){
    if (currentRecc == 0){
        currentRecc = 4;
    }else{
        currentRecc -= 1;
    }
    reccFunc2(currentRecc);
}

function moveRight(){
    if (currentRecc == 4){
        currentRecc = 0;
    }else{
        currentRecc += 1;
    }
    reccFunc2(currentRecc);
}

class dayNightTable{
    constructor(){

    }
}

class App {
    constructor() {
        window.addEventListener("resize", this.resize.bind(this));
        this.TopTableRow  = new topTableRow();
        this.AlertTable = new alertTable("비상대기 근무","오전","오후","야간");
        this.numOfPlane = new alertTable("비행자원","오전","오후",null)
        this.MainTable = new topMainRow();
        this.resize()
    }

    resize() {
        //stage
        stageWidth = document.body.clientWidth;
        stageHeight = document.body.clientHeight - 45;
        //container
        container.style.width = stageWidth;
        container.style.height = stageHeight;
        //basic table
        basicTable.style.width = stageWidth * basicTableRatio;
        basicTable.style.height = stageHeight;
        //alert table
        alertTableDiv.style.width = stageWidth * alertTableRatio;
        alertTableDiv.style.height = stageHeight;
        //main table
        mainTable.style.width = stageWidth * mainTableRatio;
        mainTable.style.height = stageHeight + 45;
        //alert table
        alertTableDiv.style.width = stageWidth * alertTableRatio;
        alertTableDiv.style.height = stageHeight;
        //
        this.AlertTable.resize();
        this.numOfPlane.resize();
        this.TopTableRow.resize();
        this.MainTable.resize();

        for (var i = 0; i < rows.length; i ++){
            rows[i].resize()
        }
        for (var i = 0; i < reccRows.length; i++) {
            reccRows[i].resize()
        }

    }
}

var newApp = new App();
var Loading = new loading('서버에서 DB를 불러오는 중입니다.');

const xhr = new XMLHttpRequest();
xhr.open('GET', 'http://127.0.0.1:5500/main.db', true);
xhr.responseType = 'arraybuffer';
xhr.addEventListener('load',xhrLoad.bind(this));

function xhrLoad(e){
    for (var i = 0; i < rows.length; i++) {
        rows[i].deleteThis();
    }

    const uInt8Array = new Uint8Array(xhr.response);
    const db = new SQL.Database(uInt8Array);
    const contents = db.exec("SELECT * FROM user");
    const user = contents[0].values;

    for (var i = 0; i < user.length; i++) {
        rows.push(new basicTableRow(user[i][0], user[i][1], user[i][2], user[i][3]));
    }
    Loading.deleteThis();

    const recc1Sql = db.exec('select * from recc1')[0].values;
    recc.push(recc1Sql);
    const recc2Sql = db.exec('select * from recc2')[0].values;
    recc.push(recc2Sql);
    const recc3Sql = db.exec('select * from recc3')[0].values;
    recc.push(recc3Sql);
    const recc4Sql = db.exec('select * from recc4')[0].values;
    recc.push(recc4Sql);
    const recc5Sql = db.exec('select * from recc5')[0].values;
    recc.push(recc5Sql);
}

xhr.send();