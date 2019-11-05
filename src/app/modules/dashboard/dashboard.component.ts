import { Component, OnInit } from '@angular/core';
import { Character } from "src/app/shared/character.model";

import { CdkDragDrop, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {


  myList: Character[]
  confirmList: Character[] = [];

  constructor(private httpClient: HttpClient) {
    this.getMyList()
  }

  getMyList() {
    this.httpClient.get<Character[]>("assets/cdz.json")
      .subscribe(list => {
        this.myList = list;
      })
  }

  drop(event: CdkDragDrop<Character[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
     
    } else {

      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}
