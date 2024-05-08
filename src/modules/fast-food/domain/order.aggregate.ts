import { Aggregate, Ok, Result, UID } from 'types-ddd'

// Entities and VO that encapsulate context.
interface Props {
  id?: UID
  payment: Payment
  items: List<Item>
  status: OrderStatus
  customer: Customer
}

// Simple example of an order aggregate encapsulating entities and
// value objects for context.
export default class Order extends Aggregate<Props> {
  // Private constructor to ensure instances creation through static methods.
  private constructor(props: Props) {
    super(props)
  }

  // Static method to begin a new order.
  // Takes a customer as parameter and returns an instance of Order.
  public static begin(customer: Customer): Order {
    // Initialize the status of the order as "begin".
    const status = OrderStatus.begin()
    // Initialize the list of items as empty.
    const items: List<Item> = List.empty()
    // Initialize the payment as zero, since the order hasn't been paid yet.
    const payment = Payment.none()
    // Create a new instance of Order with the provided parameters.
    const order = new Order({ status, payment, items, customer })

    // Add an event to indicate that the order has begun.
    order.addEvent('ORDER_HAS_BEGUN', (order) => {
      // Perform some important operation when the order begins.
      console.log('Do something important...')
    })

    // Alternatively, add an event by creating an
    // instance of a class that extends EventHandler.
    order.addEvent(new OrderBeganEventHandler())

    // Return the created order instance.
    return order
  }

  // Method to add an item to the order.
  // Takes an item as parameter and returns the Order instance.
  addItem(item: Item): Order {
    // Add the item to the order's items list.
    this.props.items.add(item)
    // Sum item price to payment amount
    this.props.payment.sum(item.price)
    // Return the Order instance itself to allow chained calls.
    return this
  }

  // Method to perform the payment of the order.
  // Takes a payment object as parameter.
  pay(payment: Payment): Order {
    // Set the status of the order to "paid".
    this.props.status = OrderStatus.paid()
    // Set the provided payment object.
    this.props.payment = payment
    // Add an event to indicate that the order has been paid.
    // Assuming OrderPaidEvent is a class representing
    // the event of order payment.
    this.addEvent(new OrderPaidEventHandler())
    return this
  }

  // Static method to create an instance of Order.
  // Returns a Result, which can be Ok (success) or Fail (failure).
  // The value of the Result is an instance of Order,
  // if creation is successful.
  public static create(props: Props): Result<Order> {
    return Ok(new Order(props))
  }
}
