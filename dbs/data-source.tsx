import { DataSource, DataSourceOptions } from "typeorm";
import Users from "./entity/Users";


export const dbMSSQL = new DataSource({
    type: 'sqlite',
    database: 'DBProvisional.sqlite',
    synchronize: true,
    logging: false,
    entities: [Users]
})


export async function CreateDataSource(config: DataSourceOptions) {
    const dataSource = new DataSource({
        // type: "sqlite",
        // database: `${config.database}.sqlite`,
        // synchronize: config.synchronize,
        // logging: config.logging,
        ...config,
    });
    if (!dataSource.isInitialized) {
        await dataSource.initialize();
        console.log('DataSource inicializado');
    }
    return dataSource;
}
