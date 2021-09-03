import { BaseBean } from './BaseBean';
import { OrganizationBean } from './OrganizationBean';

export class ProductBean extends BaseBean {
    public id: number;
    public organization: OrganizationBean
    public name: string;
    public emailAdmin: string;
    public image: string;
    public imageFile: any;
    public imagePath: string;
    public type: string;
    public ubication: string;
    public startDate: Date;
    public endDate: Date;
    public startDateRequest: Date;
    public endDateRequest: Date;
    public department: string;
	public province: string;
	public district: string;
	public shortDescription: string;
	public longDescription: string;
	public price: number;
    public serviceId: string;
    public priceMin: number;
    public priceMax: number;
}