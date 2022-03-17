import {Component, OnDestroy, OnInit} from '@angular/core';
import {FaceSnap} from "../models/face-snap.model";
import {FaceSnapsService} from "../services/face-snaps.service";
import {interval, Subject, takeUntil, tap} from "rxjs";

@Component({
  selector: 'app-face-snap-list',
  templateUrl: './face-snap-list.component.html',
  styleUrls: ['./face-snap-list.component.scss']
})
export class FaceSnapListComponent implements OnInit, OnDestroy {

  faceSnapsArray!: FaceSnap[];
  private destroy$!: Subject<boolean>;

  constructor(private faceSnapsService: FaceSnapsService) { }

  ngOnInit(): void {

    this.destroy$ = new Subject<boolean>()
    this.faceSnapsArray = new FaceSnapsService().getAllFaceSnaps();

    interval(1000).pipe(
      takeUntil(this.destroy$),
      tap(value=> console.log(value))
    ).subscribe();
  }

  ngOnDestroy(){
    this.destroy$.next(true);
  }
}

