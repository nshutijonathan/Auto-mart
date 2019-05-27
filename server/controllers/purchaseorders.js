import express from 'express';
import Ordersmodel from '../models/purchaseorders';
import UserData from '../models/users';
import CarsData from '../models/carsadvert';
import Ordersvalidations from '../validations/purchaseorders';

const date = new Date();
class Orders {
  static getallorders(req, res) {
    return res.status(200).send({
      status: 200,
      message: 'All orders retrieved successfully',
      data: Ordersmodel
    });
  }

  static createorder(req, res) {
  	try {
  		if (Ordersvalidations.purchaseorder(req, res)) {}
  	const order = {
  		id: Ordersmodel.length + 1,
  		buyer: req.body.buyer,
  		car_id: req.body.car_id,
  		amount: req.body.amount,
  		status: req.body.status
  	};
  	const carid = CarsData.find(checkid => checkid.id == req.body.car_id);

      const buyerid = UserData.find(checkid => checkid.id == req.body.buyer);
      if (!carid) {
  	return res.status(404).send({
  		status: 404,
  		message: `The car with id ${req.body.car_id} not found`

  	});
      }
  	if (!buyerid) {
  		return res.status(404).send({
  			status: 404,
  			message: `The buyer with id ${req.body.buyer} not found`,

  		});
  	}
  	if ((buyerid) && (carid)) {
  		Ordersmodel.push(order);
  		return res.status(201).send({
  			status: 201,
  			message: ' Purchase Order successfully created',
  			data: {
  				id: order.id,
  				car_id: order.car_id,
  				created_on: date,
  				status: order.status,
  				price: carid.price,
  				price_offered: order.amount,
  			}
  		});
  	}
    } catch (error) {
  	return res.status(400).send({
  		status: 400,
  		message: error.message
  	});
    }
  }

  static updateorder(req, res) {
  	if (req.params.id < 1) {
  		return res.status(404).send({
  			status: 404,
  			message: `the order with id ${req.params.id} not found`,
  		});
  	}
  	const checkorder = Ordersmodel.find(checkid => checkid.id === parseInt(req.params.id));
  	const oldprice = Ordersmodel.find(checkid => checkid.id === parseInt(req.params.id));
    const old_price_offered = oldprice.amount;
    const check_status = oldprice.status;
  	if (!checkorder) {
  		return res.status(404).send({
  			status: 404,
  			message: `Order with id ${req.params.id} not found`
  		});
  	}
  	if (check_status != 'pending') {
  		res.status(405).send({
  			status: 405,
  			message: `Not allowed order ${req.params.id} is not still pending`
  		});
  	}
  	if (check_status == 'pending') {
  		console.log(check_status);
  	console.log(oldprice.amount);
  	checkorder.amount = req.body.amount;
  	console.log(checkorder.amount);
  	return res.status(200).send({
        status: 200,
        message: `Purchasing order ${req.params.id} is successfully updated`,
  		data: {
          id: checkorder.id, car_id: checkorder.car_id, status: checkorder.status, old_price_offered, new_price_offered: checkorder.amount
        }
      });
  	}
  	}
}
export default Orders;
