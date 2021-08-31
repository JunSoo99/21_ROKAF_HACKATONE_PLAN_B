import { container, stageWidth, stageHeight } from "./home.js";

export class loading{
    constructor(msg){
        this.background = document.createElement('div');
        this.imageBox = document.createElement('img');
        this.msg = document.createElement('div');

        const LOADING_CLASS_NM = "loading";
        this.background.classList.add(LOADING_CLASS_NM);

        // this.background.style.position = "absolute";
        this.background.style.background = "#000000";
        this.background.style.opacity = 0.5;

        // this.imageBox.style.position = "relative";
        // this.imageBox.style.left = "50%";
        // this.imageBox.style.top = "50%";
        this.imageBox.src = '/static/loading.gif';
        // this.imageBox.style.width = "100px";
        // this.imageBox.style.height = "100px";

        // this.msg.style.position = "relative";
        // this.msg.style.left = "49%";
        // this.msg.style.top = "55%";
        // this.msg.style.color = 'white';
        this.msg.innerHTML = msg;

        this.background.appendChild(this.imageBox);
        this.background.appendChild(this.msg);
        // container.appendChild(this.background);
        document.body.appendChild(this.background);

        this.resize();
    }

    resize(){
        this.background.style.width = stageWidth;
        this.background.style.height = stageHeight;
    }

    deleteThis() {
        this.background.remove();
        delete this;
    }
}