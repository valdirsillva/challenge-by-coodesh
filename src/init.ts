import { FoodReadDataset } from "./interfaces/controllers/http/FoodReadDataset"

async function Start() {
    const response = await fetch("https://challenges.coode.sh/food/data/json/index.txt");
    const text = await response.text()
    const lines = text.split('\n')
    const lastLine = lines[lines.length - 2]

    const dataset = new FoodReadDataset()
    await dataset.downloadPackageZip(lastLine!)
    
}

Start()

