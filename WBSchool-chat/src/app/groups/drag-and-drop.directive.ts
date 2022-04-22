import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDragAndDrop]',
})
export class DragAndDropDirective {
  constructor(private el: ElementRef) {}

  @HostListener('dragover') dragOver(): void {
    this.el.nativeElement.style.borderColor = 'rgb(20, 126, 64)';
  }

  @HostListener('dragleave') dragEnd(): void {
    this.el.nativeElement.style.borderColor = '#000';
  }
}
