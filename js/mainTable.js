import { mainTable, mainTableRatio, stageWidth, stageHeight, mainTableRecc, recc } from "./home.js";

var mainAlert = document.getElementById("mainAlert");
var rows = [];

export class mainTableRow {
    constructor(callSign, mission, qualification, name1, name2, takeOff, note) {
        //열 전체가 들어갈 컨테이너 지정
        this.container = document.createElement("div");
        this.container.style.display = "flex";
        this.container.style.flexDirection = "row";
        // this.container.style.paddingTop = '5px';
        // this.container.style.paddingBottom = '5px';
        // this.container.style.background = '#D8D8D8';

        //내부 요소 생성
        this.callSign = document.createElement("input");
        this.mission = document.createElement("input");
        this.qualification = document.createElement("select");
        this.name1 = document.createElement("input");
        this.name2 = document.createElement('input');
        this.takeOff = document.createElement("input");
        this.note = document.createElement("input");
        this.delete = document.createElement("img");

        //세부 속성 지정
        var options = ['교관', '4L리더', '2L리더', '윙맨'];
        for (var i = 0; i < options.length; i++) {
            var opt = document.createElement('option');
            opt.setAttribute('value', options[i]);
            opt.innerText = options[i];
            this.qualification.appendChild(opt);
        }
        //this.date.type = 'date';
        // this.delete.textContent = "-";
        this.delete.src = "../assets/images/checkbox-indeterminate-line.svg";

        //값 지정
        this.callSign.value = callSign;
        this.mission.value = mission;
        this.qualification.value = qualification;
        this.name1.value = name1;
        this.name2.value = name2;
        this.takeOff.value = takeOff;
        this.note.value = note;

        //이벤트 리스너 지정
        this.name1.addEventListener('change', this.checkRestTime.bind(this), false);
        this.takeOff.addEventListener('change', this.checkRestTime.bind(this), false);
        this.delete.addEventListener('click', this.deleteThis.bind(this), false);

        //document에 삽입
        mainTable.appendChild(this.container);
        this.container.appendChild(this.callSign);
        this.container.appendChild(this.mission);
        this.container.appendChild(this.qualification);
        this.container.appendChild(this.name1);
        this.container.appendChild(this.name2);
        this.container.appendChild(this.takeOff);
        this.container.appendChild(this.note);
        this.container.appendChild(this.delete);

        //새로고침
        this.resize();
        rows.push(this);
        this.checkRestTime();
    }

    checkRestTime(){
        mainAlert.innerHTML = "오류 없음"
        const MAIN_ALERT_SUCCESS_CLASS_NM = "main-alert-success"; // TODO 위로 올리거나 Config로 빼기
        mainAlert.classList.add(MAIN_ALERT_SUCCESS_CLASS_NM);
        // mainAlert.style.background = '#58fa68';
        for (var j = 0; j < rows.length; j++) {
            // rows[j].container.style.background = '#D8D8D8';
        }
        for(var i = 0; i < rows.length; i++){
            if (i == rows.indexOf(this)){
                continue
            }
            if (rows[i].name1.value == this.name1.value && Math.abs(rows[i].takeOff.value - this.takeOff.value) < 330 && rows[i].takeOff.value != 0 && this.takeOff.value != 0){
                mainAlert.innerHTML = "휴식시간 부족"
                const LACK_OF_REST_TIME_CLASS_NM = "lack-of-rest-time"; // TODO 위로 올리거나 Config로 빼기
                mainAlert.classList.add(LACK_OF_REST_TIME_CLASS_NM);
                // mainAlert.style.background = '#FA5858';
                this.container.classList.add(LACK_OF_REST_TIME_CLASS_NM);
                // this.container.style.background = '#FA5858';
                rows[i].container.classList.add(LACK_OF_REST_TIME_CLASS_NM);
                // rows[i].container.style.background = '#FA5858';
            }
        }
    }

    deleteThis() {
        rows.splice(rows.indexOf(this),1);
        this.container.remove();
        delete this;
    }

    resize() {
        // this.callSign.style.width = stageWidth * mainTableRatio / 29 * 4;
        // this.mission.style.width = stageWidth * mainTableRatio / 29 * 4;
        // this.qualification.style.width = stageWidth * mainTableRatio / 29 * 4;
        // this.name1.style.width = stageWidth * mainTableRatio / 29 * 4;
        // this.name2.style.width = stageWidth * mainTableRatio / 29 * 4;
        // this.takeOff.style.width = stageWidth * mainTableRatio / 29 * 4;
        // this.note.style.width = stageWidth * mainTableRatio / 29 * 4;
        // this.delete.style.width = stageWidth * mainTableRatio / 29;
    }
}

export class topMainRow {
    constructor() {
        this.container = document.createElement("div");

        this.container.style.display = "flex";
        this.container.style.flexDirection = "row";

        this.callSign = document.createElement("div");
        this.mission = document.createElement("div");
        this.qualification = document.createElement("div");
        this.name1 = document.createElement("div");
        this.name2 = document.createElement('div');
        this.takeOff = document.createElement("div");
        this.note = document.createElement("div");
        this.plus = document.createElement('img');


        this.callSign.innerHTML = "C/S";
        this.mission.innerHTML = '임무';
        this.qualification.innerHTML = "자격";
        this.name1.innerHTML = "이름";
        this.name2.innerHTML = "이름2";
        this.takeOff.innerHTML = "이륙";
        this.note.innerHTML = "비고";
        // this.plus.textContent = "+";
        this.plus.src = "../assets/images/add-box-fill.svg";


        this.plus.onclick = function () {
            var newRow = new mainTableRow("","","","","","","");
        }

        mainTable.appendChild(this.container);

        this.container.appendChild(this.callSign);
        this.container.appendChild(this.mission);
        this.container.appendChild(this.qualification);
        this.container.appendChild(this.name1);
        this.container.appendChild(this.name2);
        this.container.appendChild(this.takeOff);
        this.container.appendChild(this.note);
        this.container.appendChild(this.plus);

        this.resize()
    }

    resize() {
        // this.callSign.style.width = stageWidth * mainTableRatio / 29 * 4;
        // this.mission.style.width = stageWidth * mainTableRatio / 29 * 4;
        // this.qualification.style.width = stageWidth * mainTableRatio / 29 * 4;
        // this.name1.style.width = stageWidth * mainTableRatio / 29 * 4;
        // this.name2.style.width = stageWidth * mainTableRatio / 29 * 4;
        // this.takeOff.style.width = stageWidth * mainTableRatio / 29 * 4;
        // this.note.style.width = stageWidth * mainTableRatio / 29 * 4;
        // this.plus.style.width = stageWidth * mainTableRatio / 29;

        for (var i = 0; i < rows.length; i++) {
            rows[i].resize()
        }

    }
}