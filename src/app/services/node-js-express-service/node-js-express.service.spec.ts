import { TestBed } from '@angular/core/testing';

import { NodeJsExpressService } from './node-js-express.service';

describe('NodeJsExpressService', () => {
  let service: NodeJsExpressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NodeJsExpressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
