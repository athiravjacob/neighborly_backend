import { INeighborRepository } from "../../../domain/interface/repositories/INeighborRepository";
import { LocationDetailsDTO } from "../../../shared/types/LocationDetailsDTO";




export class LocationUsecase{
    constructor(
        private neighborRepository:INeighborRepository
    ) { }
    async saveLocation(id: string, location:LocationDetailsDTO): Promise<void>{
        const { city, radius, coordinates } = location;
        const { lat, lng } = coordinates;

        const geoCoordinates = {
            type: 'Point' as const,
            coordinates: {lng, lat},
        };
        const updatedLocation = { city, radius, coordinates: geoCoordinates };
        // await this.neighborRepository.updateLocation(id, updatedLocation);
    }
}