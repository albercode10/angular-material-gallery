import {TestBed} from '@angular/core/testing';

import {GalleryService} from './gallery.service';
import {GalleryImage} from '../model/gallery-image';

describe('GalleryService', () => {
  let service: GalleryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GalleryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create images array', () => {
    expect(service).toBeTruthy();
    service.createGallery();
    service.getGallery().subscribe(value => expect(value.length > 0).toBeTruthy());
  });

  describe('on select image', () => {
    it('should select an image', () => {
      const index = 3;
      service.createGallery();
      service.selectImage(index);
      service.getImageSelected().subscribe((value: GalleryImage) => expect(value.position).toEqual(index));
    });
    it('should no select an image when index is incorrect', () => {
      const index = -1;
      service.createGallery();
      service.selectImage(index);
      service.getImageSelected().subscribe((value: GalleryImage) => expect(value).toBeUndefined());
    });
  });
});
