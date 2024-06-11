import {
  Component,
  ComponentFactoryResolver,
  Injector,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../../environments/environment';
import { UserContextService } from '../../services/user-context.service';
import { AnnouncementService } from './announcement.service';
import { AddAnnouncmentComponent } from '../../common/add-announcment/add-announcment.component';
import { DeleteConfirmationComponent } from 'src/app/common/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss'],
})
export class AnnouncementComponent implements OnInit {
  searchQuery: any = '';
  getCompanyAnnouncement: any = [];
  pageIndex : number = 0;
  getTeamAnnouncement:any=[];
  searchCompanyAnnouncement: any = {};
  showPopup: boolean = false;
  config_pgShowAnnouncement = {
    id: 'pg_announcement',
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 0,
  };
  @ViewChild('addCompanyAnnouncementContainer', { read: ViewContainerRef })dialogContainer?: ViewContainerRef;
  @ViewChild('deleteCompanyAnnouncementContainer', { read: ViewContainerRef }) dialogDeleteContainer?: ViewContainerRef;

  isAddAnnouncement:boolean=false
  constructor(
    private injector: Injector,
    private componentFactoryResolver: ComponentFactoryResolver,
    private announcementService: AnnouncementService,
    private userContextService: UserContextService,
    private spinnerService: NgxSpinnerService,
  ) {
    const userRoles: any = this.userContextService.getUserRoles();
    this.isAddAnnouncement = userRoles.includes(137);
   

    // this.isEditJobPost = userRoles.includes(105);
    // this.isDeleteJobPost = userRoles.includes(106);
  }

  ngOnInit(): void {
    this.searchCompanyAnnouncement.evenTitle = '';
    this.setSearchCompanyAnnouncement();
    this.getCompanyAnnouncementList(this.pageIndex);
    this.getTeamAnnouncementList()
  }
  setSearchCompanyAnnouncement() {
    this.searchCompanyAnnouncement.evenTitle = '';
  }
 
  getCompanyAnnouncementList(pageIndex : number) {
    let model = {
      "companyId": this.userContextService.user$._value.companyID,
      "evenTitle": this.searchCompanyAnnouncement.evenTitle,
      "pageIndex": pageIndex,
      "pageSize": this.config_pgShowAnnouncement.itemsPerPage,
    };
    this.spinnerService.show();
    this.announcementService.GetCompanyAnnouncementList(model).subscribe(data => {
      if (data.status) {
        this.getCompanyAnnouncement = data.getCompanyAnnouncement;
        this.config_pgShowAnnouncement.totalItems = data.totalRecords;
      }
      this.spinnerService.hide();
    });
  }

  getTeamAnnouncementList() {
    let model = {
      companyId: this.userContextService.user$._value.companyID,
      evenTitle: this.searchCompanyAnnouncement.evenTitle,
      pageIndex: this.config_pgShowAnnouncement.currentPage - 1,
      pageSize: this.config_pgShowAnnouncement.itemsPerPage,
      teamId:this.userContextService.user$._value.teamId,
    };
    this.spinnerService.show();
    this.announcementService.GetTeamAnnouncementList(model).subscribe((data) => {
        if (data.status) {
          this.getTeamAnnouncement = data.getCompanyAnnouncement;
          this.config_pgShowAnnouncement.totalItems = data.totalRecords;
        }
        this.spinnerService.hide();
      });
  }

  addAnnouncementPopoup(announce: any = {}){
    const factory = this.componentFactoryResolver.resolveComponentFactory(AddAnnouncmentComponent);
    const data: any =
    {
      getTeamAnnouncement: announce
    };
    const popupInjector = Injector.create({
      providers: [{ provide: 'data', useValue: data }],
      parent: this.injector,
    });
    const popupRef = factory.create(popupInjector);
    this.dialogContainer?.insert(popupRef.hostView);
    popupRef.instance.closed.subscribe((status: any) => {
      popupRef.destroy();
      if (status) {
        this.getTeamAnnouncementList();
      }
    });
  }

  deleteCompanyAnnouncementPopup(id:any) {
    const factory = this.componentFactoryResolver.resolveComponentFactory(DeleteConfirmationComponent);
    const data: any =
    {
      Id: id
    };
    const popupInjector = Injector.create({
      providers: [{ provide: 'data', useValue: data }],
      parent: this.injector,
    });
    const popupRef = factory.create(popupInjector);
    this.dialogDeleteContainer?.insert(popupRef.hostView);
    popupRef.instance.closed.subscribe((id: any) => {
      popupRef.destroy();
      if (id) {
        this.deleteCompanyAnnouncement(id)
      }
    });
  }


  deleteCompanyAnnouncement(id:any) {
    this.spinnerService.show();
    this.announcementService.DeleteCompanyAnnouncement(id).subscribe(data => {
      if (data.status) {
        this.getCompanyAnnouncementList(this.pageIndex);
      }
      this.spinnerService.hide();
    });
  }

  createImgPath(employeePhoto: any) {
    if (!employeePhoto) return 'assets/images/projz/avatar.png';
    else return environment.ApiUrl + '/' + employeePhoto;
  }

}
