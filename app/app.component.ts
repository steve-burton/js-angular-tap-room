import { Component } from '@angular/core';
import { Keg } from './keg.model';

@Component({
  selector: 'app-root',
  template: `
  <div class="container" (click)="showHeader()" >

  <keg-list [childKegList]="masterKegList" (clickSender)="editKeg($event)" (pintClickSender)="sellPint($event)" (growlerClickSender)="sellGrowler($event)"></keg-list>

  <div *ngIf="pintsLow">
  <h3>These kegs are low!</h3>
  </div>

  <pint-control [childKegList]="masterKegList"  ></pint-control>

  <edit-keg [childSelectedKeg]="selectedKeg" (doneButtonClickedSender)="finishedEditing()"></edit-keg>

  <new-keg (newKegSender)="addKeg($event)"></new-keg>
  </div>
  `
})

export class AppComponent {
  masterKegList: Keg[] = [
    new Keg("7", "Upright", "IPA", 7, 6.5),
    new Keg("Sleigher", "Ninkasi", "Winter Warmer", 6, 7),
    new Keg("Polygamy Porter", "Uinta", "Porter", 5, 3.2),
    new Keg("PBR", "Pabst", "Lager", 1, 4.2)

  ];
  selectedKeg = null;
  pintsLow = false;

  editKeg(clickedKeg) {
    this.selectedKeg = clickedKeg;
  }

  finishedEditing() {
    this.selectedKeg = null;
  }

  addKeg(newKegFromChild: Keg) {
    this.masterKegList.push(newKegFromChild);
  }

  sellPint(currentKeg) {
    if(currentKeg.pintsLeft >= 0) {
      currentKeg.pintsLeft -= 1;
    }
  }

  sellGrowler(currentKeg) {
    if(currentKeg.pintsLeft >= 4) {
      currentKeg.pintsLeft -= 4;
    }
  }

  showHeader() {
    for(let keg of this.masterKegList) {
      if(keg.pintsLeft <= 10){
        this.pintsLow = true;
      }
    }
  }
}
