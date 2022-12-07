import {
  Directive,
  HostBinding,
  HostListener,
  Input,
  EventEmitter,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appDrag]',
})
export class DragDirective {
  @HostBinding('draggable') public draggable = true;
  @HostBinding('class.over') public isIn = false;
  @Input('itemIndex') public itemIndex!: number;
  @Input('listIndex') public listIndex!: number;
  @Output() public switch: EventEmitter<{
    src: {
      itemIndex: number;
      listIndex: number;
    };
    dst: {
      itemIndex: number;
      listIndex: number;
    };
  }> = new EventEmitter();

  @Output() public transfer: EventEmitter<{
    src: {
      itemIndex: number;
      listIndex: number;
    };
    dst: {
      listIndex: number;
    };
  }> = new EventEmitter();

  @HostListener('dragstart', ['$event']) dragStart(event: DragEvent) {
    event.dataTransfer?.setData('itemIndex', this.itemIndex.toString());
    event.dataTransfer?.setData('listIndex', this.listIndex.toString());
  }

  @HostListener('dragenter') dragEnter() {
    this.isIn = true;
  }

  @HostListener('dragleave') dragLeave() {
    this.isIn = false;
  }

  @HostListener('dragover', ['$event']) dragOver(event: DragEvent) {
    event.preventDefault();
  }

  @HostListener('drop', ['$event']) drop(event: DragEvent) {
    this.isIn = false;
    if (this.itemIndex != null) {
      this.switch.emit({
        src: {
          itemIndex: Number(event.dataTransfer?.getData('itemIndex')),
          listIndex: Number(event.dataTransfer?.getData('listIndex')),
        },
        dst: {
          itemIndex: this.itemIndex,
          listIndex: this.listIndex,
        },
      });
    } else {
      this.transfer.emit({
        src: {
          itemIndex: Number(event.dataTransfer?.getData('itemIndex')),
          listIndex: Number(event.dataTransfer?.getData('listIndex')),
        },
        dst: {
          listIndex: this.listIndex,
        },
      });
    }
  }
}
