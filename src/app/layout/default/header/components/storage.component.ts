import { Component, HostListener } from '@angular/core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { CacheService } from '@delon/cache';
@Component({
    selector: 'header-storage',
    template: `
    <i class="anticon anticon-tool"></i>
    清空缓存
    `,
    host: {
        '[class.d-block]': 'true',
      },
})
export class HeaderStorageComponent {

    constructor(
        private confirmServ: NzModalService,
        private messageServ: NzMessageService,
        private cacheService:CacheService
    ) {
    }

    @HostListener('click')
  _click() {
    this.confirmServ.confirm({
      nzTitle: '确定要清空缓存嘛?',
      nzOnOk: () => {
        localStorage.clear();
        this.cacheService.clear();
        this.messageServ.success('清除成功！');
      }
    });
  }
}
