class FoodReadFileZip {
  static async get() {
    try {
      const food = process.env.FOOD_DATA_TEXT!
      const response = await fetch(food);
      const text = await response.text()
      const lines = text.split('\n')
      const lastLine = lines[lines.length - 2]
      return lastLine;
    } catch (err) {
      console.log(err)
    }
  }
}

export { FoodReadFileZip }