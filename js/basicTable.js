import { rows, basicTable, basicTableRatio, stageWidth, stageHeight } from "./home.js";

export class basicTableRow {
    constructor(name, note, qualifi, date) {
        //열 전체가 들어갈 컨테이너 지정
        this.container = document.createElement("div");
        this.container.style.display = "flex";
        this.container.style.flexDirection = "row";
        // this.container.style.paddingTop = '5px';
        // this.container.style.paddingBottom = '5px';
        // this.container.style.background = '#D8D8D8';

        //내부 요소 생성
        this.name = document.createElement("input");
        this.note = document.createElement("input");
        this.qualification = document.createElement("select");
        this.date = document.createElement("input");
        this.delete = document.createElement('img');

        //세부 속성 지정
        var options = ['교관', '4L리더', '2L리더', '윙맨'];
        for (var i = 0; i < options.length; i++) {
            var opt = document.createElement('option');
            opt.setAttribute('value', options[i]);
            opt.innerText = options[i];
            this.qualification.appendChild(opt);
        }
        this.date.type = 'date';
        // this.delete.textContent = "-";
        this.delete.src = "../assets/images/checkbox-indeterminate-line.svg";
        

        //값 지정
        this.name.value = name;
        this.note.value = note;
        this.qualification.value = qualifi;
        this.date.value = date;

        //이벤트 리스너 지정
        this.note.addEventListener('change', this.noteChange.bind(this), false);
        this.delete.addEventListener('click', this.deleteThis.bind(this), false);

        //document에 삽입
        basicTable.appendChild(this.container);
        this.container.appendChild(this.name);
        this.container.appendChild(this.note);
        this.container.appendChild(this.qualification);
        this.container.appendChild(this.date);
        this.container.appendChild(this.delete);

        //새로고침
        this.resize();
        this.noteChange();
    }

    deleteThis() {
        this.container.remove();
        delete this;
    }

    resize() {
        // this.name.style.width = stageWidth * basicTableRatio / 17 * 4;
        // this.note.style.width = stageWidth * basicTableRatio / 17 * 4;
        // this.qualification.style.width = stageWidth * basicTableRatio / 17 * 4;
        // this.date.style.width = stageWidth * basicTableRatio / 17 * 4;
        // this.delete.style.width = stageWidth * basicTableRatio / 17;
    }

    noteChange() {
        const NOT_CHANGE_CLASS_NM = "not-change"
        if (this.note.value != '') {
            this.container.classList.add(NOT_CHANGE_CLASS_NM)
            // this.container.style.background = '#FA5858';
        }
        else {
            this.container.classList.remove(NOT_CHANGE_CLASS_NM)
            // this.container.style.background = '#D8D8D8';
        }
    }
}

export class topTableRow {
    constructor() {
        this.container = document.createElement("div");

        this.container.style.display = "flex";
        this.container.style.flexDirection = "row";

        this.name = document.createElement("div");
        this.note = document.createElement("div");
        this.qualification = document.createElement("div");
        this.date = document.createElement("div");
        this.plus = document.createElement('img');


        this.name.innerHTML = "이름";
        this.note.innerHTML = "비고";
        this.qualification.innerHTML = "자격";
        this.date.innerHTML = "최근 비행";
        this.plus.src = "../assets/images/add-box-fill.svg";

        this.plus.onclick = function () {
            rows.push(new basicTableRow('', '', '', ''));
        }

        basicTable.appendChild(this.container);

        this.container.appendChild(this.name);
        this.container.appendChild(this.note);
        this.container.appendChild(this.qualification);
        this.container.appendChild(this.date);
        this.container.appendChild(this.plus);

        this.resize()
    }

    resize() {
        // this.name.style.width = stageWidth * basicTableRatio / 17 * 4;
        // this.note.style.width = stageWidth * basicTableRatio / 17 * 4;
        // this.qualification.style.width = stageWidth * basicTableRatio / 17 * 4;
        // this.date.style.width = stageWidth * basicTableRatio / 17 * 4;
        // this.plus.style.width = stageWidth * basicTableRatio / 17;
    }
}