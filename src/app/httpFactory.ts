import { Http } from '@angular/http';

export const httpFactory = (backend, options) => new Http(backend, options);