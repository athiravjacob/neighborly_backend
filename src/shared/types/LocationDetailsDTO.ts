export interface LocationDetailsDTO {
    city: string;
    radius: number;
    coordinates: {
        type: "Point";
        coordinates: [number, number];
    }
}

export interface locationDTO{
    city: string,
    radius: number,
    coordinates:[number,number]
 }