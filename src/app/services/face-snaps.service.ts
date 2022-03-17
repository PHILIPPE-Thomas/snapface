import {Injectable} from "@angular/core";
import {FaceSnap} from "../models/face-snap.model";

@Injectable({
  providedIn:'root'
})
export class FaceSnapsService{

  faceSnapsArray:FaceSnap[] = [
    {
      id : 1,
      title:'Javascript',
      description:'Mon futur language préféré',
      createDate: new Date(),
      snaps: 200,
      imageUrl: 'https://cdn.pixabay.com/photo/2018/04/04/12/28/elephant-3289662_960_720.png',
      location: 'Pontchateau'},

    {
      id:2,
      title:'PHP',
      description:'Mon language préféré',
      createDate: new Date(),
      snaps: 100,
      imageUrl: 'https://cdn.pixabay.com/photo/2018/04/04/12/28/elephant-3289662_960_720.png',
      location: 'Paris'},

    {
      id:3,
      title:'Angular',
      description:'Mon futur framework préféré',
      createDate: new Date(),
      snaps: 5,
      imageUrl:'https://cdn.pixabay.com/photo/2018/04/04/12/28/elephant-3289662_960_720.png'},

    {
      id:4,
      title:'Javascript',
      description:'Mon futur language préféré',
      createDate: new Date(),
      snaps: 10,
      imageUrl: 'https://cdn.pixabay.com/photo/2018/04/04/12/28/elephant-3289662_960_720.png',
      location: 'Pontchateau'},

    {
      id:5,
      title:'PHP',
      description:'Mon language préféré',
      createDate: new Date(),
      snaps: 100,
      imageUrl: 'https://cdn.pixabay.com/photo/2018/04/04/12/28/elephant-3289662_960_720.png',
      location: 'Paris'},
  ];

  getAllFaceSnaps(): FaceSnap[]{
    return this.faceSnapsArray;
  }
  getFaceSnapsById(faceSnapId: number) : FaceSnap{
    const faceSnap = this.faceSnapsArray.find(faceSnap => faceSnap.id === faceSnapId);
    if(faceSnap){
      return faceSnap;
    }else{
      throw new Error('FaceSnap not found!');
    }
  }
  snapFaceSnapById(faceSnapId:number, snapType: 'Like' | 'DisLike'):void {
    let faceSnap = this.getFaceSnapsById(faceSnapId);
    snapType === 'Like' ? faceSnap.snaps++ : faceSnap.snaps--;

  }
  addFaceSnap(formValue : {title: string, description: string, imageUrl: string, location?: string}):void{
    const facesnap: FaceSnap = {
      ...formValue,
      createDate: new Date(),
      snaps : 0,
      id: this.faceSnapsArray[this.faceSnapsArray.length - 1 ].id + 1
    };
    this.faceSnapsArray.push(facesnap);
  }

}
