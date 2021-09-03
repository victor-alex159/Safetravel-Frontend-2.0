import { BaseBean } from './BaseBean';
import { ProfileBean } from './ProfileBean';

export class UserBean extends BaseBean {
    public id: number;
    public organizationId: number;
    public documentType: string;
    public documentNumber: string;
    public genderTypeId: string;
    public profile: ProfileBean;
    public name: string;
    public lastname: string;
    public surname: string;
    public position: string;
    public birthDate: Date;
    public username: string;
    public password: string;
    public email: string;
    public phone: string;
    public photo: any;
}