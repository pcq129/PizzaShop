import { Component, OnInit } from '@angular/core';
import { CategoryListService } from 'src/app/_services/category-list.service';
import { ItemsService } from 'src/app/_services/items.service';
import { SnackbarService } from 'src/app/_services/snackbar.service';

@Component({
  selector: 'app-order-menu',
  templateUrl: './order-menu.component.html',
  styleUrls: ['./order-menu.component.scss']
})
export class OrderMenuComponent implements OnInit {

  constructor(
    private categoryService: CategoryListService,
    private snackbarService: SnackbarService,
    private itemService : ItemsService
  ) {
    this.getCategoryData();

   }

  ngOnInit(): void {
  }

  currentCategory : number = 0;
  categoryData: any[] = [];
  viewItemData: any;

  getCategoryData(){
    this.categoryService.getCategoryData().subscribe({
      next: (res:any)=>{
        if(res.status == "false"){
          this.snackbarService.error(res.message);
        }else{
          this.categoryData = res.data;
          let data =  res.data.flatMap((category:any)=>category.items);
          this.viewItemData = data;
          console.log(this.viewItemData);

        }
      }
    })
  }

  loadItems(id : number){
    this.currentCategory = id;
    if(id == 0){
      let data = this.categoryData.flatMap(entry => entry.items);
      this.viewItemData = data;

      // return entries.flatMap(entry => entry.items);

    }
    else{
    let items = this.categoryData.find(category => category.id === id).items;
    this.viewItemData = items;
    }
    console.log(this.viewItemData);

  }

  getItems(category: any){
    return category.items;
  }

}
