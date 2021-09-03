import { BaseBean } from './BaseBean';
import { CatalogBean } from './CatalogBean';

export class CatalogDetailBean extends BaseBean {
    public id: number;
	public catalog: CatalogBean;
	public code: string;
	public shortDescription: string;
	public longDescription: string;
}