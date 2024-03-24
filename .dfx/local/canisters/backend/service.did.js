export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'addProductToShop' : IDL.Func(
        [
          IDL.Text,
          IDL.Record({
            'inStock' : IDL.Bool,
            'name' : IDL.Text,
            'description' : IDL.Text,
            'productId' : IDL.Text,
            'price' : IDL.Text,
          }),
        ],
        [IDL.Text],
        [],
      ),
    'getAllShops' : IDL.Func(
        [],
        [
          IDL.Vec(
            IDL.Record({
              'shopId' : IDL.Text,
              'owner' : IDL.Principal,
              'name' : IDL.Text,
              'description' : IDL.Text,
              'products' : IDL.Vec(
                IDL.Record({
                  'inStock' : IDL.Bool,
                  'name' : IDL.Text,
                  'description' : IDL.Text,
                  'productId' : IDL.Text,
                  'price' : IDL.Text,
                })
              ),
            })
          ),
        ],
        ['query'],
      ),
    'getProducts' : IDL.Func(
        [IDL.Text],
        [
          IDL.Opt(
            IDL.Vec(
              IDL.Record({
                'inStock' : IDL.Bool,
                'name' : IDL.Text,
                'description' : IDL.Text,
                'productId' : IDL.Text,
                'price' : IDL.Text,
              })
            )
          ),
        ],
        ['query'],
      ),
    'getShopDetails' : IDL.Func(
        [IDL.Text],
        [
          IDL.Opt(
            IDL.Record({
              'shopId' : IDL.Text,
              'owner' : IDL.Principal,
              'name' : IDL.Text,
              'description' : IDL.Text,
              'products' : IDL.Vec(
                IDL.Record({
                  'inStock' : IDL.Bool,
                  'name' : IDL.Text,
                  'description' : IDL.Text,
                  'productId' : IDL.Text,
                  'price' : IDL.Text,
                })
              ),
            })
          ),
        ],
        ['query'],
      ),
    'registerShop' : IDL.Func(
        [IDL.Principal, IDL.Text, IDL.Text, IDL.Text],
        [IDL.Text],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
