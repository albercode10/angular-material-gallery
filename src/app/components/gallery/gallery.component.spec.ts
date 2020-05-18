import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {GalleryComponent} from './gallery.component';
import {GalleryImage} from '../../model/gallery-image';
import {of} from 'rxjs';
import {GalleryService} from '../../services/gallery.service';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MediaChange, MediaObserver} from '@angular/flex-layout';


describe('GalleryComponent', () => {
  let component: GalleryComponent;
  let fixture: ComponentFixture<GalleryComponent>;
  const mockImage: GalleryImage = {
    src: 'testSrc',
    position: 2,
    alt: 'testAlt',
    first: false,
    last: false
  };
  const matDialog = jasmine.createSpyObj(
    'MatDialog',
    ['open']);

  const galleryService = jasmine.createSpyObj(
    'GalleryService',
    ['getGallery', 'createGallery', 'selectImage']);
  const getGallery = galleryService.getGallery.and.returnValue(of([mockImage]));

  const mediaChange = new MediaChange();
  mediaChange.mqAlias = 'xs';
  const mediaObserver = jasmine.createSpyObj(
    'MediaObserver',
    ['asObservable']);
  const asObservable = mediaObserver.asObservable.and.returnValue(of([mediaChange]));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GalleryComponent],
      providers: [
        {provide: GalleryService, useValue: galleryService},
        {provide: MatDialog, useValue: matDialog },
        {provide: MediaObserver, useValue: mediaObserver},

      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(getGallery.calls.any()).toBe(true, 'getGallery called');
    expect(galleryService.createGallery).toHaveBeenCalled();
    expect(component.gallery[0]).toEqual(mockImage);
  });


  describe('change columns', () => {
    it('should change column to 1', fakeAsync(() => {
      mediaChange.mqAlias = 'xs';
      fixture.detectChanges();
      tick();
      expect(asObservable.calls.any()).toBe(true, 'asObservable called');
      expect(component.columns).toEqual(1);
    }));
    it('should change column to 2', fakeAsync(() => {
      mediaChange.mqAlias = 'sm';
      fixture.detectChanges();
      tick();
      expect(asObservable.calls.any()).toBe(true, 'asObservable called');
      expect(component.columns).toEqual(2);
    }));
    it('should change column to 3', fakeAsync(() => {
      mediaChange.mqAlias = 'md';
      fixture.detectChanges();
      tick();
      expect(asObservable.calls.any()).toBe(true, 'asObservable called');
      expect(component.columns).toEqual(3);
    }));
    it('should change column to 5', fakeAsync(() => {
      mediaChange.mqAlias = 'lg';
      fixture.detectChanges();
      tick();
      expect(asObservable.calls.any()).toBe(true, 'asObservable called');
      expect(component.columns).toEqual(5);
    }));
    it('should change column to 6', fakeAsync(() => {
      mediaChange.mqAlias = 'xl';
      fixture.detectChanges();
      tick();
      expect(asObservable.calls.any()).toBe(true, 'asObservable called');
      expect(component.columns).toEqual(6);
    }));
  });


  describe('openDialog', () => {
    it('should selectImage and open dialog', () => {
      fixture.detectChanges();
      component.openDialog(3);
      expect(component).toBeTruthy();
      expect(getGallery.calls.any()).toBe(true, 'getGallery called');
      expect(galleryService.selectImage).toHaveBeenCalledWith(3);
      expect(matDialog.open).toHaveBeenCalled();
    });
  });
});
