import { Component, inject, Input, OnInit, Output } from '@angular/core';
import { User } from "../../models/User";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { environment } from "../../../../../../environments/environment";
import { ProfileService } from "../../services/profile.service";
import { Subject } from "rxjs";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnInit {
  @Input() user: User
  @Output() updatedUser = new Subject<User>();
  @Output() createdUser = new Subject<User>();
  private fb = inject(FormBuilder);
  private profileService = inject(ProfileService);
  protected userForm: FormGroup;
  protected roles = [
    {name: 'Admin', role: 'ADMIN'},
    {name: 'Pracownik', role: 'EMPLOYEE'},
    {name: 'Manager', role: 'MANAGER'},
    {name: "Użytkownik", role: 'USER'}
  ]

  ngOnInit() {
    this.userForm = this.fb.group({
      email: [this?.user?.email ?? null, [Validators.required, Validators.email]],
      name: [this?.user?.name ?? null, Validators.required],
      surname: [this?.user?.surname ?? null, Validators.required],
      password: [null, Validators.required],
      passwordConfirm: [null, Validators.required],
      role: [this?.user?.role ?? null, Validators.required],
    })

    if (this.user) {
      this.userForm.removeControl('password', {emitEvent: false})
      this.userForm.removeControl('passwordConfirm', {emitEvent: false})
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      const data = this.userForm.getRawValue();
      if (this.user) {
        this.profileService.updateProfileById(this.user._id, data).subscribe((data) => {
          this.updatedUser.next(data.items)
        });
      } else {
        this.profileService.addProfile(data).subscribe(data => this.createdUser.next(data.items))
      }
    }
  }

  protected readonly environment = environment;
}
