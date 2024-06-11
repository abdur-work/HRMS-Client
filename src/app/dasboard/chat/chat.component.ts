import {
  Component,
  ComponentFactoryResolver,
  ElementRef,
  Injector,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ChatService } from './chat.service';
import { SingalRService } from '../../services/singal-r.service';
import { UserContextService } from 'src/app/services/user-context.service';
import { GenrateChatComponent } from 'src/app/common/genrate-chat/genrate-chat.component';
import { GenrateChatService } from 'src/app/common/genrate-chat/genrate-chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {
  @ViewChild('chatContainer', { read: ViewContainerRef })
  dialogContainer?: ViewContainerRef;
  chatall: boolean = true;
  privatechat: boolean = true;
  employees: any;
  employeeList: any = [];
  getSignalRId: any;
  getMessages: any = [];
  chatList: any = [];
  dataSend: any;
  ChatId: any;
  searchEmployeesRqst: any = {};
  config_pgEmployeeList = {
    id: 'pg_EmployeeList',
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 0,
  };
  employeeLists: any = [];
  signalRId: string;
  ActiveSenderId: string = '0';
  ActiveUser: string = '';
  sentToCompany: boolean = false;
  touchedSuggestedtext: boolean = false;
  filteredSuggestions: any = ([] = []);

  @ViewChild('scrollDown') private my_scrollDown: ElementRef | any;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private toastrService: ToastrService,
    private spinnerService: NgxSpinnerService,
    private chats: ChatService,
    public signalRService: SingalRService,
    private userContextService: UserContextService,
    private employeeChatService: GenrateChatService
  ) {
    this.getIdLocalStorage();
    this.employees = 0;
    this.signalRId = this.userContextService.user$._value.signalRId;
    this.searchEmployeesRqst.employeeName = '';
  }

  ngOnInit(): void {
    this.showAllChat();
    this.signalRService.getMyChats();
    this.scrollDown();
    this.signalRService.data$.subscribe((data) => {
      console.log('data===>', data);
      this.scrollDown();
    });
    this.getMyChats();
  }

  showAllChat() {
    this.chatall = true;
    this.privatechat = false;
  }
  showPrivateChat() {
    this.chatall = false;
    this.privatechat = true;
  }
  openChatPopup(action: string = '', model: any = {}) {
    model.action = action;
    // model.openfrom = action == 'save' ? 'add-salary' : '';
    const data: any = {
      salaryObj: model,
    };

    const factory =
      this.componentFactoryResolver.resolveComponentFactory(
        GenrateChatComponent
      );
    const popupInjector = Injector.create({
      providers: [{ provide: 'data', useValue: data }],
      parent: this.injector,
    });

    const popupRef = factory.create(popupInjector);
    this.dialogContainer?.insert(popupRef.hostView);
    popupRef.instance.closed.subscribe((status: any) => {
      popupRef.destroy();
      if (status) {
        this.getMyChats();
      }
    });
  }
  getIdLocalStorage() {
    this.getSignalRId = localStorage.getItem('SinalRuserId');
  }
  getMyChats() {
    this.spinnerService.show();
    this.chats.getMyChats(this.getSignalRId).subscribe((data) => {
      if (data) {
        console.log('sssss', data);
        this.chatList = data.chatList;
      }

      this.spinnerService.hide();
    });
  }
  openChat(
    chatId: any,
    actualUserID: string,
    ActiveUser: string,
    iscompany: boolean,
    sigUserID: string,
    isOnline: boolean
  ) {
    this.sentToCompany = iscompany;
    this.ActiveUser = ActiveUser;
    this.ActiveSenderId = actualUserID;
    this.signalRService.openmMessages(chatId, sigUserID, isOnline);
    this.scrollDown();
    this.searchEmployeesRqst.employeeName = '';
  }
  getEmployeeBasicDetailForChat() {
    let model = {
      companyID: this.userContextService.user$._value.companyID,
      location: this.searchEmployeesRqst.location,
      employmentType: this.searchEmployeesRqst.employmentType,
      department: this.searchEmployeesRqst.department,
      position: this.searchEmployeesRqst.position,
      employeeName: this.searchEmployeesRqst.employeeName,
      employmentStatus: this.searchEmployeesRqst.employmentStatus,
      pageIndex: this.config_pgEmployeeList.currentPage - 1,
      pageSize: this.config_pgEmployeeList.itemsPerPage,
    };
    this.spinnerService.show();
    this.employeeChatService
      .getEmployeeBasicDetailForChat(model)
      .subscribe((data) => {
        console.log(data);
        if (data.status) {
          this.employeeLists = data.employeelist;
          console.log('empchat', data);
          this.config_pgEmployeeList.totalItems = data.totalRecords;
        }
        this.spinnerService.hide();
      });
  }
  sendMessage() {
    this.scrollDown();
    if (this.ActiveSenderId != '0') {
      if (this.sentToCompany) {
        this.signalRService.sendPrivateMessage(
          this.ActiveSenderId,
          this.dataSend,
          '1'
        );
        this.dataSend = '';
      } else {
        this.signalRService.sendPrivateMessage(
          this.ActiveSenderId,
          this.dataSend,
          '2'
        );
        this.dataSend = '';
      }
    }
  }
  scrollDown() {
    setTimeout(() => {
      if (this.my_scrollDown) {
        this.my_scrollDown.nativeElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  }
  //
  filterSuggestions() {
    if (this.searchEmployeesRqst.employeeName) {
      const keyword = this.searchEmployeesRqst.employeeName.toLowerCase();
      this.filteredSuggestions = this.chatList.filter(
        (suggestion: { userName: string }) =>
          suggestion.userName.toLowerCase().includes(keyword)
      );
    } else {
      this.filteredSuggestions = [];
    }
  }
  clearSearch() {
    this.searchEmployeesRqst.employeeName = '';
    this.touchedSuggestedtext = true;
    this.getEmployeeBasicDetailForChat();
  }
  createImgPath(photoPath: any) {
    if (!photoPath) return 'assets/images/projz/avatar.png';
    else {
      return photoPath;

      // return environment.ApiUrl + '/' + employeePhoto;
    }
  }
}
