import { SuperheroesService } from '../src/superheroes/superheroes.service';
import { prismaMock } from './mocks/prisma.mock';

describe('SuperheroesService', () => {
  let service: SuperheroesService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new SuperheroesService(prismaMock as any);
  });

  describe('create', () => {
    it('створює героя без зображень', async () => {
      prismaMock.superhero.create.mockResolvedValue({ id: '1', images: [] });
      const hero = await service.create({
        nickname: 'Batman',
        real_name: 'Bruce Wayne',
        origin_description: 'Gotham',
        superpowers: 'martial arts',
        catch_phrase: 'I am Batman',
      });
      expect(hero.id).toBe('1');
      expect(prismaMock.superhero.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ nickname: 'Batman' }),
        }),
      );
    });

    it('створює героя з зображеннями', async () => {
      prismaMock.superhero.create.mockResolvedValue({
        id: '2',
        images: [{ id: 'img1' }],
      });
      await service.create({
        nickname: 'Flash',
        real_name: 'Barry Allen',
        origin_description: 'Central City',
        superpowers: 'speed',
        catch_phrase: 'Fastest man alive',
        imageIds: ['img1'],
      });
      expect(prismaMock.superhero.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            images: { connect: [{ id: 'img1' }] },
          }),
        }),
      );
    });
  });

  describe('findAll', () => {
    it('повертає пагінований список', async () => {
      prismaMock.$transaction.mockResolvedValue([[{ id: '1' }], 1]);
      const res = await service.findAll(1, 5);
      expect(res.items.length).toBe(1);
      expect(res.total).toBe(1);
      expect(res.pages).toBe(1);
    });
  });

  describe('findOne', () => {
    it('знаходить героя', async () => {
      prismaMock.superhero.findUnique.mockResolvedValue({ id: '1' });
      const hero = await service.findOne('1');
      expect(hero.id).toBe('1');
    });

    it('кидає помилку, якщо героя немає', async () => {
      prismaMock.superhero.findUnique.mockResolvedValue(null);
      await expect(service.findOne('999')).rejects.toThrow(
        'Superhero not found',
      );
    });
  });

  describe('update', () => {
    it('оновлює героя та картинки', async () => {
      prismaMock.superhero.update.mockResolvedValue({ id: '1', images: [] });
      prismaMock.image.updateMany.mockResolvedValue({});
      prismaMock.superhero.findUnique.mockResolvedValue({
        id: '1',
        images: [],
      });

      const hero = await service.update('1', {
        nickname: 'Updated Name',
        imageIds: ['img1'],
      });

      expect(prismaMock.image.updateMany).toHaveBeenCalledWith(
        expect.objectContaining({ where: { superheroId: '1' } }),
      );
      expect(hero.id).toBe('1');
    });
  });

  describe('remove', () => {
    it('видаляє героя', async () => {
      prismaMock.superhero.delete.mockResolvedValue({ id: '1' });
      const res = await service.remove('1');
      expect(res.id).toBe('1');
    });
  });
});
