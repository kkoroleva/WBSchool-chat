import {Pipe, PipeTransform} from '@angular/core';
 
@Pipe({
  name: 'safeUrl'
})
export class SafeUrlPipe implements PipeTransform {
  transform(value: string): string {
    return atob(value);
  }
}