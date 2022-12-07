import { Component } from '@angular/core';
import { List } from './shared/models';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public listLabel = "";
  public lists: List[] = [];

  public itemContent = "";

  public addList() {
    if (this.listLabel) {
      this.lists.push({
        label: this.listLabel,
        items: []
      });
    }
    this.listLabel = "";
  }

  public addItem(list: List) {
    if (this.itemContent) {
      list.items.push({
        content: this.itemContent
      });
    }
    this.itemContent = "";
  }

  public switchItems($event: {
    src: {
      itemIndex: number,
      listIndex: number
    },
    dst: {
      itemIndex: number,
      listIndex: number
    }
  }) {
    [
      this.lists[$event.src.listIndex].items[$event.src.itemIndex],
      this.lists[$event.dst.listIndex].items[$event.dst.itemIndex]
    ] = [
        this.lists[$event.dst.listIndex].items[$event.dst.itemIndex],
        this.lists[$event.src.listIndex].items[$event.src.itemIndex]
      ];
  }

  public transferItem($event: {
    src: {
      itemIndex: number,
      listIndex: number
    },
    dst: {
      listIndex: number
    }
  }) {
    this.lists[$event.dst.listIndex].items.push(this.lists[$event.src.listIndex].items[$event.src.itemIndex]);
    this.lists[$event.src.listIndex].items.splice($event.src.itemIndex, 1);
  }

}