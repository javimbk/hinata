import MongoRepository from './mongo';

export default function HinataRepository(opts) {
  const hinataRepository = MongoRepository(opts);

  return hinataRepository;
}
