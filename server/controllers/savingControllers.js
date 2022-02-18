const { Saving, Trip, User } = require('../models/index')

class SavingController {
  static async postSaving(req,res,next) {
    try {
      const { tripId } = req.params
      const userId = req.user.id
      const { name,amount } = req.body
      const trip = await Trip.findByPk(tripId)

      if(!trip) {
        throw {
          name: "TripNotFound"
        }
      }

      await Saving.create({
        name,
        amount,
        tripId,
        userId,
        savingDate,
      })
      res.status(201).json({
        message: "Happy saving!"
      })
    } catch (error) {
      next(error)
    }
  }

  static async getSavings(req,res,next) {
    try {
      const { tripId } = req.params
      const savings = await Saving.findAll({
        where: {
          tripId: tripId
        },
        include: [User]
      })
      res.status(200).json(savings)
    } catch (error) {
      next(error)
    }
  }

  static async getSavingById(req,res,next) {
    try {
      const { savingId } = req.params
      const savings = await Saving.findAll({
        where: {
          id: savingId
        },
        include: [User]
      })
      res.status(200).json(savings)
    } catch (error) {
      next(error)
    }
  }


  static async deleteSaving(req,res,next) {
    try {
      const { savingId } = req.params
      const saving = await Saving.findByPk(savingId)
      if(!saving) {
        throw {
          name: "SavingNotFound"
        }
      }
      await Saving.destroy({
        where:{
          id:savingId
        }
      })
      res.status(200).json({
        message: `Saving has been deleted!`
      })
    } catch (error) {
      next(error)
    }
  }
}
//"TripNotFound"

module.exports = SavingController