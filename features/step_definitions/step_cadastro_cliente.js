const { Given, When, Then } = require('@cucumber/cucumber')

const assert = require('assert')

Given('que o cliente informou os seguintes dados', function (dataTable) {
  // Write code here that turns the phrase above into concrete actions

  assert.notEqual(dataTable, null)
  const user1 = dataTable.rawTable.slice(1)[0]

  return 'pending'
})

When('o cliente clicar em cadastrar', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending'
})

Then('o cliente deve ser cadastrado com sucesso', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending'
})
