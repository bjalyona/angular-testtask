import { Component, OnInit } from '@angular/core';
import { User } from '../../user.interface';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';

@Component({
  selector: 'app-user-info',
  imports: [NzDescriptionsModule],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss',
})
export class UserInfoComponent implements OnInit {
  id: number;
  userInfo: User = {
    id: 0,
    name: '',
    username: '',
    email: '',
    address: {},
    phone: '',
    website: '',
    company: {},
  };

  constructor(
    private userService: UserService,
    private activateRoute: ActivatedRoute
  ) {
    this.id = Number(activateRoute.snapshot.params['id']);
    console.log(this.id, typeof this.id);
  }

  ngOnInit(): void {
    this.userService
      .getUserInfo(this.id)
      .subscribe((data) => (this.userInfo = data));
  }
}
