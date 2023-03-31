import { IRequest } from '@softobiz-df/shared-lib';
import { IsOptional } from 'class-validator';
import { CustomerCreateResponseType } from './customer.response.type';
import { ApiProperty } from '@nestjs/swagger';



export class CustomerCreateCommand implements IRequest<CustomerCreateResponseType> {
	@IsOptional()
	@ApiProperty()
	public name: string

	@IsOptional()
	@ApiProperty()
	public products: any
  
	public constructor(init?: Partial<CustomerCreateCommand>) {
		Object.assign(this, init)
	}
}