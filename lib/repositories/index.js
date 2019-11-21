import MongoRepository from './mongo';

export default async function HinataRepository() {
  const hinataRepository = await MongoRepository();

  return hinataRepository;
}
