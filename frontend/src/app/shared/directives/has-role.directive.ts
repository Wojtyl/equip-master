import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { UserService } from "../../core/auth/user.service";

@Directive({
  selector: '[appHasRole]',
  standalone: true
})
export class HasRoleDirective {

  constructor(
    private authService: UserService,
    private viewContainerRef: ViewContainerRef,
    private templeRef: TemplateRef<any>) {
  }

  private allowedRoles: string[] | string;

  @Input()
  set appHasRole(roles: string[]) {
    this.allowedRoles = roles;
    this.updateView();
  }

  private updateView() {
    this.authService.user.subscribe(user => {
      let allowed = false;
      if (Array.isArray(this.allowedRoles)) {
        allowed = this.allowedRoles.includes(user.role)
      } else {
        allowed = this.allowedRoles === user.role
      }
      if (allowed) {
        this.viewContainerRef.createEmbeddedView(this.templeRef);
      } else {
        this.viewContainerRef.clear();
      }
    })
  }
}
