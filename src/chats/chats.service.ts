import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { OpenAI } from '@langchain/openai';
import { SqlDatabase } from 'langchain/sql_db';
import { SqlDatabaseChain } from 'langchain/chains/sql_db';
import { PromptTemplate } from '@langchain/core/prompts';

@Injectable()
export class ChatsService {
  public chain: any;
  constructor() {
    console.log('ChatsService constructor');
    const template = `Given an input question, first create a syntactically correct {dialect} query to run, then look at the results of the query and return the answer.
Use the following format:

Question: "Question here"
SQLQuery: "SQL Query to run"
SQLResult: "Result of the SQLQuery"
Answer: "Final answer here"

Only use the following tables:

{table_info}

If someone asks for the table foobar, they really mean the employee table.

Question: {input}`;

    const prompt = PromptTemplate.fromTemplate(template);

    /**
     * This example uses Chinook database, which is a sample database available for SQL Server, Oracle, MySQL, etc.
     * To set it up follow the instructions on https://database.guide/2-sample-databases-sqlite/, placing the .db file
     * in the examples folder.
     */
    const dataSource = new DataSource({
      type: 'postgres',
      database: 'postgres',
      host: 'listrdev.cdu4k4e0mlmp.eu-north-1.rds.amazonaws.com',
      port: 5432,
      username: 'postgres',
      password: 'listrdev',
      ssl: {
        rejectUnauthorized: false,
      },
    });

    SqlDatabase.fromDataSourceParams({
      appDataSource: dataSource,
    }).then((db) => {
      this.chain = new SqlDatabaseChain({
        llm: new OpenAI({ temperature: 0 }),
        database: db,
        sqlOutputKey: 'postgres_sql',
        prompt,
      });
  
      console.log(this.chain);
    
    });

  }

  async find() {
    const res = await this.chain.call({
      query: 'how many users do we have?',
    });
    console.log(res);
    return res;
  }
}
