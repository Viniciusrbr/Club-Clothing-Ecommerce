import { createContext, useEffect, useMemo, useState } from "react";
import CartProduct from "../types/cart.types";
import Product from "../types/product.types";

interface ICartContext {
  isVisible: boolean;
  productsTotalPrice: number;
  productsCount: number;
  products: CartProduct[];
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

const CartContextProvider = ({ children }) => {
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

  const productsTotalPrice = useMemo(() => {
    if (!products || products.length === 0) return 0;

    return products.reduce((acc, currentProduct) => {
      return acc + currentProduct.price * currentProduct.quantity;
    }, 0);
  }, [products]);

  const productsCount = useMemo(() => {
    if (!products || products.length === 0) return 0;

    return products.reduce((acc, currentProduct) => {
      return acc + currentProduct.quantity;
    }, 0);
  }, [products]);

  const toggleCart = () => {
    setIsVisible((prevState) => !prevState);
  };

  const addProductToCart = (product: Product) => {
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
  };

  const removeProductFromCart = (productId: string) => {
    setProducts((products) =>
      products.filter((product) => product.id !== productId)
    );
  };

  const increaseProductQuantity = (productId: string) => {
    setProducts((products) =>
      products.map((product) =>
        product.id === productId
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };

  const decreaseProductQuantity = (productId: string) => {
    setProducts((products) =>
      products
        .map((product) =>
          product.id === productId
            ? { ...product, quantity: product.quantity - 1 }
            : product
        )
        .filter((product) => product.quantity > 0)
    );
  };

  const clearProducts = () => {
    setProducts([]);
  };

  return (
    <CartContext.Provider
      value={{
        isVisible,
        products,
        productsTotalPrice,
        productsCount,
        toggleCart,
        addProductToCart,
        removeProductFromCart,
        increaseProductQuantity,
        decreaseProductQuantity,
        clearProducts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
