import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {MediaChange, MediaObserver} from '@angular/flex-layout';
import {GalleryService} from '../../services/gallery.service';
import {GalleryModalComponent} from '../gallery-modal/gallery-modal.component';
import {filter, map} from 'rxjs/operators';
import {GalleryImage} from '../../model/gallery-image';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit, OnDestroy {
  subscription: Subscription[] = [];
  columns = 5;
  gallery: GalleryImage[] = [];

  constructor(
    public dialog: MatDialog,
    public galleryService: GalleryService,
    public mediaObserver: MediaObserver
  ) {
  }

  openDialog(position: number): void {
    this.galleryService.selectImage(position);
    this.dialog.open(GalleryModalComponent, {panelClass: 'custom-dialog-container'});
  }

  ngOnInit(): void {
    this.galleryService.createGallery();
    this.mediaChange();
    this.getGallery();
  }

  getGallery(): void {
    this.subscription.push(
      this.galleryService.getGallery().subscribe(gallery => this.gallery = gallery)
    );
  }

  private mediaChange(): void {
    this.subscription.push(
      this.mediaObserver.asObservable()
        .pipe(
          filter((changes: MediaChange[]) => changes.length > 0),
          map((changes: MediaChange[]) => changes[0])
        ).subscribe((change: MediaChange) => {
        switch (change.mqAlias) {
          case 'xs': {
            this.columns = 1;
            break;
          }
          case 'sm': {
            this.columns = 2;
            break;
          }
          case 'md': {
            this.columns = 3;
            break;
          }
          case 'lg': {
            this.columns = 5;
            break;
          }
          default: {
            this.columns = 6;
            break;
          }
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }
}
