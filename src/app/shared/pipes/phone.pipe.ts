import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'PhonePipe',
})
export class PhonePipe implements PipeTransform {
  transform(value: string): string {
    return value.replace(/\D/g, ''); // \D = non-digit characters
  }
}
