import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'roleLabel' })
export class RoleLabelPipe implements PipeTransform {
  transform(value: any): string {
    const role = Number(value);
    switch (role) {
      case 1:
        return 'Admin';

      case 2:
        return 'User';

      default:
        return 'User';
    }
  }
}
