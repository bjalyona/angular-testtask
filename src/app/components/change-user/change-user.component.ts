import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User } from '../../user.interface';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NzFormModule} from 'ng-zorro-antd/form';
import { NzButtonModule} from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';

@Component({
  selector: 'app-change-user',
  imports: [ReactiveFormsModule, NzFormModule, NzButtonModule, NzGridModule],
  templateUrl: './change-user.component.html',
  styleUrl: './change-user.component.scss',
})
export class ChangeUserComponent implements OnInit {
  userForm!: FormGroup;
  isNew = true;
  id: number | undefined;

  constructor(
    private userService: UserService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', Validators.required),
      website: new FormControl('', Validators.required),
    });

    const currId = this.activateRoute.snapshot.params['id'];
    if (currId) {
      this.isNew = false;
      this.id = Number(currId);
      this.userService.getUserInfo(this.id).subscribe((user) => {
        this.userForm.patchValue(user);
      });
    }
  }

  submitInfo(): void {
    if (this.userForm.invalid) return;
    const user: User = this.userForm.value;
    const request = this.isNew
      ? this.userService.createUser(user)
      : this.userService.changeUser(user, this.id!);

    request.subscribe(() => this.router.navigate(['/users']));
  }
}
