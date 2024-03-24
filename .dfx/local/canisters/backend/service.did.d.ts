import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
  'addProductToShop' : ActorMethod<
    [
      string,
      {
        'inStock' : boolean,
        'name' : string,
        'description' : string,
        'productId' : string,
        'price' : string,
      },
    ],
    string
  >,
  'getAllShops' : ActorMethod<
    [],
    Array<
      {
        'shopId' : string,
        'owner' : Principal,
        'name' : string,
        'description' : string,
        'products' : Array<
          {
            'inStock' : boolean,
            'name' : string,
            'description' : string,
            'productId' : string,
            'price' : string,
          }
        >,
      }
    >
  >,
  'getProducts' : ActorMethod<
    [string],
    [] | [
      Array<
        {
          'inStock' : boolean,
          'name' : string,
          'description' : string,
          'productId' : string,
          'price' : string,
        }
      >
    ]
  >,
  'getShopDetails' : ActorMethod<
    [string],
    [] | [
      {
        'shopId' : string,
        'owner' : Principal,
        'name' : string,
        'description' : string,
        'products' : Array<
          {
            'inStock' : boolean,
            'name' : string,
            'description' : string,
            'productId' : string,
            'price' : string,
          }
        >,
      }
    ]
  >,
  'registerShop' : ActorMethod<[Principal, string, string, string], string>,
}
