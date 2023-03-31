import { Column,Entity, ManyToMany, ManyToOne} from 'typeorm';
import { BaseModel } from './base.model';
import { CustomerModel } from './customer.model';


@Entity({ name: 'Productt' })

export class ProductModel extends BaseModel {

	//#region constructors
	public constructor(init?: Partial<ProductModel>) {
		super()
		Object.assign(this, init)
	}
	//#endregion

	@Column()
	public product_name: string

	@ManyToOne(()=>CustomerModel, (customer)=>customer.products)
	public customer:CustomerModel

}