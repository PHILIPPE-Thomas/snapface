import {Injectable} from "@angular/core";
import {FaceSnap} from "../models/face-snap.model";
import {HttpClient} from "@angular/common/http";
import {Observable, switchMap} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn:'root'
})
export class FaceSnapsService{

  constructor(private http: HttpClient) {
  }

  getAllFaceSnaps(): Observable<FaceSnap[]>{
    return this.http.get<FaceSnap[]>('http://localhost:4200/facesnaps');
  }
  getFaceSnapsById(faceSnapId: number) : Observable<FaceSnap>{
    return this.http.get<FaceSnap>(`http://localhost:4200/facesnaps/${faceSnapId}`)

  }
  snapFaceSnapById(faceSnapId:number, snapType: 'Like' | 'DisLike'): Observable<FaceSnap> {

    return this.getFaceSnapsById(faceSnapId).pipe(
      map(faceSnap =>({
        ...faceSnap,
        snaps: faceSnap.snaps + (snapType === 'Like' ? 1 : -1)
      })),
      switchMap(updatedFacesnap => this.http.put<FaceSnap>(`http://localhost:4200/facesnaps/${faceSnapId}`, updatedFacesnap))
    );

  }

  addFaceSnap(formValue: { title:string, description: string, imageUrl:string, location?: string}): Observable<FaceSnap>{
    return this.getAllFaceSnaps().pipe(
      map( facesnaps => [...facesnaps].sort((a,b)=> a.id - b.id)),
      map(sortedFacesnaps => sortedFacesnaps[sortedFacesnaps.length -1 ]),
      map(previousFacesnaps => ({
        ...formValue,
        snaps: 0,
        createdDate: new Date(),
        id: previousFacesnaps.id + 1
      })),
      switchMap(newFacesnap => this.http.post<FaceSnap>('http://localhost:4200/facesnaps', newFacesnap))
    );
  }

}
