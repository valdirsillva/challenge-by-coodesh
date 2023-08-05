import * as dotenv from 'dotenv'
import fs from 'fs'
import axios from "axios";
import { readFile } from "fs/promises"
import { FoodReadDataset } from "./interfaces/controllers/http/FoodReadDataset";

dotenv.config()

async function Start() {
  const response = await fetch(
    "https://challenges.coode.sh/food/data/json/index.txt"
  );

  const text = await response.text();
  const lines = text.split("\n");
  const lastLine = lines[lines.length - 2];

  const dataset = new FoodReadDataset();
  await dataset.downloadPackageZip(lastLine!);

}

async function importData() {
  const host = `${process.env.HOST}:${process.env.PORT}`
  const routePath = '/api/products/add';

  const res = await readFile("./data/dados.json", "utf-8")
  const data = await JSON.parse(res)

  if (data.length > 0) {
    console.log("-> Importing product base in the database...")
    await axios.put(`${host}${routePath}`, data)
  }

  clearArchives()
}

const clearArchives = () => {
  const directoryPath = process.cwd().concat(`/data`);

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error('Error read directory:', err);
      return;
    }

    // Iterar sobre a lista de arquivos e apagar um por um
    files.forEach((file) => {
      const filePath = `${directoryPath}/${file}`;

      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Error in file delete:', err);
          return;
        }
        console.log(`File ${file} success delete.`);
      });
    });
  });

}

Start();

setTimeout(() => {

  importData()
    .then(() => {
      console.log("-> data successfully imported!");
    })
    .catch((error) => {
      // console.error("Error importing data:", error.message);
    });

}, 40000)




