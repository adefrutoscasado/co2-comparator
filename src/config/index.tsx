import {
    TransportType,
    FoodType,
    StreamingType,
    FashionType,
    PurchaseType
} from 'carbon-footprint'


export const transportDefaultProps = {
    stepUnit: "km",
    defaultValue: 50,
    max: 1000
}

export const foodDefaultProps = {
    stepUnit: "g",
    defaultValue: 150
}

export const streamingDefaultProps = {
    stepUnit: "h",
    defaultValue: 2,
    max: 10
}

export const fashionDefaultProps = {
    stepUnit: "unit",
    defaultValue: 1,
    max: 100
}

export const purchaseDefaultProps = {
    stepUnit: "unit",
    defaultValue: 1,
    max: 100
}

export const getTypeProps = (key: string) => {

    switch (key) {

        // Transport
        case TransportType.plane: 
            return {
                ...transportDefaultProps,
                max: 10000,
                defaultChecked: true,
            }
        case TransportType.shortHaulFlight: 
        case TransportType.mediumHaulFlight: 
        case TransportType.longHaulFlight: 
            return {
                ...transportDefaultProps,
                max: 10000,
            }
        case TransportType.boat: 
            return {
                ...transportDefaultProps,
            }
        case TransportType.car: 
            return {
                ...transportDefaultProps,
                defaultChecked: true,
            }
        case TransportType.fossilFueledCar: 
        case TransportType.electricVehicle: 
        case TransportType.hybridCar: 
        case TransportType.carSharing:         
        case TransportType.bus:
        case TransportType.shortDistanceBus: 
        case TransportType.longDistanceBus: 
        case TransportType.motorbike:
        case TransportType.train: 
            return {
                ...transportDefaultProps,
            }
        
        // Food
        case FoodType.beef: 
            return {
                ...foodDefaultProps,
                defaultChecked: true,
            }
        case FoodType.coffee:
        case FoodType.chocolate:
        case FoodType.redMeat:
        case FoodType.whiteMeat:
        case FoodType.fish:
        case FoodType.lamb:
        case FoodType.cheese:
        case FoodType.pork:
        case FoodType.turkey:
        case FoodType.chicken:
        case FoodType.tuna:
        case FoodType.eggs:
        case FoodType.rice:
        case FoodType.nuts:
        case FoodType.beans:
        case FoodType.tofu:
        case FoodType.vegetables:
        case FoodType.milk:
        case FoodType.fruit:
        case FoodType.lentils:
        case 'beyondMeat':
            return {
                ...foodDefaultProps,
            }

        // Streaming
        case StreamingType.ultraHDVideo:
            return {
                ...streamingDefaultProps,
                defaultChecked: true,
            }
        case StreamingType.HDVideo:
        case StreamingType.fullHDVideo:
        case StreamingType.audioMP3:
            return {
                ...streamingDefaultProps,
            }

        // Fashion
        case FashionType.shirt:
            return {
                ...fashionDefaultProps,
                defaultChecked: true,
            }
        case FashionType.tshirt:
        case FashionType.jeans:
        case FashionType.sweater:
        case FashionType.coat:
        case FashionType.dress:
        case FashionType.shoes:
            return {
                ...fashionDefaultProps,
            }

        // Purchase
        case PurchaseType.smartphone:
        case PurchaseType.tablet:
        case PurchaseType.computer:
        case PurchaseType.laptop:
        case PurchaseType.tv:
        case PurchaseType.hybridCar:
        case PurchaseType.eletricCar:
        case PurchaseType.cryptoCurrencyPoW:
        case PurchaseType.singleEditionNFT:
            return {
                ...purchaseDefaultProps,
            }
    }
}