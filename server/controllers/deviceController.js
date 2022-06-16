const uuid = require("uuid");
const path = require("path");
const gm = require("gm");
const fs = require("fs");
const {
  Device,
  DeviceInfo,
  SubDevice,
  DeviceImg,
  Rating,
  DeviceDescription,
  DeviceMoreInfo
} = require("../models/models");
const ApiError = require("../error/ApiError");

class DeviceController {
  async create(req, res, next) {
    try {
      const {
        name,
        price,
        brandId,
        typeId,
        titleTypeId,
        subTypeId,
        favourite,
        big,
        little,
      } = req.body;
      let {DeviceMoreInf} = req.body
      const img = req.files;

      const device = await Device.create({
        name,
        price,
        brandId,
        typeId,
        titleTypeId,
        subTypeId,
        favourite,
      });
      await DeviceDescription.create({
        big,
        little,
        deviceId: device.id,
      });
      if (DeviceMoreInf){
        DeviceMoreInf = JSON.parse(DeviceMoreInf)

        DeviceMoreInf.map(i =>{
          DeviceMoreInfo.create({
                title: i.title,
                description: i.description,
                deviceId: device.id
            })
        })
    }
      for (const key in img) {
        let fileName = uuid.v4() + ".jpg";

        img[key].mv(path.resolve(__dirname, "..", "files", "images", fileName));
        // gm(path.resolve(__dirname, '..', 'files', 'images', fileName)).size(function (err){
        //   if (err) console.log(err);
        // })
        await DeviceImg.create({
          name: fileName,
          deviceId: device.id,
        });
      }
      // if (info){
      //     info = JSON.parse(info)
      //     info.forEac(i =>{
      //         Device.create({
      //             title: i.title,
      //             description: i.description,
      //             deviceId: device.id
      //         })
      //     })
      // }
      return res.json(device);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async getAll(req, res, next) {
    try {
      let { brandId, typeId, titleTypeId, subTypeId, limit, page, favourite } =
        req.query;
      brandId = brandId?.split("%") || brandId;
      page = page || 1;
      limit = limit || 10;
      let offset = page * limit - limit;
      let devices;
      if (!brandId && !typeId && !titleTypeId && !subTypeId) {
        devices = await Device.findAndCountAll({
          limit,
          offset,
          include: [
            {
              model: SubDevice,
              as: "subDevice",
              include: [{ model: DeviceInfo, as: "info" }],
            },
            { model: DeviceImg, as: "deviceImg" },
            { model: DeviceDescription, as: "device_description" },
            { model: DeviceMoreInfo, as: "more_info" },
          ],
        });
      }

      if (favourite) {
        devices = await Device.findAll({
          where: { favourite: true },
          include: [
            {
              model: SubDevice,
              as: "subDevice",
              include: [{ model: DeviceInfo, as: "info" }],
            },
            { model: DeviceImg, as: "deviceImg" },
            { model: Rating, as: "rating" },
          ],
        });
      }

      if (!brandId && typeId) {
        devices = await Device.findAndCountAll({
          where: { typeId },
          include: [
            {
              model: SubDevice,
              as: "subDevice",
              include: [{ model: DeviceInfo, as: "info" }],
            },
            { model: DeviceImg, as: "deviceImg" },
            { model: Rating, as: "rating" },
          ],
          limit,
          offset,
        });
      }
      if (brandId && typeId) {
        devices = await Device.findAndCountAll({
          where: { typeId, brandId },
          include: [
            {
              model: SubDevice,
              as: "subDevice",
              include: [{ model: DeviceInfo, as: "info" }],
            },
            { model: DeviceImg, as: "deviceImg" },
            { model: Rating, as: "rating" },
          ],
          limit,
          offset,
        });
      }
      if (!brandId && titleTypeId) {
        devices = await Device.findAndCountAll({
          where: { titleTypeId },
          include: [
            {
              model: SubDevice,
              as: "subDevice",
              include: [{ model: DeviceInfo, as: "info" }],
            },
            { model: DeviceImg, as: "deviceImg" },
            { model: Rating, as: "rating" },
          ],
          limit,
          offset,
        });
      }
      if (!brandId && subTypeId) {
        devices = await Device.findAndCountAll({
          where: { subTypeId },
          include: [
            {
              model: SubDevice,
              as: "subDevice",
              include: [{ model: DeviceInfo, as: "info" }],
            },
            { model: DeviceImg, as: "deviceImg" },
            { model: Rating, as: "rating" },
          ],
          limit,
          offset,
        });
      }

      // if (brandId && !typeId) {
      //     console.log(4);
      //     devices = await Device.findAndCountAll({ where: { brandId } })
      // }
      // if (brandId && !titleTypeId) {
      //     console.log(5);
      //     devices = await Device.findAndCountAll({ where: { brandId } })
      // }
      // if (brandId && !subTypeId) {
      //     console.log(6);
      //     devices = await Device.findAndCountAll({ where: { brandId } })
      // }

      // if (brandId && typeId) {
      //     console.log(7);
      //     devices = await Device.findAndCountAll({ where: { brandId, typeId } })
      // }
      // if (brandId && titleTypeId) {
      //     console.log(8);
      //     devices = await Device.findAndCountAll({ where: { brandId, titleTypeId } })
      // }
      // if (brandId && subTypeId) {
      //     console.log(9);
      //     devices = await Device.findAndCountAll({ where: { brandId, subTypeId } })
      // }

      return res.json(devices);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async getOne(req, res) {
    const { id } = req.params;
    const device = await Device.findOne({
      where: { id },
      include: [
        {
          model: SubDevice,
          as: "subDevice",
          include: [{ model: DeviceInfo, as: "info" }],
        },
        { model: DeviceImg, as: "deviceImg" },
        { model: Rating, as: "rating" },
        { model: DeviceDescription, as: "device_description" },
        { model: DeviceMoreInfo, as: "more_info" },
      ],
    });
    return res.json(device);
  }

  async update(req, res) {
    const device = req.body;
    let id = device.id;
    let img = req.files;

    if (img) {
      img = img.img;
      let imgName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "files", "images", imgName));
      device.img = imgName;
    }

    if (!device.id) {
      res.status(400).json({ message: "ID yok" });
    }

    const updatedPost = await Device.update(device, { where: { id } });

    return res.json(updatedPost);
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const device = await Device.destroy({ where: { id } });
      const subDevices = await SubDevice.destroy({
        where: { deviceId: id },
        include: [{ model: DeviceInfo, as: "info" }],
      });
      const info = await DeviceInfo.destroy({ where: { subDeviceId: null } });
      const deviceImg = await DeviceImg.findAll({ where: { deviceId: null } });
      deviceImg.map((i) => {
        fs.unlink(
          path.resolve(__dirname, "..", "files", "images", i.name),
          function (err) {
            if (err) {
              console.log(err);
            }
          }
        );
        i.destroy();
      });
      return res.json(device);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new DeviceController();
