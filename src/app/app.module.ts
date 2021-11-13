import { BrowserModule } from '@angular/platform-browser';
import {  NgModule } from '@angular/core';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon"
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserlistComponent } from './components/userlist/userlist.component';
import { CourselistComponent } from './components/course/courselist/courselist.component';
import { AddCourseComponent } from './components/course/add-course/add-course.component';
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
import { StompService } from 'ng2-stomp-service';
import { RoleGuard } from './helpers/role-guard.service';
import { CourseDetailComponent } from './components/course/course-detail/course-detail.component';
import { ProfileComponent } from './components/my-profile/profile/profile.component';
import { AddExamComponent } from './components/exam/add-exam/add-exam.component';
import { ExamlistComponent } from './components/exam/exam-list/exam-list.component';
import { ExamEditComponent } from './components/exam/exam-edit/exam-edit.component';
import { ExamDetailComponent } from './components/exam/exam-detail/exam-detail.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { MyCoursesComponent } from './components/my-courses/my-courses.component';
import { EditProfileComponent } from './components/my-profile/edit-profile/edit-profile.component';
import { GradeComponent } from './components/grade/grade.component';
import { VideoComponent } from './components/video/video.component';
import { CallInfoDialogComponents } from './callinfo-dialog/callinfo-dialog.component';
import { VideoService } from './services/video.service';


const routers: Routes = [
  { path: 'welcome', component: WelcomeComponent,},
  {path: 'courses', component: CourselistComponent, canActivate: [AuthGuard]},
  {path: 'coursedetail/:id', component: CourseDetailComponent, canActivate: [AuthGuard]},
  {path: 'users', component: UserlistComponent, canActivate: [AuthGuard]},
  {path: 'addcourse', component: AddCourseComponent, canActivate: [AuthGuard, RoleGuard]},
  {path: 'editcourse/:id', component: AddCourseComponent, canActivate: [AuthGuard, RoleGuard]},
  {path: 'header', component: HeaderComponent},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: 'chat', component: ChatComponent, canActivate: [AuthGuard]},
  { path: 'profile/:id', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'addexam/:id', component: AddExamComponent, canActivate: [AuthGuard, RoleGuard]},
  {path: 'exams', component: ExamlistComponent, canActivate: [AuthGuard]},
  {path: 'editexam/:id', component: ExamEditComponent, canActivate: [AuthGuard, RoleGuard]},
  {path: 'examdetail/:id', component: ExamDetailComponent, canActivate: [AuthGuard]},
  {path: 'mycourses/:id', component: MyCoursesComponent, canActivate: [AuthGuard, RoleGuard]},
  {path: 'users/:id', component: AddUserComponent, canActivate: [AuthGuard, RoleGuard]},
  {path: 'editprofile/:id', component: EditProfileComponent, canActivate: [AuthGuard]},
  {path: 'video', component: VideoComponent, canActivate: [AuthGuard]},
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
    WelcomeComponent,
    CourseDetailComponent,
    ProfileComponent,
    AddExamComponent,
    ExamlistComponent,
    ExamEditComponent,
    ExamDetailComponent,
    AddUserComponent,
    MyCoursesComponent,
    EditProfileComponent,
    GradeComponent,
    VideoComponent,
    CallInfoDialogComponents
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routers),
    FormsModule,
    NgMultiSelectDropDownModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ClipboardModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [authInterceptorProviders, AuthGuard, RoleGuard, StompService, VideoService],
  bootstrap: [AppComponent],
  entryComponents: [GradeComponent, CallInfoDialogComponents],
})
export class AppModule { }

