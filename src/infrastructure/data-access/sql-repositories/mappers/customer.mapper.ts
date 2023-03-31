import { Injectable } from '@nestjs/common';
import { eDataSource, IDTO, IMapper, UniqueEntityID } from '@softobiz-df/shared-lib';
import { Product } from 'src/domain/Customer';
import {  Customer  } from 'src/domain/customer/customer';
import { ProductModel } from '../models';
import {  CustomerModel } from '../models/customer.model';


@Injectable()
export class  CustomerSqlMapper implements IMapper {
	constructor() {}

	toDomain(raw:  CustomerModel): Customer {
	// 	return  Customer.create(
	// 		{
	// 			name: CustomerName.create(raw.name),
				
	// 		},
	// 		new UniqueEntityID(raw.uuid),
	// 		eDataSource.STORAGE,
	// 	).getValue()
	throw new Error()
	}

	toPersistence(input: Customer, curEntity?: CustomerModel): CustomerModel {
		if (!curEntity) {
			curEntity = new CustomerModel()
		}
		curEntity.uuid = input.id.toString()
		curEntity.name = input.name;
		// curEntity.products= ProductModel({})
		//@todo:: improve mapping
		return curEntity;
	}
	toDto(input: CustomerModel): IDTO {
		throw new Error('Method not implemented.')
	}
}
