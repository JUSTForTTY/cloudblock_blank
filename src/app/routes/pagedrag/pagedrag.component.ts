import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { SettestService } from '@core/setting/settest.service';
@Component({
  selector: 'app-pagedrag',
  templateUrl: './pagedrag.component.html',
  styleUrls:['./pagedrag.component.less']
})
export class PagedragComponent implements OnInit {

    constructor(
        private http: _HttpClient,
        public settestService: SettestService
    ) { }

    ngOnInit() {
    }
    onPreview() {
        window.open('http://180.168.249.98:8029/#'+this.settestService.page['cySysPageRoutePath']);
    }
    onSaveClick(id: string, index: number, type: string): void {
        this.settestService.rightid=-100;
        this.settestService.savePage();
    }
    

}
