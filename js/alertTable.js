import { alertTableDiv, alertTableRatio, stageWidth, stageHeight } from "./home.js";

export class alertTable {
    constructor(title, row1, row2, row3) {
        //전체가 들어갈 컨테이너 지정
        this.container = document.createElement("div");
        this.title = document.createElement("div");
        this.morning = new alertTableRow(row1);
        this.day = new alertTableRow(row2);
        this.night = new alertTableRow(row3);
        this.margin = document.createElement("div");

        this.title.innerHTML = title
        this.margin.style.height = '10px';

        this.container.appendChild(this.title);
        this.container.appendChild(this.morning.container);
        this.container.appendChild(this.day.container);
        if(row3 != null){
            this.container.appendChild(this.night.container);
        }
        this.container.appendChild(this.margin);

        alertTableDiv.appendChild(this.container);
        this.resize();
    }

    resize() {
        this.container.style.width = stageWidth * alertTableRatio;
        this.morning.resize();
        this.day.resize();
        this.night.resize();
    }
}

export class alertTableRow {
    constructor(title) {
        this.container = document.createElement("div");
        this.container.style.display = "flex";
        this.container.style.flexDirection = "row";

        this.time = document.createElement("div");
        this.firstPilot = document.createElement("input");
        this.secondPilot = document.createElement("input");

        this.time.innerHTML = title;
        this.container.style.margin = '5px'

        this.container.appendChild(this.time);
        this.container.appendChild(this.firstPilot);
        this.container.appendChild(this.secondPilot);
    }

    resize() {
        this.time.style.width = stageWidth * alertTableRatio / 6;
        this.firstPilot.style.width = stageWidth * alertTableRatio / 5;
        this.secondPilot.style.width = stageWidth * alertTableRatio / 5;
    }
}