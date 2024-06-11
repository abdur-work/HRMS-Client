import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

  constructor() { }
  // Login API URLs
  public readonly urlLogin = environment.ApiUrl + '/api/ApplicationUsers/Login';
  public readonly urlRegisterCompany = environment.ApiUrl + '/api/ApplicationUsers/RegisterCompany';
  public readonly urlRegisterEmployee = environment.ApiUrl + '/api/ApplicationUsers/RegisterEmployee';
  public readonly urlShowUserInfo = environment.ApiUrl + '/api/ApplicationUsers/ShowUserInfo';
  public readonly urlUpdateCompanyRegisteration = environment.ApiUrl + '/api/ApplicationUsers/UpdateCompanyRegisteration';
  public readonly urlDeleteUserInfo = environment.ApiUrl + '/api/ApplicationUsers/DeleteUserInfo';
  // Post Job URLs
  public readonly urlSavePostJob = environment.ApiUrl + '/api/PostJob/SavePostJob';
  public readonly urlGetPostedJob = environment.ApiUrl + '/api/PostJob/GetPostedJob';
  public readonly urlDeletePostedJob = environment.ApiUrl + '/api/PostJob/DeletePostedJob';
  public readonly urlOnChangeJobActivationStatus = environment.ApiUrl + '/api/PostJob/OnChangeJobActivationStatus';
  public readonly urlShowAppliedApplication = environment.ApiUrl + '/api/JobApplication/ShowAppliedApplication';
  //Register Company Detail URLs
  public readonly urlRegisterCompanyDetail = environment.ApiUrl + '/api/CompanyRegistration/RegisterCompanyDetail';
  public readonly urlGetCompanyDetail = environment.ApiUrl + '/api/CompanyRegistration/GetCompanyDetail';
  public readonly urlDeleteCompanyDetail = environment.ApiUrl + '/api/CompanyRegistration/DeleteCompanyDetail';
  public readonly urlOnChangeCompanyStatus = environment.ApiUrl + '/api/CompanyRegistration/OnChangeCompanyStatus';
  public readonly urlChangeUserInfoStatus = environment.ApiUrl + '/api/ApplicationUsers/ChangeUserInfoStatus';
  public readonly urlGetCompaniesName = environment.ApiUrl + '/api/CompanyRegistration/GetCompaniesName';
  public readonly urlSaveTeamAnnouncment = environment.ApiUrl + '/api/CompanyRegistration/SaveAnnouncement';
  public readonly urlGetCompanyAnnouncementList = environment.ApiUrl + '/api/CompanyRegistration/GetCompanyAnnouncementList';
  public readonly urlGetTeamAnnouncementList = environment.ApiUrl + '/api/CompanyRegistration/GetTeamAnnouncementList';
  public readonly urlSaveCompanyAnnouncement = environment.ApiUrl + '/api/CompanyRegistration/SaveAnnouncement';

  //Employees Module URLs
  public readonly urlSaveEmployee = environment.ApiUrl + '/api/Employee/SaveEmployee';
  public readonly urlGetEmployeeRating = environment.ApiUrl + '/api/Employee/GetEmployeesRating';
  public readonly urlGetEmployeeList = environment.ApiUrl + '/api/Employee/GetEmployeeList';
  public readonly urlDeleteEmployeeDetail = environment.ApiUrl + '/api/Employee/DeleteEmployeeDetail';
  public readonly urlOnChangeEmployeeStatus = environment.ApiUrl + '/api/Employee/OnChangeEmployeeStatus';
  public readonly urlShowCompleteEmployeeDetail = environment.ApiUrl + '/api/Employee/ShowCompleteEmployeeDetail';
  public readonly urlGetEmployeeSalaryById = environment.ApiUrl + '/api/Employee/GetEmployeeSalaryById';
  public readonly urlGetEmployeeSalaryByEmployeeIdSlip = environment.ApiUrl + '/api/Employee/GetEmployeeSalaryByEmployeeIdSlip';
  public readonly urlChangeSalarySlipDownloadStatus = environment.ApiUrl + '/api/Employee/ChangeSalarySlipDownloadStatus';
  public readonly urlSalarySlipDownloadPdf = environment.ApiUrl + '/api/Employee/SalarySlipDownloadPdf';
  public readonly urlGetEmployeeBankDetail = environment.ApiUrl + '/api/Employee/GetEmployeeBankDetail';
  public readonly urlDeleteBankDetail = environment.ApiUrl + '/api/Employee/DeleteBankDetail';
  public readonly urlSaveEmployeeBankDetail = environment.ApiUrl + '/api/Employee/SaveEmployeeBankDetail';
  public readonly urlGetSetupLookUpData = environment.ApiUrl + '/api/CompanySetup/GetSetupLookUpData';
  public readonly urlSaveEmployeeSalary = environment.ApiUrl + '/api/Employee/SaveEmployeeSalary';
  public readonly urlGenarateEmployeeSalary = environment.ApiUrl + '/api/Employee/GenarateEmployeeSalary';
  public readonly urlFillEmployeeDDLByCompany = environment.ApiUrl + '/api/Employee/FillEmployeeDDLByCompany';
  public readonly urlCheckGetEmployeeSalaryById = environment.ApiUrl + '/api/Employee/CheckGetEmployeeSalaryById';
  public readonly urlCheckGetEmployeeSalariesList = environment.ApiUrl + '/api/Employee/FillEmployeeDDLForSalaries';
  public readonly urlCheckEmployeeRegisterValidation = environment.ApiUrl + '/api/Employee/CheckEmployeeRegisterValidation';
  public readonly urlGetDepartmentByOfficeLocation = environment.ApiUrl + '/api/CompanySetup/GetDepartmentByOfficeLocation';
  public readonly urlGetTeamByDepartment = environment.ApiUrl + '/api/CompanySetup/GetTeamByDepartment';
  public readonly urlGetPositionByTeam = environment.ApiUrl + '/api/CompanySetup/GetPositionByTeam';
  public readonly urlGetSupervisorByTeam = environment.ApiUrl + '/api/CompanySetup/GetSupervisorByTeam';
  public readonly urlGetEmployeeBasicDetailForCompany = environment.ApiUrl + '/api/Employee/GetEmployeeBasicDetailForCompany';
  public readonly urlGetShiftList = environment.ApiUrl + '/api/CompanySetup/GetShiftList';
  public readonly urlGetEmployeeByTeamId = environment.ApiUrl + '/api/Employee/GetEmployeeBasicDetailForCompany';
  //Dashboard Module URLs
  public readonly urlGetAdminDashboardData = environment.ApiUrl + '/api/Dashboard/GetAdminDashboardData';
  public readonly urlGetCompanyDashboardData = environment.ApiUrl + '/api/Dashboard/GetCompanyDashboardData';
  public readonly urlGetEmployeeDashboardData = environment.ApiUrl + '/api/EmployeeDashboard/GetEmployeeProfileResponseData';
  public readonly urlGetEmployeeDashboardCountData = environment.ApiUrl + '/api/EmployeeDashboard/GetEmployeeDashboardCountData';
  public readonly urlGetHolidaysEvents = environment.ApiUrl + '/api/EmployeeDashboard/GetHolidaysEvents';
  public readonly urlGetAnouncementandTeamMemberData = environment.ApiUrl + '/api/EmployeeDashboard/GetAnouncemntAndTeamMemberData';
  public readonly urlGetEmployeeWeeklyAttendanceData = environment.ApiUrl + '/api/EmployeeDashboard/GetEmployeeWeeklyAttendanceData';
  public readonly urlCalculateAverageRating = environment.ApiUrl + '/api/EmployeeDashboard/CalculateAverageRating';
  public readonly urlEmployeeBufferTime = environment.ApiUrl + '/api/EmployeeAttendance/GetBufferTimeByEmployeeId';
  //Upload File Url
  public readonly urlUpload = environment.ApiUrl + '/api/UploadFile/Upload';
  public readonly urlUploadResume = environment.ApiUrl + '/api/UploadFile/UploadResume';
  public readonly urlGetCounties = 'assets/countries.json';
  //Candidate Apply For Job
  public readonly urlGetPostedJobById = environment.ApiUrl + '/api/JobApplication/GetPostedJobById';
  public readonly urlApplyJob = environment.ApiUrl + '/api/JobApplication/ApplyJob';
  public readonly urlShowCandidatesApplication = environment.ApiUrl + '/api/JobApplication/ShowCandidatesApplication';
  public readonly urlUpdateCandidatesApplication = environment.ApiUrl + '/api/JobApplication/UpdateCandidatesApplication';
  public readonly urlDownload = environment.ApiUrl + '/api/UploadFile/Download';
  //Attendance Module
  public readonly urlAddAttendance = environment.ApiUrl + '/api/EmployeeAttendance/AddAttendance';
  public readonly urlGetEmployeeLeaveRequestList = environment.ApiUrl + '/api/EmployeeAttendance/GetEmployeeLeaveRequestList';
  public readonly urlAddLeaveRequest = environment.ApiUrl + '/api/EmployeeAttendance/AddLeaveRequest';
  public readonly urlGetAttendanceCalendarView = environment.ApiUrl + '/api/EmployeeAttendance/GetAttendanceCalendarView';
  public readonly urlGetEmployeeLeaveCalendarView = environment.ApiUrl + '/api/EmployeeAttendance/GetEmployeeLeaveCalendarView';
  public readonly urlDeleteAttendanceLeaveRecord = environment.ApiUrl + '/api/EmployeeAttendance/DeleteAttendanceLeaveRecord';
  public readonly urlCheckAlreadyAddedAttendance = environment.ApiUrl + '/api/EmployeeAttendance/CheckAlreadyAddedAttendance';
  public readonly urlGetOfficeInfoByEmployee = environment.ApiUrl + '/api/EmployeeAttendance/GetOfficeInfoByEmployee';
  public readonly urlGetTodayEmployeeAttendance = environment.ApiUrl + '/api/EmployeeAttendance/GetTodayEmployeeAttendance';
  public readonly urlGetEmployeeLeaveRequest = environment.ApiUrl + '/api/EmployeeAttendance/GetEmployeeLeaveRequest';
  public readonly urlGetEmployeeAttendanceRecord = environment.ApiUrl + '/api/EmployeeAttendance/GetEmployeeAttendanceRecord';
  public readonly urlGetEmployeeAttendanceRecordByEmployeeId = environment.ApiUrl + '/api/EmployeeAttendance/GetEmployeeAttendanceRecordByEmployeeId';
  public readonly urlGetEmployeeLeaveRecordByEmployeeId = environment.ApiUrl + '/api/EmployeeAttendance/GetEmployeeLeaveRecordByEmployeeId';
  public readonly urlupdateEmployeeLeaveStatus = environment.ApiUrl + '/api/EmployeeAttendance/UpdateEmployeeLeaveStatus';
  public readonly urlGetEmployeeLeavebyTeamId = environment.ApiUrl + '/api/EmployeeAttendance/GetEmployeeLeaveRequestByTeam';

   // chats
   public readonly urlgetMyChats = environment.ApiUrl + '/getMyChats';
  public readonly urlGetMessages = environment.ApiUrl + '/GetMessages';
  //PayRoll Module
  public readonly urlGetEmployeeSalaries = environment.ApiUrl + '/api/Employee/GetEmployeeSalaries';
  public readonly urlDeleteEmployeeSalaries = environment.ApiUrl + '/api/Employee/DeleteEmployeeSalary';
  public readonly urlShowEmployeeSalarySlipList = environment.ApiUrl + '/api/Employee/GetEmployeeSalarySlipList';
  public readonly urlSalaryPay = environment.ApiUrl + '/api/Employee/SalaryPay';
  public readonly urlUpdateSalaryAllowances = environment.ApiUrl + '/api/Employee/UpdateSalaryAllowances';

  //
  public readonly urlSendFIleMessage = environment.ApiUrl + '/SendFIleMessage';
}
export class Methods {
  static isValidEmail(email: string = ''): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  static validateFullName(name: string = '') {
    const pattern = /^[a-zA-Z ]+$/;
    return pattern.test(name);
  }

  static EncryptTo64(model: any = {}) {
    return btoa(model);
  }


  static validateFileFormat(file: File, allowedFormats: any = []): boolean {
    const fileExt = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
    return allowedFormats.includes(fileExt);
  }
}
