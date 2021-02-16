import { BrowserModule } from '@angular/platform-browser';
import {  NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon"


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserlistComponent } from './components/userlist/userlist.component';
import { CourselistComponent } from './components/courselist/courselist.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {Ng2SearchPipeModule} from "ng2-search-filter";
import {Ng2OrderModule} from "ng2-order-pipe";
import { UserSearchfilterPipe } from './searchfilters/user-searchfilter.pipe';
import { CourseSearchfilterPipe } from './searchfilters/course-searchfilter.pipe';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { authInterceptorProviders } from './helpers/auth.interceptor';
import { RegisterComponent } from './components/register/register.component';
import { ChatComponent } from './components/chat/chat.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AuthGuard } from './helpers/auth-guard.service';

const routers: Routes = [
  { path: 'welcome', component: WelcomeComponent,},
  {path: 'courses', component: CourselistComponent, canActivate: [AuthGuard]},
  {path: 'users', component: UserlistComponent, canActivate: [AuthGuard]},
  {path: 'addcourse', component: AddCourseComponent, canActivate: [AuthGuard]},
  {path: 'editcourse/:id', component: AddCourseComponent, canActivate: [AuthGuard]},
  {path: 'header', component: HeaderComponent},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent},
  { path: 'chat', component: ChatComponent, canActivate: [AuthGuard]},
  // otherwise redirect to home
  { path: '**', redirectTo: 'welcome' }
];

@NgModule({
  declarations: [
    AppComponent,
    UserlistComponent,
    CourselistComponent,
    AddCourseComponent,
    HeaderComponent,
    UserSearchfilterPipe,
    CourseSearchfilterPipe,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ChatComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routers),
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  providers: [authInterceptorProviders, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

