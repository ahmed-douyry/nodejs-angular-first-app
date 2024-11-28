import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ModifierComponent } from './components/modifier/modifier.component';
import { AjouterComponent } from './components/ajouter/ajouter.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    {path:'login',component:LoginComponent},
    {path:'',component:NavbarComponent,children:[
        {path:'modifier/:id',component:ModifierComponent},
        {path:'ajouter',component:AjouterComponent},
    {path:'',component:HomeComponent},
    

    ]},

];
