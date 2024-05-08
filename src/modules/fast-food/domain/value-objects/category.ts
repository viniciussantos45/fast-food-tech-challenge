import { Fail, Ok, Result, ValueObject } from 'types-ddd'

export enum CategoryValueObjectEnum {
  BURGUER = 'BURGUER',
  DRINK = 'DRINK',
  DESSERT = 'DESSERT',
  ACCOMPANIMENT = 'ACCOMPANIMENT'
}

export class CategoryValueObject extends ValueObject<CategoryValueObjectEnum> {
  private constructor(props: CategoryValueObjectEnum) {
    super(props)
  }

  public static create(props: CategoryValueObjectEnum): Result<CategoryValueObject> {
    if (!Object.values(CategoryValueObjectEnum).includes(props)) {
      return Fail('Invalid category')
    }

    return Ok<CategoryValueObject>(new CategoryValueObject(props))
  }
}
