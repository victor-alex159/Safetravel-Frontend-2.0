import { BaseBean } from "./BaseBean";

export class ProfileBean extends BaseBean {
    public id: number;
    public shortDescription: string;
    public longDescription: string;
    public type: string;
}