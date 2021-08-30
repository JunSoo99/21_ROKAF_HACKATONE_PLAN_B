// 외부 모듈 import
import { basicTableRow, topTableRow } from './basicTable.js';
import { alertTable, alertTableRow } from './alertTable.js';
import { mainTableRow, topMainRow } from './mainTable.js';
import { loading } from './loading.js';

// 외부 모듈과의 변수 공유
export var container = document.getElementById("container"); // 최상위 컨테이너 div
export var basicTable = document.getElementById("basicTable"); // 좌측 대대원 정보 div
export var alertTableDiv = document.getElementById("alertTable"); // 우측 div
export var mainTable = document.getElementById("mainTable"); // 중앙 화면 div
export var mainTableRecc = document.getElementById("mainTableRecc"); // 중앙 하단 버튼들 div
export var stageWidth, stageHeight; // 스테이지 크기
// 화면 요소들간 비율
export var basicTableRatio = 0.2
export var alertTableRatio = 0.2
export var mainTableRatio = 0.6
export var rows = []; // 대대원 리스트
export var recc = []; // DB에서 쿼리한 추천 스케줄을 관리할 리스트

// 모듈 내 글로벌 변수들
var reccRows = []; // 화면에 보여지고 있는 추천 스케줄 row 리스트
var currentRecc = 0; // 현재 보여지고 있는 추천 스케줄 인덱스
var mainTableLeft = document.getElementById("mainTableLeft");
var mainTableRight = document.getElementById("mainTableRight"); // 좌우 버튼들

// 이벤트 리스너 지정
mainTableRecc.addEventListener('click', function () { reccFunc(0) });
mainTableLeft.addEventListener('click', moveLeft);
mainTableRight.addEventListener('click', moveRight);

// div 속성 지정
container.style.display = 'flex';
container.style.flexDirection = 'row';
basicTable.style.margin = "15px";
alertTableDiv.style.margin = "15px";
mainTable.style.margin = "15px";
mainAlert.style.margin = '15px';

// 로딩 시간 구현을 위해 reccFunc, reccFunc2 두개로 나눔
function reccFunc(index){
    var Loading = new loading('스케줄표 생성중...');
    setTimeout(function(){
        reccFunc2(index)
        Loading.deleteThis();
    }, 1500);
}

function reccFunc2(index) {
    // 이미 보여지고 있는 추천 스케줄만 제거
    for (var i = 0; i < reccRows.length; i++) {
        reccRows[i].deleteThis();
    }
    var table = recc[index];
    for (var i = 0; i < table.length; i++) {
        reccRows.push(new mainTableRow(table[i][0], table[i][1], table[i][2], table[i][3], table[i][4], table[i][5], table[i][6]));
    }
}

// 좌우 버튼 함수
function moveLeft(){
    if (currentRecc == 0){
        currentRecc = 2;
    }else{
        currentRecc -= 1;
    }
    reccFunc2(currentRecc);
}

function moveRight(){
    if (currentRecc == 2){
        currentRecc = 0;
    }else{
        currentRecc += 1;
    }
    reccFunc2(currentRecc);
}

class App {
    constructor() {
        window.addEventListener("resize", this.resize.bind(this)); // 리사이즈 이벤트 리스너 지정
        
        // 화면 구성 요소들 생성
        this.TopTableRow  = new topTableRow();
        this.AlertTable = new alertTable("ALERT","MORNING","DAY","NIGHT");
        this.numOfPlane = new alertTable("PLANES","MORNING","DAY",null)
        this.MainTable = new topMainRow();

        // 리사이즈
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

        // 객체 리사이징
        this.AlertTable.resize();
        this.numOfPlane.resize();
        this.TopTableRow.resize();
        this.MainTable.resize();
        for (var i = 0; i < rows.length; i ++){
            rows[i].resize()
        }
    }
}

var newApp = new App(); // app 선언
var Loading = new loading('서버에서 DB를 불러오는 중입니다.'); // 로딩화면 선언

// DB 로딩
const xhr = new XMLHttpRequest();
xhr.open('GET', 'http://rokafa.com:5000/static/main.db', true);
xhr.responseType = 'arraybuffer';
xhr.addEventListener('load',xhrLoad.bind(this));

function xhrLoad(e){
    // 대대원 정보 리셋
    for (var i = 0; i < rows.length; i++) {
        rows[i].deleteThis();
    }

    const uInt8Array = new Uint8Array(xhr.response);
    const db = new SQL.Database(uInt8Array);
    const contents = db.exec("SELECT * FROM user");
    const user = contents[0].values;

    // DB에서 불러온 대대원 리스트
    for (var i = 0; i < user.length; i++) {
        rows.push(new basicTableRow(user[i][0], user[i][1], user[i][2], user[i][3]));
    }
    Loading.deleteThis(); // 로딩 끝

    // 추천 스케줄 recc에 추가
    const recc1Sql = db.exec('select * from recc1')[0].values;
    recc.push(recc1Sql);
    const recc2Sql = db.exec('select * from recc2')[0].values;
    recc.push(recc2Sql);
    const recc3Sql = db.exec('select * from recc3')[0].values;
    recc.push(recc3Sql);
    //const recc4Sql = db.exec('select * from recc4')[0].values;
    //recc.push(recc4Sql);
    //const recc5Sql = db.exec('select * from recc5')[0].values;
    //recc.push(recc5Sql);
}

xhr.send();