import { AggregateRoot,eDataSource, GenericAppError, Result,  UniqueEntityID } from '@softobiz-df/shared-lib';
import { CustomerId } from './customer-id';
import { CustomerName } from './customer-name';
import { Product } from './product'

interface CustomerProps {
	name: CustomerName
    products: Product[]
}
export class Customer extends AggregateRoot<CustomerProps> {

	private constructor(props: CustomerProps, id?: UniqueEntityID) {
		super(props, id)
	}
	//#endregion
	public get name() : string {
		return this.props.name.customerName
	}
	
	public get getCustomerID() : CustomerId{
		return CustomerId.create(this._id)
	}
	
	//#region private setters
	private setName(name :CustomerName) {
	
		if(!(name instanceof CustomerName	)){
			Result.fail(new GenericAppError.DomainError("The customer name cannot hold less than five alphabets"))
		}     
		this._props.name = name
		return Result.ok(this)
	}

	private setProduct(products:Product[]) {
		for(const product of products)
		{
			if(!(product instanceof Product	)){
				Result.fail(new GenericAppError.DomainError("The customer name cannot hold less than five alphabets"))
			}   
		}
		if(products.length> 2){
			Result.fail(new GenericAppError.DomainError("The customer cannot hold more than 2 products"))
		}
		this._props.products = products
		return Result.ok(this)
	}
	//#region public methods
	public static create(props: CustomerProps, id?: UniqueEntityID, dataSource?: eDataSource) {
		if (dataSource === eDataSource.STORAGE) return Result.ok(new  Customer(props, id))
		const  customer = new  Customer(Object.create(null), id)
		const validationQueue = [
			customer.setName(props.name),
			customer.setProduct(props.products)
		]
		const combinedResult = Result.combine(validationQueue)
		if (combinedResult.isFailure) return Result.fail<Customer>(new GenericAppError.DomainError(combinedResult.errorValue()))
		return Result.ok(customer)
	}
	//#endregion

}
