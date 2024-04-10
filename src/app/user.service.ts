import { EventEmitter, Injectable } from '@angular/core';
import { Login, signUp } from './data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  

  result:any;

  constructor(private httpObj : HttpClient, private routerObj : Router) { }

  userSingup(user : signUp )
  {
    //console.log(user);
    this.httpObj.post('http://localhost:3000/users/',user,{observe:'response'})
    .subscribe((result)=>{
      //console.log(result);

      if(result)
      {
        localStorage.setItem('user',JSON.stringify(result.body));

        this.routerObj.navigate(['/']);

      }

    });
  }


  userLogin(data: Login)
  {
    return this.httpObj.get<signUp[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`,{observe:'response'},
    )/*.subscribe((result)=>{
      //console.log("OOKKKK");
      //console.log("serviec check"+result);
      //console.log(result);

      this.result=result;

    })


    if( this.result &&  this.result.body?.length)
    {
      console.log("all okk");
      console.log(this.result);
      this.invalidUserAuth.emit(false);
      console.log('-----in userLogin::'+this.result.body[0])
     localStorage.setItem('user',JSON.stringify(this.result.body[0]));

     //console.log("check user");
    // console.log(localStorage.getItem('user'));

     this.routerObj.navigate(['/']);
     
    }
    else
    {
        this.invalidUserAuth.emit(true);
    }
*/

  }


  userReload()
  {
    if(localStorage.getItem('user'))
    {
      this.routerObj.navigate(['/']);
    }
  }


}
