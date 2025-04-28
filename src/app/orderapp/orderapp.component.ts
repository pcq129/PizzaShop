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
              this.forbidden = this.authService.role=='super_admin' || this.authService.role=='account_manager';
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

    this.redirect('profile')
  }
}
