import {Component, OnInit} from '@angular/core';
import {FaceSnap} from "../models/face-snap.model";
import {FaceSnapsService} from "../services/face-snaps.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-single-face-snap',
  templateUrl: './single-face-snap.component.html',
  styleUrls: ['./single-face-snap.component.scss']
})
export class SingleFaceSnapComponent implements OnInit {
  faceSnap!: FaceSnap;
  textSnap!: string;

  constructor(private faceSnapsService: FaceSnapsService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.textSnap = 'Like';
    const faceSnapId = +this.route.snapshot.params['id'];
    this.faceSnap = this.faceSnapsService.getFaceSnapsById(faceSnapId);
  }

  onSnap(){
    if(this.textSnap ==='DisLike'){
      this.faceSnapsService.snapFaceSnapById(this.faceSnap.id, 'DisLike');
      this.textSnap = 'Like';
    }else{
      this.faceSnapsService.snapFaceSnapById(this.faceSnap.id, 'Like');
      this.textSnap = 'DisLike';
    }

  }

}
