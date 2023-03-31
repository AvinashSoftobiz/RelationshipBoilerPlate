import { Injectable } from '@nestjs/common';
import { Result, UniqueEntityID } from '@softobiz-df/shared-lib';
import { EntityManager, IsNull, Not } from 'typeorm'
import { Customer } from 'src/domain/customer/customer';
import { ICustomerRepository } from '../irepositories/icustomer.repository';
import { CustomerSqlMapper } from './mappers/customer.mapper'
import { CustomerModel } from './models/customer.model'


@Injectable()
export class CustomerSqlRepository implements ICustomerRepository {
	
//#region constructor
	public constructor(private readonly _entityManager: EntityManager, private readonly _mapper: CustomerSqlMapper) {}
	//#region private methods
	
	private async getById(uuid: string) {
		return this._entityManager.findOne(CustomerModel, { uuid: uuid, deletedOn: Not(IsNull()) })
	}

	//#endregion
	private async getAll() {
    return this._entityManager.find(CustomerModel,{})
  }

  findByCustomer(_input: string): Promise<Result<Customer>> {
    throw new Error('Method not implemented.')
  }
	//#endregion
	

	async save(input: Customer): Promise<Result<Customer>> {
		const persistence = this._mapper.toPersistence(input)
		await this._entityManager.transaction(async (em) => {
			await em.save(persistence)
		})
		return Result.ok(input)
	}

	exists(input: Customer): Promise<Result<boolean>> {
		throw new Error('Method not implemented.')
	}

	remove(input: UniqueEntityID): Promise<Result<void>> {
		throw new Error('Method not implemented.')
	}
	
	async findById(input: UniqueEntityID): Promise<Result<Customer>> {
		const customerEntity = await this.getById(input.toString())
		if (customerEntity) {
			return Result.ok(this._mapper.toDomain(customerEntity))
		} else {
			return Result.ok()
		}
	}
	

}
