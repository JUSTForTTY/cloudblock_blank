import { Component, ViewChild,Input } from '@angular/core';
import { SettingsService } from '@delon/theme';

@Component({
    selector: 'layout-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {
    searchToggleStatus: boolean;
    @Input() isShowsideabar:boolean = true;
     
    constructor(public settings: SettingsService) { }

    toggleCollapsedSidebar() {
        this.settings.setLayout('collapsed', !this.settings.layout.collapsed);
    }

    searchToggleChange() {
        this.searchToggleStatus = !this.searchToggleStatus;
    }

}
