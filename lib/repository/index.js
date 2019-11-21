import MongoRepository from './mongo';

export default function HinataRepository() {
  const hinataRepository = MongoRepository();

  return hinataRepository;
}
