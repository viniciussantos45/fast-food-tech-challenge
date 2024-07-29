export const listOrdersSchema = {
  description: 'Lista todos os pedidos',
  tags: ['pedido'],
  response: {
    200: {
      type: 'object',
      properties: {
        received: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              customer: {
                type: 'object',
                properties: {
                  cpf: {
                    type: 'object',
                    properties: {
                      value: { type: 'string' }
                    }
                  },
                  name: { type: 'string' },
                  email: { type: 'string' }
                }
              },
              combos: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    products: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          id: { type: 'number' },
                          name: { type: 'string' },
                          category: {
                            type: 'object',
                            properties: {
                              value: { type: 'string' }
                            }
                          },
                          price: { type: 'number' },
                          description: { type: 'string' },
                          images: {
                            type: 'array',
                            items: {
                              type: 'object',
                              properties: {
                                value: { type: 'string' }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              status: { type: 'string' },
              statusPayment: { type: 'string' },
              createdAt: { type: 'string' }
            }
          }
        },
        in_progress: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              customer: {
                type: 'object',
                properties: {
                  cpf: {
                    type: 'object',
                    properties: {
                      value: { type: 'string' }
                    }
                  },
                  name: { type: 'string' },
                  email: { type: 'string' }
                }
              },
              combos: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    products: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          id: { type: 'number' },
                          name: { type: 'string' },
                          category: {
                            type: 'object',
                            properties: {
                              value: { type: 'string' }
                            }
                          },
                          price: { type: 'number' },
                          description: { type: 'string' },
                          images: {
                            type: 'array',
                            items: {
                              type: 'object',
                              properties: {
                                value: { type: 'string' }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              status: { type: 'string' },
              statusPayment: { type: 'string' },
              createdAt: { type: 'string' }
            }
          }
        },
        ready: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              customer: {
                type: 'object',
                properties: {
                  cpf: {
                    type: 'object',
                    properties: {
                      value: { type: 'string' }
                    }
                  },
                  name: { type: 'string' },
                  email: { type: 'string' }
                }
              },
              combos: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    products: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          id: { type: 'number' },
                          name: { type: 'string' },
                          category: {
                            type: 'object',
                            properties: {
                              value: { type: 'string' }
                            }
                          },
                          price: { type: 'number' },
                          description: { type: 'string' },
                          images: {
                            type: 'array',
                            items: {
                              type: 'object',
                              properties: {
                                value: { type: 'string' }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              status: { type: 'string' },
              statusPayment: { type: 'string' },
              createdAt: { type: 'string' }
            }
          }
        },
        finished: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              customer: {
                type: 'object',
                properties: {
                  cpf: {
                    type: 'object',
                    properties: {
                      value: { type: 'string' }
                    }
                  },
                  name: { type: 'string' },
                  email: { type: 'string' }
                }
              },
              combos: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    products: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          id: { type: 'number' },
                          name: { type: 'string' },
                          category: {
                            type: 'object',
                            properties: {
                              value: { type: 'string' }
                            }
                          },
                          price: { type: 'number' },
                          description: { type: 'string' },
                          images: {
                            type: 'array',
                            items: {
                              type: 'object',
                              properties: {
                                value: { type: 'string' }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              status: { type: 'string' },
              statusPayment: { type: 'string' },
              createdAt: { type: 'string' }
            }
          }
        }
      }
    }
  }
}
