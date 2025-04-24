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
            ) {}

  ngOnInit(): void {}
  logout() {
    this.authService.clear();
  }
  navigate(link: string){
    this.router.navigateByUrl(link);
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
