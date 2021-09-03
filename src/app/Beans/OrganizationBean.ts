import { BaseBean } from './BaseBean';
import { UserBean } from './UserBean';

export class OrganizationBean extends BaseBean {
    public id: number;
    public name: string;
    public ruc: string;
    public direction: string;
    public phone: string;
    public responsablePaymentName: string;
    public responsablePaymentPhone: string;
    public responsablePaymentEmail: string;
    public adminUserId: UserBean;
    public photo: string;
}