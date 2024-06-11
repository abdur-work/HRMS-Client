import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { ToastrService } from 'ngx-toastr';
import { UserContextService } from './user-context.service';
import { ChatService } from '../dasboard/chat/chat.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SingalRService {
  private companyId: string;
  private employeeId: string;
  private signalRId: string;
  private hubConnection: signalR.HubConnection;
  private connectionId: string = "";
  activeChatId :string ="";
   chatList:any=[]
  getMessages:any=[]
  ActiveSigId:string="";
  ActiveUserStatus:boolean=false;
  data$=new BehaviorSubject<boolean>(false)

  constructor(private toastrService: ToastrService,
    private userContextService: UserContextService,
    private chats:ChatService,
    ) { 
      this.companyId = this.userContextService.user$?._value?.companyID;
      this.employeeId = this.userContextService.user$?._value?.employeeId;
      this.signalRId = this.userContextService.user$?._value?.signalRId;

      //establish THe Connection For Service
      this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl('http://192.52.242.226/api/chatHub', {
          skipNegotiation: true,
          transport: signalR.HttpTransportType.WebSockets
        }).build();
  
      //Get Connection Id for EveryPage If u want to Store
      this.hubConnection.on('Connected', (connectionId: string) => {
        this.connectionId = connectionId
        this.toastrService.success(connectionId)
  
        //console.log('Connection ID:', connectionId);
      });
      this.hubConnection.on('SetsingalRId', (UserSignalRId: string) => {
  
        this.storeIdInLocalStorage(UserSignalRId);
        //console.log('Connection ID:', connectionId);
      });
      
      //offline online Status changes
      this.hubConnection.on('EmpOrCompStatus', (status:boolean,UserSignalRId:string) => {
        if(this.ActiveSigId ==UserSignalRId){
          this.ActiveUserStatus = status
        }
       // this.toastrService.success("online ofline");
        this.getMyChats();
        //console.log('Connection ID:', connectionId);
      });
      //notification Recive 
      this.hubConnection.on('SendMeasseNotifayMe', (notifying: string,PrivatechatId:string,messageID:number,message:string,chatId:number,senderID:string,date:Date) => {
        this.toastrService.success(notifying);
        this.getMyChats();
        if(this.activeChatId == PrivatechatId){
          const mesg={
            'messageID':messageID,
            'message':message,
            'chatId':chatId,
            'senderID':senderID,
            'date':date
          }
          this.getMessages.push(mesg)
        }

        // this.openmMessages(PrivatechatId,this.ActiveSigId,this.ActiveUserStatus)
        this.toastrService.success(notifying +" chatId:"+ PrivatechatId);
  
      });
  
      this.hubConnection.on('ReceivePrivateMessage', (chatID: string, message: string, messageID:number,chatId:number,senderID:string,date:Date) => {
        //from chatId it is actually user id or sender so just open the chat of this person between u
        
        // implwmwnt that refresh all chat and if this chat is open than refresh that chat also
        // refresh all chat list
          if(this.activeChatId == chatID){
            const mesg={
              'messageID':messageID,
              'message':message,
              'chatId':chatId,
              'senderID':senderID,
              'date':date
            }
            this.getMessages.push(mesg)
            this.data$.next(!this.data$);
            this.openmMessages(chatID,this.ActiveSigId,this.ActiveUserStatus)
          }
        // refresh chat if it is already opened
        this.toastrService.success(message)
        this.getMyChats();
       });
      this.startConnection();
      this.getMyChats();
    }
    ngOnInit():void{
      //this.showAllChat()
      this.getMyChats();
  
    }
    getMyChats() {
     // this.spinnerService.show();
      this.chats.getMyChats(this.signalRId).subscribe(data => {
        if(data){
          console.log("sssss",data.chatList)
          this.chatList =data.chatList
        }
       
        //this.spinnerService.hide();
      });
    }

    openmMessages(chatId:any,sigUserID:string,Isonline:boolean){
      this.ActiveSigId =sigUserID;
      this.ActiveUserStatus =Isonline;
    this.activeChatId = chatId.toString();
      this.chats.GetMessages(chatId).subscribe((data)=>{
        if(data){
          this.getMessages= data.mesagess;
          //this.getEmployeeBasicDetailForChat()
  
          console.log("this.getMessages",this.getMessages)
        }
      })
    }
    storeIdInLocalStorage(id: string): void {
      localStorage.removeItem('SinalRuserId');
      localStorage.setItem('SinalRuserId', id.toString());
      console.log('SinalRuserId:' + id.toString())
    }
    startConnection() {
      if (this.hubConnection.state === 'Disconnected') {
        this.hubConnection
          .start()
          .then(() => {
            console.log('SignalR connection started successfully.');
            console.log("ConnectionId :" + this.connectionId);
            // Implement any logic you need after a successful connection
          })
          .catch((error) => {
            console.error('Error starting SignalR connection:', error);
            // You may choose to handle connection startup errors here
          });
      } else {
        console.warn('SignalR connection is already in a connected or connecting state.');
  
      }
    }
    openNewPage(currentUserId: string, userName: string): void {
      const brwserInfo = navigator.userAgent;
      // console.log('User-Agent:', userAgent);
      if (this.hubConnection.state === 'Connected') {
        this.hubConnection.invoke('OpenNewPage', currentUserId, userName, "2", brwserInfo.toString()).catch((error) => {
          console.error('Error JoinPrivateChat:', error);
        });
      } else {
        console.error('SignalR connection is not in the "Connected" state.');
      }
    }
    checkInFunction() {
      if (this.hubConnection.state === 'Connected') {
        this.hubConnection.invoke('NotifyAttendanceStatusChange')
          .then((response) => {
            return response
          })
          .catch((error) => {
            console.error('Error sending message:', error);
          });
      } else {
        console.error('SignalR connection is not in the "Connected" state.');
      }
    }
    
    
    leavePage(currentUserId: string, name: string): void {
      const brwserInfo = navigator.userAgent;
      // console.log('User-Agent:', userAgent);
      this.hubConnection.invoke('LeavePage', currentUserId, name, "2", brwserInfo.toString());
    }
    sendPrivateMessage(recipientUserId: string, message: string, ReceptType: string): void {
      // Ensure that the connection is in the 'Connected' state before sending the message
      if (this.hubConnection.state === 'Connected') {
        // Call a server-side hub method to send the private message
        this.hubConnection.invoke('SendPrivateMessage', this.employeeId.toString(), recipientUserId, "2", ReceptType, message)
          .catch((error) => {
            console.error('Error sending private message:', error);
          });
      } else {
        console.error('SignalR connection is not in the "Connected" state.');
      }
  
    }
    logOut(){
      const brwserInfo = navigator.userAgent;
      // console.log('User-Agent:', userAgent);
      if (this.hubConnection.state === 'Connected') {
        this.hubConnection.invoke('LeaveApplication', this.employeeId.toString(),"2", brwserInfo.toString()).catch((error) => {
          console.error('Error JoinPrivateChat:', error);
        });
      } else {
        console.error('SignalR connection is not in the "Connected" state.');
      }
    }

}
