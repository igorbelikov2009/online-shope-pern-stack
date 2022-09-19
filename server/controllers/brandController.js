const { Brand } = require("../models/models");

class BrandController {
  async create(req, res) {
    const { name } = req.body;
    const brand = await Brand.create({ name });
    return res.json(brand);
  }

  async getAll(req, res) {
    const brands = await Brand.findAll();
    return res.json(brands);
  }

  async delete(req, res) {
    try {
      // В первую очередь получаем id устройства из параметров.
      // Этот параметр мы указывали в brandRouter.js
      // как router.delete("/:id", checkRole("ADMIN"), brandController.delete);
      const { id } = req.params;

      await Brand.findOne({ where: { id } }).then(async (data) => {
        if (data) {
          await Brand.destroy({ where: { id } }).then(() => {
            return res.json("Брэнд удалён");
          });
        } else {
          return res.json("Этого бренда нет в базе данных");
        }
      });
    } catch (e) {
      return res.json(e);
    }
  }
}

module.exports = new BrandController();
// На выходе из этого файла у нас будет новый объект, созданный из этого класса.
// Через точку будем обращаться к этим функциям, чтобы их вызывать, например BrandController().check
// экспортируем в userRouter
// http://localhost:5000/api/brand
