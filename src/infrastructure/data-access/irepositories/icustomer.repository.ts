import { IRepository,Result} from '@softobiz-df/shared-lib';
import { Customer } from 'src/domain/customer/customer';

export interface ICustomerRepository extends IRepository<Customer>{
	findByCustomer(input: string): Promise<Result<Customer>>
	

}

export const ICustomerRepository = Symbol('ICustomerRepository')