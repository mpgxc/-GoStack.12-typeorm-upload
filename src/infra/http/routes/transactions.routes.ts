import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import multer from 'multer';

import { TransactionsRepository } from '../../../domain/Transaction/TransactionsRepository';
import { CreateTransactionService } from '../../../domain/Transaction/CreateTransactions';
import { DeleteTransactionService } from '../../../domain/Transaction/DeleteTransactions';
import { ImportTransactionsService } from '../../../domain/Transaction/ImportTransactions';

import uploadConfigs from '../../../config/upload';

const transactionsRouter = Router();
const upload = multer(uploadConfigs);

transactionsRouter.get('/', async (request, response) => {
  const transactionsRepository = getCustomRepository(TransactionsRepository);

  const transactions = await transactionsRepository.find();

  const balance = await transactionsRepository.getBalance();
  return response.status(200).json({ transactions, balance });
});

transactionsRouter.post('/', async (request, response) => {
  const { title, value, type, category } = request.body;

  const createTransactionService = new CreateTransactionService();
  const transaction = await createTransactionService.execute({
    title,
    type,
    value,
    category,
  });

  return response.status(200).json(transaction);
});

transactionsRouter.delete('/:id', async (request, response) => {
  const transactin_id = request.params.id;
  const deleteTransactionService = new DeleteTransactionService();

  await deleteTransactionService.execute(transactin_id);

  return response.status(200).send();
});

transactionsRouter.post(
  '/import',
  upload.single('file'),
  async (request, response) => {
    const importTransactionsService = new ImportTransactionsService();
    const transactionsCSV = await importTransactionsService.execute(
      request.file.filename,
    );

    return response.status(200).json(transactionsCSV);
  },
);

transactionsRouter.post(
  '/mult/import',
  upload.array('file'),
  async (request, response) => {
    const importTransactionsService = new ImportTransactionsService();

    const requestFiles = request.files as Express.Multer.File[];

    const transactionsCSV = requestFiles.map(async file =>
      importTransactionsService.execute(file.filename),
    );

    const resolvedTransactions = await Promise.all(transactionsCSV);

    return response.status(200).json(resolvedTransactions);
  },
);

export { transactionsRouter };
