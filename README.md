# FAST FOOD TECH CHALLENGE

#node #yarn #typescript #fastify #postgres

This project is an API for a fast food system.

## Event Storming

[https://miro.com/app/board/uXjVKXKeOYw=/](https://miro.com/app/board/uXjVKXKeOYw=/)

## Structure

This repository contains the source code for a project that implements a domain-driven design (DDD) with hexagonal architecture. The project structure is as follows:

```
project-root
├── src
│   ├── core
│   │   ├── applications
│   │   │   ├── ports
│   │   │   │   ├── ComboRepository.ts
│   │   │   │   ├── CustomerRepository.ts
│   │   │   │   ├── OrderRepository.ts
│   │   │   │   ├── ProductRepository.ts
│   │   │   ├── services
│   │   │   │   ├── ComboService.ts
│   │   │   │   ├── CustomerService.ts
│   │   │   │   ├── OrderService.ts
│   │   │   │   ├── ProductService.ts
│   │   ├── domain
│   │   │   ├── entities
│   │   │   │   ├── Combo.ts
│   │   │   │   ├── Customer.ts
│   │   │   │   ├── Order.ts
│   │   │   │   ├── Product.ts
│   │   │   ├── events
│   │   │   │   ├── ComboEvents.ts
│   │   │   │   ├── CustomerEvents.ts
│   │   │   │   ├── OrderEvents.ts
│   │   │   │   ├── ProductEvents.ts

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
    - Run in the terminal
      ```
      docker compose up
      ```

3. Build the project.
    - Run in the other terminal

      ```
      yarn build
      yarn start
      ```

4. Start the application.

    ```
    yarn dev
    ```

5. Access the application [http://localhost:3000/](http://localhost:3000/)


## Run Swagger

Access the application [http://localhost:3000/docs](http://localhost:3000/docs)

## Contributing

Feel free to explore the code and make any necessary modifications to suit your needs.

### Commit description

Use the tags:

feat: (new feature for the user, not a new feature for build script)
fix: (bug fix for the user, not a fix to a build script)
docs: (changes to the documentation)
style: (formatting, missing semi colons, etc; no production code change)
refactor: (refactoring production code, eg. renaming a variable)
test: (adding missing tests, refactoring tests; no production code change)
chore: (updating grunt tasks etc; no production code change)

Ref.: [Semantic Commit Messages](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716#file-semantic-commit-messages-md)

## License

This project is licensed under the MIT License. See the LICENSE file for more information.
