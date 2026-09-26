const menuModel = require("../../models/menu");

const { checkMenu, checkMenuId } = require("../../validators/menu");

exports.create = async (req, res) => {
  const validation = checkMenu(req.body);

  if (validation !== true) {
    return res.status(400).json({
      message: "Invalid menu data.",
      errors: validation,
    });
  }

  const { title, href, parent } = req.body;

  const menu = await menuModel.create({
    title,
    href,
    parent,
  });

  const mainMenu = await menuModel
    .findOne({ _id: menu._id })
    .populate("parent")
    .lean();

  return res.status(201).json({
    message: "Menu created successfully.",
    mainMenu,
  });
};

exports.getAll = async (req, res) => {
  const menus = await menuModel.find({}).lean();

  const result = menus
    .filter((menu) => !menu.parent)
    .map((menu) => ({
      ...menu,
      subMenus: menus.filter(
        (subMenu) =>
          subMenu.parent && String(subMenu.parent) === String(menu._id),
      ),
    }));

  return res.status(200).json({
    message: "All menus retrieved successfully.",
    menus: result,
  });
};

exports.getAllInPanel = async (req, res) => {
  const menus = await menuModel.find({}).populate("parent").lean();

  return res.status(200).json({
    message: "All menus retrieved successfully.",
    menus,
  });
};

exports.getOne = async (req, res) => {
  const validation = checkMenuId(req.params);

  if (validation !== true) {
    return res.status(400).json({
      message: "Invalid menu ID.",
      errors: validation,
    });
  }

  const { id } = req.params;

  const menu = await menuModel.findOne({ _id: id }).populate("parent").lean();

  if (!menu) {
    return res.status(404).json({
      message: "Menu not found.",
    });
  }

  return res.status(200).json({
    message: "Menu retrieved successfully.",
    menu,
  });
};

exports.delete = async (req, res) => {
  const validation = checkMenuId(req.params);

  if (validation !== true) {
    return res.status(400).json({
      message: "Invalid menu ID.",
      errors: validation,
    });
  }

  const { id } = req.params;

  const deletedMenu = await menuModel.findOneAndDelete({
    _id: id,
  });

  if (!deletedMenu) {
    return res.status(404).json({
      message: "Menu not found.",
    });
  }

  return res.status(200).json({
    message: "Menu deleted successfully.",
    deletedMenu,
  });
};

exports.update = async (req, res) => {
  const idValidation = checkMenuId(req.params);

  if (idValidation !== true) {
    return res.status(400).json({
      message: "Invalid menu ID.",
      errors: idValidation,
    });
  }

  const bodyValidation = checkMenu(req.body);

  if (bodyValidation !== true) {
    return res.status(400).json({
      message: "Invalid menu data.",
      errors: bodyValidation,
    });
  }

  const { title, href, parent } = req.body;

  const updatedMenu = await menuModel.findOneAndUpdate(
    { _id: req.params.id },
    {
      title,
      href,
      parent,
    },
    {
      new: true,
    },
  );

  if (!updatedMenu) {
    return res.status(404).json({
      message: "Menu not found.",
    });
  }

  const mainMenu = await menuModel
    .findOne({ _id: updatedMenu._id })
    .populate("parent")
    .lean();

  return res.status(200).json({
    message: "Menu updated successfully.",
    mainMenu,
  });
};
