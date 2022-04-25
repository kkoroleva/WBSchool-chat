import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decodeImage',
})

export class DecodeImagePipe implements PipeTransform {
    transform(value: string): any {
    if (typeof(value) != 'undefined') {
       return atob(value);
    } else{
       return '';
    }   
  }
}