import { Component } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-manage-admin',
  templateUrl: './manage-admin.component.html',
  styleUrls: ['./manage-admin.component.css']
})
export class ManageAdminComponent {

  userList:any;
  constructor(
    private authService: AuthService,
    private toast :NgToastService
  ) { }

  ngOnInit(){
    this.authService.getAllUsers().subscribe({
      next:(response)=>{
        this.userList=response;
        this.userList.map((user:any)=>{
          if(user.role==="admin")
          {
            user.selected=true;
          }
        })
        console.log(this.userList);
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }

  makeAdmin(): void {
    const selectedUsers = this.userList.filter((user:any) => user.selected);

    for (const user of selectedUsers) {
      user.role = "admin"; 
      this.authService.updateUserAdminStatus(user.id, user.role).subscribe(
        (response: any) => {
          console.log('User admin status updated:');
          this.toast.success({detail:"SUCCESS", summary: "Admin Status Updated Successfully", duration: 5000});

        },
        (error: any) => {
          this.toast.error({detail:"ERROR", summary: "Error while updating admin status!", duration: 5000});
          console.error('Error updating user admin status:', error);
        }
      );
    }

    const unselectedUsers = this.userList.filter((user:any) => !user.selected);

    for (const user of unselectedUsers) {
      user.role = "user"; 
      this.authService.updateUserAdminStatus(user.id, user.role).subscribe(
        (response: any) => {
          console.log('User admin status updated:');
        },
        (error: any) => {
          console.error('Error updating user admin status:', error);
        }
      );
    }

    location.reload();
  }

}
