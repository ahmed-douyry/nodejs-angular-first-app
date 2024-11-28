import { Injectable } from "@angular/core";

@Injectable()
export class ExempleService {
    moi = {
        nom:'douyry',
        email:'ahmed.douyry@gmail.com',
        tel :'0655710017'
      }
      comments:any =[]
    constructor() { }
    getinfo(){
        return this.moi
    }
    addComment(c:any){
        c.date = new Date().toLocaleDateString()
        this.comments.push(c)
    }
    getAllComments(){
        return this.comments
    }
    saveData(data: any) {
        console.log(data);
    }
    getData() {
        console.log('get data');
    }
}