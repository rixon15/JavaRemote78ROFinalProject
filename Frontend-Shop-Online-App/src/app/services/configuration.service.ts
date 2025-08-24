import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor() {
  }

  public footerConfig() {
    return {
      author: 'Ivacsony Szilard',
      group: 'JavaRemoteRo78',
      projectTitle: 'Online Shop'
    }
  }

}
