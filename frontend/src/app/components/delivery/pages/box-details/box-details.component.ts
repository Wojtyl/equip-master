import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { BoxService } from "../../box.service";
import { IBoxDetails } from "../../models/box-model";

@Component({
  selector: 'app-box-details',
  templateUrl: './box-details.component.html',
  styleUrls: ['./box-details.component.scss']
})
export class BoxDetailsComponent implements  OnInit {

  constructor(private route: ActivatedRoute, private boxService: BoxService) {}
  boxId: string;
  box: IBoxDetails;
  ngOnInit() {
    this.boxId = this.route.snapshot.params['id'];
    this.boxService.getBoxDetails (this.boxId).subscribe(box => this.box = box.items);
  }
}
