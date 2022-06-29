const fs = require('fs');

class Contenedor {
  constructor(myFile) {
    this.myFile = myFile;
    this.id = 1;
    this.listProductsOnFile = [];
  }

  async save(myObject) {
    try {
      let content;

      if (fs.existsSync(this.myFile)) {
        content = await fs.promises.readFile(this.myFile, 'utf-8');
      } else {
        content = await fs.promises.writeFile(this.myFile, '');
      }

      if (content && content.length > 0) {
        //if text contains files...

        this.listProductsOnFile = await JSON.parse(content);
        this.id = this.listProductsOnFile[this.listProductsOnFile.length - 1].id + 1;
        this.listProductsOnFile.push({ ...myObject, id: this.id });
      } else {
        //if text file is empty...
        this.listProductsOnFile.push({ ...myObject, id: this.id });
      }
      await fs.promises.writeFile(this.myFile, `${JSON.stringify(this.listProductsOnFile)}`);
      return this.id;
    } catch (err) {
      console.log('Error de escritura: ', err);
    }
  }

  async getById(id) {
    try {
      if (fs.existsSync(this.myFile)) {
        const content = await fs.promises.readFile(this.myFile, 'utf-8');

        const producToFind = content && (await JSON.parse(content).find((element) => element.id === id));
        return !producToFind || producToFind.length === 0 ? null : producToFind;
      } else {
        console.log('File not exist');
        return null;
      }
    } catch (err) {
      console.log('Error de lectura: ', err);
    }
  }

  async getAll() {
    try {
      if (fs.existsSync(this.myFile)) {
        const content = await fs.promises.readFile(this.myFile, 'utf-8');
        const listProducts = content && (await JSON.parse(content));
        return listProducts;
      } else {
        console.log('File not exist');
        return null;
      }
    } catch (err) {
      console.log('Error de lectura: ', err);
    }
  }

  async deleteById(id) {
    try {
      if (fs.existsSync(this.myFile)) {
        const content = await fs.promises.readFile(this.myFile, 'utf-8');
        const newProducts = content && (await JSON.parse(content).filter((element) => element.id !== id));
        await fs.promises.writeFile(this.myFile, `${JSON.stringify(newProducts)}`);
        return newProducts;
      } else {
        console.log('File not exist');
      }
    } catch (err) {
      console.log('Error de lectura: ', err);
    }
  }

  async deleteAll() {
    try {
      await fs.promises.writeFile(this.myFile, '');
    } catch (err) {
      console.log('Error de lectura: ', err);
    }
  }
}

module.exports = { Contenedor };
