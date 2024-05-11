# Project README

This repository contains the source code for a project that implements a domain-driven design (DDD) architecture. The project structure is as follows:

```
project-root
├── src
    ├── core 
│   │    ├── domain
│   │    │   ├── product
│   │    │   │   ├── Product.ts
│   │    │   │   ├── ProductRepository.ts
│   │    │   │   └── ProductEvents.ts
│   │    │   ├── order
│   │    │   │   ├── Order.ts
│   │    │   │   ├── OrderRepository.ts
│   │    │   │   └── OrderEvents.ts
│   │    │   ├── customer
│   │    │   │   ├── Customer.ts
│   │    │   │   ├── CustomerRepository.ts
│   │    │   │   └── CustomerEvents.ts
│   │    │   └── combo
│   │    │       ├── Combo.ts
│   │    │       ├── ComboRepository.ts
│   │    │       └── ComboEvents.ts
│   │    └── services
│   │        ├── ProductService.ts
│   │        ├── OrderService.ts
│   │        ├── CustomerService.ts
│   │        └── ComboService.ts
└── README.md
```

## Domain Model

### Product

- `Product.ts`: Defines the `Product` entity with properties such as `category`, `price`, `description`, and `images`.
- `ProductRepository.ts`: Interface for the product repository, including methods such as `addProduct`, `editProduct`, and `removeProduct`.
- `ProductEvents.ts`: Events like `ProductRegistered`, `ProductEdited`, and `ProductRemoved`.

### Order

- `Order.ts`: Aggregate managing orders, including methods to add products or combos to the order.
- `OrderRepository.ts`: Interface for the order repository, responsible for saving and retrieving orders.
- `OrderEvents.ts`: Events like `OrderCreated`, `OrderUpdated`, and `OrderConfirmed`.

### Customer

- `Customer.ts`: Entity representing the customer, including data such as `CPF`, `name`, and `email`.
- `CustomerRepository.ts`: Interface for the customer repository, including methods for creating and managing customer information.
- `CustomerEvents.ts`: Events like `CustomerRegistered` and `CustomerUpdated`.

### Combo

- `Combo.ts`: Aggregate for managing combos, which are collections of products.
- `ComboRepository.ts`: Interface for the combo repository.
- `ComboEvents.ts`: Events like `ComboCreated` and `ComboUpdated`.

## Domain Services

- `ProductService.ts`: Services related to product management.
- `OrderService.ts`: Services for handling orders, including confirmation and status updates.
- `CustomerService.ts`: Services for managing customers, including registration and data updates.
- `ComboService.ts`: Services for managing the creation and modification of combos.

Please refer to the individual files for more details on their implementation.

## Getting Started

To run the project, follow these steps:

1. Clone the repository.
2. Install the dependencies.
3. Build the project.
4. Start the application.

Feel free to explore the code and make any necessary modifications to suit your needs.

## Contributing

If you would like to contribute to this project, please follow the guidelines outlined in the CONTRIBUTING.md file.

## License

This project is licensed under the MIT License. See the LICENSE file for more information.
