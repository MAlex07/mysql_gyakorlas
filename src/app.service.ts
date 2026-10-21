import { Injectable } from '@nestjs/common';
import mysql from 'mysql2/promise';
import { Macska } from './macska.js';
import { Jatek } from './jatekok.js';

const mysqlConnection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password:'',
  database: 'macskak_es_gazdik'})

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getMacskak(){
    const [rows] = await mysqlConnection.execute(
      'SELECT id, suly, szem_szin AS szemSzin, gazdi_id AS gazdiId, jatek_id AS jatekId FROM macskak',
    );

    return rows as Macska[]
  }
  
  async getJatekok(){
    const [rows] = await mysqlConnection.execute(
      'SELECT id, nev  FROM jatekok'
    );

    return rows as Jatek[]
  }

  async getMacskaSearch(search: string){
    const [results] = await mysqlConnection.execute(
      `SELECT id, suly, szem_szin AS szemSzin, gazdi_id AS gazdiId, jatek_id AS jatekId FROM macskak where szem_szin LIKE ?`, [`%${search}%`]
    );
    const rows = results as any;
    return rows as Macska[];
  }

}
