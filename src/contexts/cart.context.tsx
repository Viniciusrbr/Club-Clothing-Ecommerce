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
  toggleCart: () => {},
  addProductToCart: () => {},
  removeProductFromCart: () => {},
  increaseProductQuantity: () => {},
  decreaseProductQuantity: () => {},
  clearProducts: () => {},
});

const CartContextProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [products, setProducts] = useState<CartProduct[]>([]);

  useEffect(() => {
    try {
      const productsFromLocalStorage = localStorage.getItem("cartProducts");

      // Verifica se existe algo no localStorage e se é uma string válida
      if (
        productsFromLocalStorage &&
        productsFromLocalStorage !== "undefined" &&
        productsFromLocalStorage !== "null"
      ) {
        try {
          const parsedProducts = JSON.parse(productsFromLocalStorage);
          // Verifica se o que foi parseado é um array
          if (Array.isArray(parsedProducts)) {
            setProducts(parsedProducts);
          } else {
            setProducts([]);
            localStorage.removeItem("cartProducts"); // Remove dados inválidos
          }
        } catch (parseError) {
          console.error("Error parsing cart products:", parseError);
          setProducts([]);
          localStorage.removeItem("cartProducts"); // Remove dados inválidos
        }
      } else {
        setProducts([]);
        localStorage.removeItem("cartProducts"); // Remove dados inválidos
      }
    } catch (error) {
      console.error("Error loading cart products:", error);
      setProducts([]);
    }
  }, []);

  useEffect(() => {
    try {
      if (products && Array.isArray(products)) {
        if (products.length > 0) {
          localStorage.setItem("cartProducts", JSON.stringify(products));
        } else {
          localStorage.removeItem("cartProducts");
        }
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
    // verificar se o produto já está no carrinho
    const productIsAlreadyInCart = products.some(
      (item) => item.id === product.id
    );

    // se sim -> aumentar sua quantidade
    if (productIsAlreadyInCart) {
      return setProducts((products) =>
        products.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    }

    // se não -> adicioná-lo
    setProducts((prevState) => [...prevState, { ...product, quantity: 1 }]);
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
