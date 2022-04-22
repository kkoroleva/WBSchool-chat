import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appDragAndDrop]',
})
export class DragAndDropDirective implements AfterViewInit {
  private text!: ElementRef;

  @HostListener('dragover') dragOver(): void {
    this.renderer.setStyle(
      this.el.nativeElement,
      'border-color',
      'rgb(20, 126, 64)'
    );

    this.renderer.setStyle(this.text, 'color', 'rgb(20, 126, 64)');
  }

  @HostListener('dragleave') dragEnd(): void {
    this.renderer.setStyle(this.el.nativeElement, 'border-color', '#000');

    this.renderer.setStyle(this.text, 'color', '#000');
  }

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.text = this.el.nativeElement.querySelector('.modal__drag-text');
  }
}
