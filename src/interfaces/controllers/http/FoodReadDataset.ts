import fs from 'fs'

import Path from 'path'
import axios from 'axios'
import ProgressBar from 'progress'
const gunzipMaybe = require('gunzip-maybe');
const readline = require("readline")

export class FoodReadDataset {
  startProgressBar(totalLength: string) {
    const progressBar = new ProgressBar('-> downloading [:bar] :percent :etas', {
      width: 40,
      complete: '=',
      incomplete: ' ',
      renderThrottle: 1,
      total: parseInt(totalLength)
    })
    return progressBar
  }

  async downloadPackageZip(filename: string) {
    const url = 'https://challenges.coode.sh/food/data/json/' + `${filename}`
    console.log('Connecting …')
    const { data, headers } = await axios({
      url,
      method: 'GET',
      responseType: 'stream'
    })
    const totalLength = headers['content-length']

    console.log('Starting download')
    const progressBar = this.startProgressBar(totalLength)


    const writer = fs.createWriteStream(
      Path.resolve(process.cwd().concat("/data"), '', `${filename}`)
    )

    data.on('data', (chunk: any) => progressBar.tick(chunk.length))
    data.pipe(writer)

    writer.on('finish', () => {
      console.log("-> data extract... ")
      this.descompactar(filename)
    })

  }


  descompactar(file: string) {
    const gzipFileInput = process.cwd().concat(`/data/${file}`)
    const rootDir = process.cwd()
    const output = `${rootDir}/data/product.json`;
    const readStream = fs.createReadStream(gzipFileInput);

    // Utiliza a função 'pipe' para direcionar o conteúdo do arquivo comprimido
    // para o descompressor zlib e, em seguida, para o arquivo descompactado
    const unzipStream = readStream.pipe(gunzipMaybe())

    const rl = readline.createInterface({
      input: unzipStream,
      crlfDelay: Infinity
    });

    const toArrayJson: any = []

    rl.on('line', (line: any) => {
      try {
        const jsonObject = JSON.parse(line);
        toArrayJson.push(jsonObject);
      } catch (parseError) {
        console.error('Erro ao fazer o parse do JSON:', parseError);
      }
    });

    // Evento para controlar o término da leitura
    rl.on('close', () => {
      // Salva o array de objetos JSON em um arquivo JSON
      fs.writeFile(output, JSON.stringify(toArrayJson), (err) => {
        if (err) {
          console.error('Erro ao salvar o arquivo JSON:', err);
        } else {
          console.log('-> salvando arquivo de importação ...');

          this.streamData()
        }
      });
    });


    // Evento para controlar possíveis erros durante a leitura
    readStream.on('error', (err) => {
      console.error('Erro ao ler o arquivo comprimido:', err);
    });

  }

  streamData() {
    console.log("-> data reading ...");
    const productJSON = process.cwd().concat(`/data/product.json`);
    const readStream = fs.createReadStream(productJSON);

    const rl = readline.createInterface({
      input: readStream,
      crlfDelay: Infinity,
    });

    let extractedFields: any = []

    rl.on("line", (line: any) => {
      const obj = JSON.parse(line);

      const recordsOnehundred = obj.slice(10000, 10100);

      const newObj = recordsOnehundred.map((pro: any) => {
        return {
          code: parseInt(pro.code, 10),
          status: pro.status,
          imported_t: pro.imported_t,
          creator: pro.creator,
          created_t: pro.created_t,
          last_modified_t: parseInt(pro.last_modified_t, 10),
          product_name: pro.product_name,
          quantity: pro.quantity,
          brands: pro.brands,
          categories: pro.categories,
          labels: pro.labels,
          cities: pro.cities,
          purchase_places: pro.purchase_places,
          stores: pro.stores,
          ingredients_text: pro.ingredients_text,
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

    readStream.on('finish', () => console.log('-> arquivo de importação salvo com sucesso!'))
  }
}