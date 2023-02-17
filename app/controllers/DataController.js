import DataModel from '../models/DataModel.js';

export const getData = async (req, res) => {
  try {
    const data = await DataModel.findAll({
      order: [['id', 'DESC']],
    });

    return res.status(200).json({ status: 200, data: data });
  } catch (e) {
    return res.status(500).json({ status: 500, data: e?.message });
  }
};

export const getDataByName = async (req, res) => {
  try {
    const data = await DataModel.findOne({
      where: {
        name: req.params.name,
      },
    });

    if (!data || data.length == 0) {
      return res.status(404).json({ status: 404, data: 'Data not found' });
    }

    return res.status(200).json({ status: 200, data: data });
  } catch (e) {
    return res.status(500).json({ status: 500, data: e?.message });
  }
};

export const createData = async (req, res) => {
  const { name, value } = req.body;
  console.log(req.body);

  try {
    await DataModel.create({
      name, // name: name
      value, // value: value
    });

    return res.status(201).json({ status: 200, data: 'Data created' });
  } catch (e) {
    return res.status(400).json({ status: 400, data: e?.message });
  }
};

export const updateData = async (req, res) => {
  const data = await DataModel.findOne({
    where: {
      name: req.params.name,
    },
  });

  if (!data) {
    return res.status(404).json({ status: 404, data: 'Data not found' });
  }

  const { name = data.name, value = data.value } = req.body;

  try {
    await DataModel.update(
      {
        name, // name: name
        value, // value: value
      },
      {
        where: {
          name: data.name,
        },
      }
    );

    res.status(200).json({ status: 200, data: 'Data updated succesfully' });
  } catch (e) {
    res.status(400).json({ status: 400, data: e?.message });
  }
};

export const deleteData = async (req, res) => {
  try {
    const status = await DataModel.destroy({
      where: {
        name: req.params.name,
      },
    });

    if (status) {
      return res
        .status(200)
        .json({ status: 200, data: 'Data deleted succesfully' });
    } else {
      return res.status(404).json({ status: 404, data: 'Data not found' });
    }
  } catch (e) {
    res.status(500).json({ status: 500, data: e?.message });
  }
};
