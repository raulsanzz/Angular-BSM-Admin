import { Injectable } from "@angular/core";
import { AuthService } from 'src/app/common/auth.service';

@Injectable()
export class SettingsService{
    constructor(private authService: AuthService) {}
    saveunits(data){
        const projectId = this.authService.getUser();
        return this.authService.postCall('lkpStatuses?filter={"where":{"projectId":'+ projectId.projectId +',"type":"unitAttribute"}}', data);
    }
    getunits(){
        const projectId = this.authService.getUser();
        return this.authService.getCall('lkpStatuses?filter={"where":{"projectId":'+ projectId.projectId +',"type":"unitAttribute"}}');
    }
    updateUnits(data, id){
        const projectId = this.authService.getUser();
        return this.authService.updateCall(`lkpStatuses/${id}`+'?filter={"where":{"projectId":'+ projectId.projectId +',"type":"unitAttribute"}}', data);
    }
     deleteUnits(id){
         return this.authService.deleteCall(`lkpStatuses/`, id);
     }
}