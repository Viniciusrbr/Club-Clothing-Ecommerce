import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import CartProduct from "../types/cart.types";
import Product from "../types/product.types";

interface ICartContext {
  isVisible: boolean;
  productsTotalPrice: number;
  productsCount: number;
  products: CartProduct[];
}

interface ICartActionsContext {
  toggleCart: () => void;
  addProductToCart: (product: Product) => void;
  removeProductFromCart: (productId: string) => void;
  increaseProductQuantity: (productId: string) => void;
  decreaseProductQuantity: (productId: string) => void;
  clearProducts: () => void;
}

export const CartContext = createContext<ICartContext>({
  isVisible: false,
  productsTotalPrice: 0,
  productsCount: 0,
  products: [],
});

export const CartActionsContext = createContext<ICartActionsContext>({
  toggleCart: () => { },
  addProductToCart: () => { },
  removeProductFromCart: () => { },
  increaseProductQuantity: () => { },
  decreaseProductQuantity: () => { },
  clearProducts: () => { },
});

const CART_STORAGE_KEY = "cartProducts";

const getStoredCartProducts = (): CartProduct[] => {
  try {
    const productsFromLocalStorage = localStorage.getItem(CART_STORAGE_KEY);

    if (!productsFromLocalStorage) return [];

    const parsedProducts = JSON.parse(productsFromLocalStorage);
    if (Array.isArray(parsedProducts)) return parsedProducts;

    localStorage.removeItem(CART_STORAGE_KEY);
  } catch (error) {
    console.error("Error loading cart products:", error);
  }

  return [];
};

const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [products, setProducts] = useState<CartProduct[]>(
    getStoredCartProducts
  );

  useEffect(() => {
    try {
      if (products.length > 0) {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(products));
      } else {
        localStorage.removeItem(CART_STORAGE_KEY);
      }
    } catch (error) {
      console.error("Error saving cart products:", error);
    }
  }, [products]);

  const { productsTotalPrice, productsCount } = useMemo(() => {
    return products.reduce(
      (acc, currentProduct) => ({
        productsTotalPrice:
          acc.productsTotalPrice + currentProduct.price * currentProduct.quantity,
        productsCount: acc.productsCount + currentProduct.quantity,
      }),
      { productsTotalPrice: 0, productsCount: 0 }
    );
  }, [products]);

  const actions = useMemo<ICartActionsContext>(
    () => ({
      toggleCart: () => {
        setIsVisible((prevState) => !prevState);
      },

      addProductToCart: (product: Product) => {
        setProducts((prevState) => {
          // verificar se o produto já está no carrinho (usando o estado mais recente,
          // para que cliques rápidos não dupliquem o item)
          const productIsAlreadyInCart = prevState.some(
            (item) => item.id === product.id
          );

          // se sim -> aumentar sua quantidade
          if (productIsAlreadyInCart) {
            return prevState.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          }

          // se não -> adicioná-lo
          return [...prevState, { ...product, quantity: 1 }];
        });
      },

      removeProductFromCart: (productId: string) => {
        setProducts((products) =>
          products.filter((product) => product.id !== productId)
        );
      },

      increaseProductQuantity: (productId: string) => {
        setProducts((products) =>
          products.map((product) =>
            product.id === productId
              ? { ...product, quantity: product.quantity + 1 }
              : product
          )
        );
      },

      decreaseProductQuantity: (productId: string) => {
        setProducts((products) =>
          products
            .map((product) =>
              product.id === productId
                ? { ...product, quantity: product.quantity - 1 }
                : product
            )
            .filter((product) => product.quantity > 0)
        );
      },

      clearProducts: () => {
        setProducts([]);
      },
    }),
    []
  );

  const value = useMemo(
    () => ({ isVisible, products, productsTotalPrice, productsCount }),
    [isVisible, products, productsTotalPrice, productsCount]
  );

  return (
    <CartActionsContext.Provider value={actions}>
      <CartContext.Provider value={value}>{children}</CartContext.Provider>
    </CartActionsContext.Provider>
  );
};

export default CartContextProvider;
