const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const data = await Tag.findAll({
      include: [{model: Product}]
    })
    res.status(200).json(data)}
    catch (err) {
      res.status(500).json(err)
    }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const data = await Tag.findByPk(req.params.id, { include: { model: Product } })
    if (!data) {
      res.status(404).json({ message: "No Tag With This ID" })
    }
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const data = await Tag.create(req.body)
    res.status(200).json(data)
    console.log("POST Sucessfully", data)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const data = await Tag.update(
      { tag_name: req.body.tag_name },
      { where: { id: req.params.id } })
      res.status(200).json(data)
      if (!data) {
        res.status(404).json({ message: "Tag is not exists, Cannot Update Tag." })
        }
      } catch (err) {
        res.status(500).json(err)
      }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try {
    const data = await Tag.destroy({ where: { id: req.params.id } })
    if (!data) {
      res.status(404).json({ message: "Unable to find Tag" })
      return
    }
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
