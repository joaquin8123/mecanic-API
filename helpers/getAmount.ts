import IService from '../interfaces/service'
import Service from '../models/Service'


export const getAmount = async (services: IService[]) => {
    let amount:number = 0 

    await services.forEach(async(serviceId: IService['_id']) => {
        const service: IService = await Service.findById(serviceId)
        amount += service.price
    });
    
    return amount
};
