import { Component, OnInit, Renderer2, ElementRef, QueryList, ViewChildren, Output, Input, EventEmitter } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { NzCheckboxComponent } from 'ng-zorro-antd';
@Component({
    selector: 'vantercTree2',
    templateUrl: './vantercTree2.component.html',
    styleUrls: ['./vantercTree2.component.less'],
    animations: [
        trigger('fadeoutandin', [
            state('false', style({
                transform: 'translateY(-30px)',
                opacity: 0
            })),
            state('true', style({
                transform: 'translateY(0px)',
                opacity: 1
            })),
            transition('false => true', animate('1000ms ease-in-out')),
            transition('true => false', animate('1000ms ease-in-out'))
        ])
    ]
})
export class VantercTree2Component implements OnInit {
    @Input() vcCheckable: boolean;
    @Output() editClick: EventEmitter<any> = new EventEmitter();
    @Output() itemClick: EventEmitter<any> = new EventEmitter();
    @Output() deleteClick: EventEmitter<any> = new EventEmitter();
    @Output() fatherClick: EventEmitter<any> = new EventEmitter();

    showoptionbtn = false;
    @Input() dataSource = [];


    constructor(
        private http: _HttpClient, private renderer: Renderer2
    ) {

    }

    ngOnInit() {

    }


    deletenode(event, index, list) {
        this.deleteClick.emit(list);
    }
    editnode(event, cindex, list,fatherId) {
        list['fatherId']=fatherId;
        this.editClick.emit(list);
    }
    

    //判断是否全选
    checkisallchecked(index) {
        let isall = true;
        this.dataSource[index].children.forEach((item) => {
            if (item.checked !== true) {
                isall = false;
            }
        });
        return isall;
    }

    //父节点选择
    itemischecked(event, itemchecked, value, index, showoptionbtn, isExpanded,item) {
        if (itemchecked == true) {
            this.dataSource[index].children.forEach((item) => {
                item.checked = true;
            })
        } else {
            this.dataSource[index].children.forEach((item) => {
                item.checked = false;
            })
        }


        this.dataSource.forEach((item) => {
            item.showoptionbtn = false;
            item.children.forEach((element) => {
                element.showoptionbtn = false;
            });
        })
        if(this.dataSource[index].lock!=true){
            this.dataSource[index].showoptionbtn = true;
        }
        
        this.dataSource[index].isExpanded = !isExpanded;
        this.fatherClick.emit(item);
    }
    //子节点选择
    childitemischecked(event, childitemchecked, value, index, showoptionbtn, cindex, item) {
        if (childitemchecked == false) {
            this.dataSource[index].checked = false;
        } else {
            if (this.checkisallchecked(index) == true) {
                this.dataSource[index].checked = true;
            } else {
                this.dataSource[index].checked = false;
            }
        }
        this.dataSource.forEach((item) => {
            item.showoptionbtn = false;
            item.children.forEach((element) => {
                element.showoptionbtn = false;
            });
        })
        this.dataSource[index].children[cindex].showoptionbtn = true;
        item['findex'] = index;
        console.log("item:" + JSON.stringify(item));
        this.itemClick.emit(item);
    }

    //展开/收拢子节点
    expand(isExpanded, index) {

        this.dataSource[index].isExpanded = !isExpanded;
    }

    //鼠标移入移除显示按钮
    onMouseEnter(index) {
        if(this.dataSource[index].lock!=true){
            this.dataSource[index].showoptionbtn = true;
        }
        
    }
    onMouseLeave(index) {
        this.dataSource[index].showoptionbtn = false;
    }
    onchildMouseEnter(index, cindex) {
        
            this.dataSource[index].children[cindex].showoptionbtn = true;
        
    }
    onchildMouseLeave(index, cindex) {
        this.dataSource[index].children[cindex].showoptionbtn = false;
    }

}
