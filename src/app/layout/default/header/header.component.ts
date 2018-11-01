import { Component, ViewChild,Input } from '@angular/core';
import { SettingsService } from '@delon/theme';
import { ACLService } from '@delon/acl';

@Component({
    selector: 'layout-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {
    searchToggleStatus: boolean;
    @Input() isShowsideabar:boolean = true;
     
    constructor(public settings: SettingsService,public aclService:ACLService) { }

    toggleCollapsedSidebar() {
        this.settings.setLayout('collapsed', !this.settings.layout.collapsed);
    }

    searchToggleChange() {
        this.searchToggleStatus = !this.searchToggleStatus;
    }

}
