export interface Address {
    line1: string;
    line2?: string;
}

export interface City {
    name: string;
}

export interface Venue {
    name: string;
    address: Address;
    city: City;
}

export interface Image {
    ratio: string;
    url: string;
    width: number;
    height: number;
}

export enum EventStatus {
    onSale = 'on sale',
    offSale = 'off sale',
    canceled = 'canceled',
    postponed = 'postponed',
    rescheduled = 'rescheduled',
}

export interface Status {
    code: EventStatus;
}

export interface PriceRange {
    currency: string;
    min: number;
    max?: number;
}

export interface Event {
    id: string;
    name: string;
    url: string;
    type: string;
    images: Image[];
    dates: {
        start: {
            localDate: string;
        }
        end?: {
            localDate: string;
        }
        status?: Status;
    };
    priceRanges: PriceRange[];
    info: string;
    venue: Venue;
}