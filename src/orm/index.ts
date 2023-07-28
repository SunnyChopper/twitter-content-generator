import 'reflect-metadata';
import { AppDataSource } from 'src/data-source';

AppDataSource.initialize().then(() => {
    AppDataSource.synchronize();
}).catch((error) => {
    console.error(error);
    throw new Error(`Failed to initialize database. Error: ${error}`);
});