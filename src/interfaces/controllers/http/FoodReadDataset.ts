import fs from 'fs'

import Path from 'path'
import axios from 'axios'
import ProgressBar from 'progress'
import path from 'path'
const gunzipMaybe = require('gunzip-maybe');
const readline = require("readline")

export class FoodReadDataset {
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
    const progressBar = new ProgressBar('-> downloading [:bar] :percent :etas', {
      width: 40,
      complete: '=',
      incomplete: ' ',
      renderThrottle: 1,
      total: parseInt(totalLength)
    })

    const writer = fs.createWriteStream(
      Path.resolve(__dirname, '', `${filename}`)
    )

    data.on('data', (chunk: any) => progressBar.tick(chunk.length))
    data.pipe(writer)

    setTimeout(() => {
      this.descompactar(filename)
    }, 3000)
  }

  descompactar(file: string) {
    const gzipFileInput = path.join(__dirname, file)
    const output = path.join(__dirname, `/json/product.json`)

    // Criando um stream de leitura p/ o arquivo comprimido
    const readStream = fs.createReadStream(gzipFileInput);

    // Stream de escrita p/ o arquivo descompactado
    const writeStream = fs.createWriteStream(output);

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
          console.log('Arquivo JSON salvo com sucesso.');
        }
      });
    });

    // Evento para controlar possíveis erros durante a leitura
    readStream.on('error', (err) => {
      console.error('Erro ao ler o arquivo comprimido:', err);
    });
  }
}