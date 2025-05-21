import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../user.interface';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { NzButtonModule, NzButtonSize} from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';


@Component({
  selector: 'app-users-list',
  imports: [CommonModule, NzButtonModule, NzCardModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data) => (this.users = data));
  }

  showUserInfo(id: number) {
    this.router.navigate(['/users', id]);
  }

  showCreateUser() {
    this.router.navigate(['/create']);
  }

  showChangeUser(id: number) {
    this.router.navigate(['/change', id]);
  }

  delUser(id: number, event: Event) {
    event.stopPropagation();
    this.userService.deleteUser(id).subscribe(() => {
      this.users = this.users.filter(u => u.id !== id);
    });
  }
}
