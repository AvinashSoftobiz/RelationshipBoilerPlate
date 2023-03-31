import { eDataSource, GenericAppError, Result, UniqueEntityID, Entity } from '@softobiz-df/shared-lib'

interface CustomerIdProps {
}
export class CustomerId extends Entity<CustomerIdProps> {
	
	private constructor(props: CustomerIdProps, id?: UniqueEntityID) {
		super(props, id)
	}
	
public get id() : UniqueEntityID {
	return this._id
}


	public static create(props: CustomerIdProps, id?: UniqueEntityID, dataSource?: eDataSource) {
	return new CustomerId(id)
	}
	//#endregion
}

