
import { ValueObject, Result, GenericAppError } from "@softobiz-df/shared-lib";

interface ICustomerNameProps {
	// isAuth: boolean
    name:string
	
}
/**
 * The CustomerName Class
 *
 * @export
 * @class CustomerName
 * @extends {ValueObject<ICustomerNameProps>}
 */
export class CustomerName extends ValueObject<ICustomerNameProps> {
    
    /**
     * Creates an instance of CustomerName.
     * @param {ICustomerNameProps} props
     * @memberof CustomerName
     */
    private constructor(props: ICustomerNameProps) {
        super(props);
    }


      
      public get customerName() : string {
        return this.props.name
      }
      
    /**
     * Creates and initializes object for the CustomerName Class using the private constructor after validations
     *
     * @static
     * @param {ICustomerNameProps} props
     * @returns {Result<CustomerName>}
     * @memberof CustomerName
     */
    public static create(props: ICustomerNameProps): Result<CustomerName> {

        if(props.name.length<5){
       return Result.fail("The name should be more than 5 letters")
        }
      const customer = new CustomerName({name:props.name})

      return Result.ok(customer)
    }
}
