import { INeighborRepository } from "../../../domain/interface/repositories/INeighborRepository";
import { LocationDetailsDTO, locationDTO } from "../../../shared/types/LocationDetailsDTO";




export class LocationUsecase{
    constructor(
        private neighborRepository:INeighborRepository
    ) { }
    async saveLocation(id: string, location:locationDTO): Promise<locationDTO>{
        const { city, radius, coordinates } = location;
        const [ lat, lng ] = coordinates;

        const geoCoordinates = {
            type: 'Point' as const,
            coordinates: [lng, lat] as [number, number], 
        };
        const Location = { city, radius, coordinates: geoCoordinates };
        return await this.neighborRepository.updateLocation(id, Location);
    }

    async getServiceLocation(id: string): Promise<locationDTO>{
        return await this.neighborRepository.getServiceLocation(id)

    }
}