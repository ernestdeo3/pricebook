export class PriceList {
    $key: string;
    date: string;
    item:ItemPrice[]=[];
    // setA: PriceSet;
    // setB: PriceSet;
    // setC: PriceSet;
}

export class PriceSet {
    name: string;
    item:ItemPrice[]=[];
}
export class ItemPrice {
    name: string;
    priceA:number;
    priceB:number;
}

export class ItemEntry {
    name: string;
    desc: string;
    uom: string;
    priceA:number;
    priceB:number;
}

export class Item {
    $key: string;
    name: string;
    desc: string;
    uom: string;
}


