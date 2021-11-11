import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { CallInfoDialogComponents, DialogData } from 'src/app/callinfo-dialog/callinfo-dialog.component';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit, OnDestroy {
  public isCallStarted$: Observable<boolean>;
  private peerId: string;
  
  @ViewChild('localVideo') localVideo: ElementRef<HTMLVideoElement>;
  @ViewChild('remoteVideo') remoteVideo: ElementRef<HTMLVideoElement>;

  constructor(public dialog: MatDialog, private videoService: VideoService) {
    this.isCallStarted$ = this.videoService.isCallStarted$;
    this.peerId = this.videoService.initPeer();
  }
  
  ngOnInit(): void {
    this.videoService.localStream$
      .pipe(filter(res => !!res))
      .subscribe(stream => this.localVideo.nativeElement.srcObject = stream)
    this.videoService.remoteStream$
      .pipe(filter(res => !!res))
      .subscribe(stream => this.remoteVideo.nativeElement.srcObject = stream)
  }
  
  ngOnDestroy(): void {
    this.videoService.destroyPeer();
  }

  public showModal(joinCall: boolean): void {
    let dialogData: DialogData = joinCall ? ({ peerId: null, joinCall: true }) : ({ peerId: this.peerId, joinCall: false });
    const dialogRef = this.dialog.open(CallInfoDialogComponents, {
      width: '250px',
      data: dialogData
    });

    dialogRef.afterClosed()
      .pipe(
        switchMap(peerId => 
          joinCall ? of(this.videoService.establishMediaCall(peerId)) : of(this.videoService.enableCallAnswer())
        ),
      )
      .subscribe(_  => { });
  }

  public endCall() {
    this.videoService.closeMediaCall();
  }
}