import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { TableSectionService } from '../_services/table-section.service';
import { SnackbarService } from '../_services/snackbar.service';

@Component({
  selector: 'app-orderapp',
  templateUrl: './orderapp.component.html',
  styleUrls: ['./orderapp.component.scss'],
})
export class OrderappComponent implements OnInit {
  constructor(private authService : AuthService,
              private router: Router,
              private tableSectionService: TableSectionService,
              private snackbarService : SnackbarService
            ) {
              this.authService.role$.subscribe({
                next: (res: string | null)=>{
                  if(res && res!='super_admin' && res!='account_manager'){
                    console.log(res);

                    this.forbidden=false;
                  }
                  else{
                    this.forbidden = true;
                  }
                }
               });
            }

            forbidden : boolean = false;
  ngOnInit(): void {}
  logout() {
    this.authService.clear();
  }
  currentPage : string = '';
  navigate(link: string){
    this.currentPage = link;
    this.router.navigateByUrl(link);
  }

  selected(page : string){
    if(this.router.url.endsWith(page)){
      return true;
    }
    return false;
  }
  sectionData: any;
  getSectionData() {
    this.tableSectionService.getAllSectionData().subscribe({
      next: (res: any) => {
        if (res.status == false) {
          this.snackbarService.error(res.message);
        } else {
          this.sectionData = res.data;
        }
      },
    });
  }

  redirect(url: string) {
    this.router.navigateByUrl(url);
  }

  loadUserData(){
    // this.authService.fetchUserData();
    console.log(this.authService.user$);

    this.redirect('pizzashop/profile')
  }

  // loadChefData(){
  //   // this.authService.fetchUserData();
  //   console.log(this.authService.user$);

  //   this.redirect('orderapp/profile')
  // }
}
