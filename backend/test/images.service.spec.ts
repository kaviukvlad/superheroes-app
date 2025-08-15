import { ImagesService } from '../src/images/images.service';
import { prismaMock } from './mocks/prisma.mock';

describe('ImagesService', () => {
  let service: ImagesService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new ImagesService(prismaMock as any);
  });

  it('створює запис зображення', async () => {
    prismaMock.image.create.mockResolvedValue({ id: 'img1', url: 'url' });
    const img = await service.create('file.png', 'url');
    expect(img.id).toBe('img1');
  });

  it('прив’язує зображення до героя', async () => {
    prismaMock.image.updateMany.mockResolvedValue({ count: 2 });
    const res = await service.assignToSuperhero(['img1', 'img2'], 'hero1');
    expect(res.count).toBe(2);
  });

  it('видаляє зображення', async () => {
    prismaMock.image.delete.mockResolvedValue({ id: 'img1' });
    const res = await service.remove('img1');
    expect(res.id).toBe('img1');
  });
});
