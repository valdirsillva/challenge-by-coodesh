import fs from "fs";
const zlib = require("zlib");
const readline = require("readline");
import { readFile, writeFile } from "fs/promises";
import { FoodReadDataset } from "./interfaces/controllers/http/FoodReadDataset";

async function Start() {
  const response = await fetch(
    "https://challenges.coode.sh/food/data/json/index.txt"
  );
  const text = await response.text();
  const lines = text.split("\n");
  const lastLine = lines[lines.length - 2];

  const dataset = new FoodReadDataset();
  await dataset.downloadPackageZip(lastLine!);

  setTimeout(() => streamData(), 10000);

}

function streamData() {
  console.log("-> data reading ...");
  const productJSON = process.cwd().concat(`/data/product.json`);
  const readStream = fs.createReadStream(productJSON);

  const rl = readline.createInterface({
    input: readStream,
    crlfDelay: Infinity,
  });

  let extractedFields: any = []

  rl.on("line", (line: any) => {
    const parseData = JSON.parse(line);
    const newObj = parseData.map((pro: any ) => {
        return {
            code: parseInt(pro.code, 10),
            status: pro.status,
            imported_t: pro.imported_t,
            creator:pro.creator,
            created_t:pro.created_t,
            last_modified_t: parseInt(pro.last_modified_t, 10),
            lineduct_name: pro.product_name,
            quantity: pro.quantity,
            brands: pro.brands,
            categories: pro.categories,
            labels: pro.labels,
            cities: pro.cities,
            purchase_places: pro.purchase_places,
            stores: pro.stores,
            ingredients_text:pro.ingredients_text,
            traces: pro.traces,
            serving_size: pro.serving_size,
            serving_quantity: parseFloat(pro.serving_quantity),
            nutriscore_score: parseFloat(pro.nutriscore_score),
            nutriscore_grade: pro.nutriscore_grade,
            main_category: pro.main_category,
            image_url: pro.image_url,
        };
    })
    extractedFields = newObj
  });

  rl.on("close", () => {
    try {
      const jsonObject = extractedFields
      const dados = process.cwd().concat(`/data/dados.json`);

      fs.writeFile(dados, JSON.stringify(jsonObject), (err) => {
        if (err) console.error("Erro ao salvar o arquivo JSON:", err);
      });
    } catch (error) {
      console.error("Erro ao analisar JSON:", error);
    }
  });
}


Start();



            