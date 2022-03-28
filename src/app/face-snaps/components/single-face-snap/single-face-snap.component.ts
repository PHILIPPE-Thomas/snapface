import {Component, OnInit} from '@angular/core';
import {FaceSnap} from "../../../core/models/face-snap.model";
import {FaceSnapsService} from "../../../core/services/face-snaps.service";
import {ActivatedRoute} from "@angular/router";
import {Observable, tap} from "rxjs";

@Component({
  selector: 'app-single-face-snap',
  templateUrl: './single-face-snap.component.html',
  styleUrls: ['./single-face-snap.component.scss']
})
export class SingleFaceSnapComponent implements OnInit {

  faceSnap$!: Observable<FaceSnap>;
  textSnap!: string;

  constructor(private faceSnapsService: FaceSnapsService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.textSnap = 'Like';
    const faceSnapId = +this.route.snapshot.params['id'];
    this.faceSnap$ = this.faceSnapsService.getFaceSnapsById(faceSnapId);
  }

  onSnap(faceSnapId: number){
    if(this.textSnap ==='DisLike'){
      this.faceSnap$ = this.faceSnapsService.snapFaceSnapById(faceSnapId, 'DisLike').pipe(
        tap(()=>
          this.textSnap = 'Like'
    ));


    }else{
      this.faceSnap$ = this.faceSnapsService.snapFaceSnapById(faceSnapId, 'Like').pipe(
        tap(()=>
          this.textSnap = 'DisLike')
      );

    }

  }

}
