import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import {DatePipe, HashLocationStrategy, LocationStrategy} from '@angular/common';
import {LocalStorageModule} from 'angular-2-local-storage';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgBusyModule} from 'ng-busy';
import 'hammerjs';
import 'mousetrap';
import {ModalGalleryModule} from '@ks89/angular-modal-gallery';
import {NgxSelectModule} from 'ngx-select-ex';
import {TreeModule} from 'angular-tree-component';

import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './home/home.component';
import {HeaderComponent} from './home/header/header.component';
import {FooterComponent} from './home/footer/footer.component';
import {MenuComponent} from './home/menu/menu.component';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './home/dashboard/dashboard.component';
import {NotfoundComponent} from './notfound/notfound.component';

import {AuthService} from './services/auth.service';
import {ApiService} from './services/api.service';
import {AuthFilterService} from './services/auth-filter.service';
import {LoginFilterService} from './services/login-filter.service';
import {PersonsComponent} from './home/dashboard/persons/persons.component';
// import {TabsModule} from 'ng2-tabs';
import {PersonComponent} from './home/dashboard/person/person.component';
import {GlobalService} from './services/global.service';
import {UsersComponent} from './home/dashboard/users/users.component';
import {DpDatePickerModule} from 'ng2-date-picker';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {CollapseModule} from 'ngx-bootstrap/collapse';
import {BsModalModule} from 'ng2-bs3-modal/ng2-bs3-modal';
import {PersonsSearchModalComponent} from './home/dashboard/persons/persons-search-modal/persons-search-modal.component';
import {ProfileComponent} from './home/dashboard/profile/profile.component';
import {PhonebookComponent} from './home/dashboard/phonebook/phonebook.component';
import {GroupsComponent} from './home/dashboard/groups/groups.component';
import {GroupComponent} from './home/dashboard/groups/group/group.component';
import {PhonebookSearchModalComponent} from './home/dashboard/phonebook/phonebook-search-modal/phonebook-search-modal.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/phonebook',
    pathMatch: 'full'
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthFilterService],
    canActivateChild: [],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'phonebook',
        component: PhonebookComponent
      },
      {
        path: 'groups',
        component: GroupsComponent
      },
      {
        path: 'groups/:groupId',
        component: GroupComponent
      },
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginFilterService]
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '404',
    component: NotfoundComponent
  },

  {path: '**', redirectTo: '/404'}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    DashboardComponent,
    NotfoundComponent,
    PersonsComponent,
    PersonComponent,
    UsersComponent,
    PersonsSearchModalComponent,
    ProfileComponent,
    PhonebookComponent,
    GroupsComponent,
    GroupComponent,
    PhonebookSearchModalComponent
  ],
  imports: [
    BrowserModule,
    DpDatePickerModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpModule,
    HttpClientModule,
    NgxPaginationModule,
    BsModalModule,
    TabsModule.forRoot(),
    CollapseModule.forRoot(),
    BrowserAnimationsModule,
    NgBusyModule,
    NgxSelectModule,
    ModalGalleryModule.forRoot(),
    TreeModule.forRoot(),
    LocalStorageModule.withConfig({
      prefix: 'my-app',
      storageType: 'localStorage'
    })
  ],
  entryComponents: [PersonsSearchModalComponent, PhonebookSearchModalComponent],
  providers: [
    ApiService,
    AuthService,
    AuthFilterService,
    LoginFilterService,
    GlobalService,
    DatePipe,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
