export const prismaMock = {
  superhero: {
    create: jest.fn(),
    findMany: jest.fn(),
    count: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  image: {
    create: jest.fn(), // 👈 додано
    updateMany: jest.fn(),
    delete: jest.fn(),
  },
  $transaction: jest.fn(),
};
