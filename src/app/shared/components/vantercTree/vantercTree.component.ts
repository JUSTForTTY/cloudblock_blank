import { Component, OnInit, Input, Output, ElementRef, Renderer2, EventEmitter } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
    selector: 'vantercTree',
    templateUrl: './vantercTree.component.html',
    styleUrls: ['./vantercTree.component.less']
})
export class VantercTreeComponent implements OnInit {
    allchecked;
    @Input() dataSource = [];
    @Output() editClick: EventEmitter<any> = new EventEmitter();
    @Output() eyeClick: EventEmitter<any> = new EventEmitter();
    @Output() itemchecked: EventEmitter<any> = new EventEmitter();
    @Input() title: string;
    constructor(
        private http: _HttpClient, private renderer: Renderer2
    ) { }

    ngOnInit() {
    }


    // @Input() style: { [key: string]: string };
    // @Input() src: string;
    // @Input() desc: string;
    //设置全选
    getallchecked(event) {
        let data = {
            "index":0,
            "value": "value",
            "checked": true
        }
        let index=-1;
        if (this.allchecked == true) {
            this.dataSource.forEach((item) => {
                index=index+1;
                if(item.checked==false){
                    item.checked = true;
                    data.value = item.value;
                    data.checked = true;
                    data.index=index;
                    this.itemchecked.emit(data);
                }
                
            });
        } else {
            this.dataSource.forEach((item) => {
                index=index+1;
                if(item.checked==true){
                    item.checked = false;
                    data.value = item.value;
                    data.checked = false;
                    this.itemchecked.emit(data);
                }
                
            });
        }
    }

    //判断是否全选
    checkisallchecked() {
        let isall = true;
        this.dataSource.forEach((item) => {
            if (item.checked !== true) {
                isall = false;
            }
        });
        return isall;
    }

    //选择操作
    itemischecked(event, itemchecked, value,index) {
        let data = {
            "index":index,
            "value": value,
            "checked": true
        }
        if (this.checkisallchecked() == true) {
            this.allchecked = true;
        }
        if (itemchecked == false) {
            this.allchecked = false;
            data.checked = false;
            this.itemchecked.emit(data);
        } else {
            data.checked = true;
            this.itemchecked.emit(data);
        }

    }

    //这是眼睛是否显示
    changeeyes(event, list, id) {
        if(list.checked){
            this.dataSource[id].eyeshow = !list.eyeshow;
            this.eyeClick.emit(list);
        }
       
    }
    //鼠标移入触发事件
    onMouseEnter(event) {
        this.renderer.setStyle(event.target.children['1'], "display", "");
        this.renderer.setStyle(event.target.children['2'], "display", "");
    }
    //鼠标移出事件
    onMouseLeave(event) {
        this.renderer.setStyle(event.target.children['1'], "display", "none");
        this.renderer.setStyle(event.target.children['2'], "display", "none");
    }
    //编辑事件
    edit(list, id) {
        this.editClick.emit(list);
    }
}



