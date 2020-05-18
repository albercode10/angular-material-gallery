import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GalleryModalComponent} from './gallery-modal.component';
import {GalleryService} from '../../services/gallery.service';
import {GalleryImage} from '../../model/gallery-image';
import {of} from 'rxjs';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('GalleryModalComponent', () => {
  let component: GalleryModalComponent;
  let fixture: ComponentFixture<GalleryModalComponent>;
  const mockImage: GalleryImage = {
    src: 'testSrc',
    position: 2,
    alt: 'testAlt',
    first: false,
    last: false
  };
  const galleryService = jasmine.createSpyObj('GalleryService', ['getImageSelected', 'selectImage']);
  const getImageSelected = galleryService.getImageSelected.and.returnValue(of(mockImage));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GalleryModalComponent],
      providers: [
        {provide: GalleryService, useValue: galleryService}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(getImageSelected.calls.any()).toBe(true, 'getImageSelected called');
  });


  describe('changeImg', () => {
    beforeEach(() => {
      galleryService.selectImage.calls.reset();
      fixture.detectChanges();
    });
    it('should change image to +1 ', () => {
      component.changeImg(1);
      expect(galleryService.selectImage).toHaveBeenCalledTimes(1);
      expect(galleryService.selectImage).toHaveBeenCalledWith(3);
    });
    it('should change image to -1 ', () => {
      component.changeImg(-1);
      expect(galleryService.selectImage).toHaveBeenCalledTimes(1);
      expect(galleryService.selectImage).toHaveBeenCalledWith(1);
    });
  });

});
