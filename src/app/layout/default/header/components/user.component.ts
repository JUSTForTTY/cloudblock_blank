import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '@delon/theme';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { UserService } from '@core';
@Component({
  selector: 'header-user',
  template: `
  <nz-dropdown nzPlacement="bottomRight">
    <div class="alain-default__nav-item d-flex align-items-center px-sm" nz-dropdown>
      <nz-avatar nzSize="default" [nzText]="userService.getCurrentUser().cySysBaseUserRealname" style="background-color:#87d068;" class="mr-sm"></nz-avatar>
      {{userService.getCurrentUser().cySysBaseUserUsername}}
    </div>
    <div nz-menu class="width-sm">
      <div nz-menu-item routerLink="/pro/account/center"><i nz-icon type="user" class="mr-sm"></i>
        {{ 'menu.account.center' | translate }}
      </div>
      <div nz-menu-item routerLink="/pro/account/settings"><i nz-icon type="setting" class="mr-sm"></i>
        {{ 'menu.account.settings' | translate }}
      </div>
      <li nz-menu-divider></li>
      <div nz-menu-item (click)="logout()"><i nz-icon type="logout" class="mr-sm"></i>
        {{ 'menu.account.logout' | translate }}
      </div>
    </div>
  </nz-dropdown>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderUserComponent {
  constructor(
    public settings: SettingsService,
    private router: Router,
    public userService: UserService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
  ) {}

  logout() {
    this.userService.purgeAuth();
    this.router.navigateByUrl("/login");
  }
}
