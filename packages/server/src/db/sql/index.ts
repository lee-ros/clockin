import { join } from "path";
import { QueryFile, IQueryFileOptions } from "pg-promise";

export const users = {
    createTable: sql('users/createTable.sql'),
    add: sql('users/add.sql'),
    byId: sql('users/byId.sql'),
    byEmail: sql('users/byEmail.sql'),
    delete: sql('users/delete.sql'),
}

export const tasks = {
    createTable: sql('tasks/createTable.sql'),
    add: sql('tasks/add.sql'),
    byUser: sql('tasks/byUser.sql'),
    delete: sql('tasks/delete.sql'),
}

function sql(file: string): QueryFile {
    const fullpath = join(__dirname, file);
    const options: IQueryFileOptions = {
        minify: true,
    }

    const qf: QueryFile = new QueryFile(fullpath, options);
    
    if (qf.error) {
        console.error(qf.error);
    }

    return qf;
}