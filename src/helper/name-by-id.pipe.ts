import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'NameByIdPipe',
})
export class NameByIdPipe implements PipeTransform {
  //value = id, data = categorylist, key = categorylist.name
  transform(value: any, data: any[], key: string): string {
    const item = data.find(
      (item: any) => item.id.toString() === value.toString()
    );
    return item ? item[key] : '';
  }
}
