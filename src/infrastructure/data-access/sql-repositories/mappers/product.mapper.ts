import { Injectable } from '@nestjs/common';
import { eDataSource, IDTO, IMapper, UniqueEntityID } from '@softobiz-df/shared-lib';
import {  Product  } from 'src/domain/Customer/product';
import { CustomerModel } from '../models';
import {  ProductModel } from '../models/product.model';


@Injectable()
export class  ProductSqlMapper implements IMapper {
	constructor() {}

	toDomain(raw:  ProductModel): Product {
		// return  Product.create(
		// 	{
		// 		name: raw.name
		// 	},
		// 	new UniqueEntityID(raw.uuid),
		// 	eDataSource.STORAGE,
		// ).getValue()
		throw new Error()
	}

	toPersistence(input: Product, curEntity?: ProductModel): ProductModel {
		if (!curEntity) {
			curEntity = new ProductModel()
		}
		curEntity.uuid = input.getProductID.toString()
		curEntity.product_name = input.props.productName;
		curEntity.customer=new CustomerModel({uuid:input.getProductID.toString()})
		//@todo:: improve mapping
		return curEntity;
	}
	toDto(input: ProductModel): IDTO {
		throw new Error('Method not implemented.')
	}
}
