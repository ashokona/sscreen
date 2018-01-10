import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class HomeService {

  constructor(
    private apiService: ApiService
  ) { }

  
  verifyEmail(id){    
    const route = 'user/verifyemail/'+id    
    return this.apiService.get(route)                
    .map(res =>{                  
      return res                
    }) 
  }
  
}
