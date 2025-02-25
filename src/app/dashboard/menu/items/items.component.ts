import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/_services/items.service';
import { Items } from 'src/app/common/interfaces/items-interface.data';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements OnInit {
  constructor(private http: HttpClient, private item: ItemsService) {}
  category: string = '';
  description: string = '';
  name: string = '';
  addItem() {
    let data = {
      category: this.category,
      description: this.description,
      name: this.name,
    };

    this.item.addItem(data).subscribe((res) => {
      console.log(res);
    });
  }
  @Input()
  items: Items[] = [];

  ngOnInit(): void {}
}
