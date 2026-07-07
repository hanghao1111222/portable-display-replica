import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface OrderItem {
  productSlug: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  userId: string;
  userEmail: string;
  items: OrderItem[];
  subtotal: number;
  status: "pending" | "completed" | "cancelled" | "processing";
  createdAt: string;
}

interface AuthContextType {
  currentUser: User | null;
  usersList: User[];
  ordersList: Order[];
  register: (name: string, email: string, password: string) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (name: string, email: string, password?: string) => Promise<boolean>;
  createOrder: (items: { product: { slug: string; name: string; price: number; images: string[] }; quantity: number }[], subtotal: number) => Order | null;
  getUserOrders: () => Order[];
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [usersList, setUsersList] = useState<User[]>([]);
  const [ordersList, setOrdersList] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // Initialize and load data from localStorage on mount
  useEffect(() => {
    try {
      const storedUsers = localStorage.getItem("anyking_users");
      const storedCurrentUser = localStorage.getItem("anyking_current_user");
      const storedOrders = localStorage.getItem("anyking_orders");

      if (storedUsers) {
        setUsersList(JSON.parse(storedUsers));
      } else {
        // Seed database with a demo user for convenience
        const demoUser = {
          id: "demo-user-id",
          name: "Demo Professional",
          email: "demo@anyking.com",
          createdAt: new Date().toISOString(),
        };
        const demoUserCredentials = {
          email: "demo@anyking.com",
          password: "password123",
        };
        localStorage.setItem("anyking_users", JSON.stringify([demoUser]));
        localStorage.setItem("anyking_user_creds", JSON.stringify([demoUserCredentials]));
        setUsersList([demoUser]);
      }

      if (storedCurrentUser) {
        setCurrentUser(JSON.parse(storedCurrentUser));
      }

      if (storedOrders) {
        setOrdersList(JSON.parse(storedOrders));
      } else {
        // Seed database with some dummy order history for the demo user
        const demoOrders: Order[] = [
          {
            id: "AK-2026-9812",
            userId: "demo-user-id",
            userEmail: "demo@anyking.com",
            items: [
              {
                productSlug: "a6-dual-monitor",
                name: "Anyking A6 Dual Screen Extender",
                price: 299,
                quantity: 1,
                image: "/laptop-extended-left.png",
              }
            ],
            subtotal: 299,
            status: "completed",
            createdAt: new Date(Date.now() - 1000 * 3600 * 24 * 5).toISOString(), // 5 days ago
          },
          {
            id: "AK-2026-4731",
            userId: "demo-user-id",
            userEmail: "demo@anyking.com",
            items: [
              {
                productSlug: "s10-pro-triple-monitor",
                name: "Anyking S10 Pro Triple Screen Extender",
                price: 499,
                quantity: 1,
                image: "/laptop-extended-triple.png",
              }
            ],
            subtotal: 499,
            status: "completed",
            createdAt: new Date(Date.now() - 1000 * 3600 * 24 * 30).toISOString(), // 30 days ago
          }
        ];
        localStorage.setItem("anyking_orders", JSON.stringify(demoOrders));
        setOrdersList(demoOrders);
      }
    } catch (e) {
      console.error("Failed to load auth database from localStorage", e);
    } finally {
      setLoading(false);
    }
  }, []);

  // Register function
  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      const storedUsers = localStorage.getItem("anyking_users") || "[]";
      const users: User[] = JSON.parse(storedUsers);

      // Check if user already exists
      if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
        toast.error("This email address is already registered.");
        return false;
      }

      const newUser: User = {
        id: `user-${Math.floor(100000 + Math.random() * 900000)}`,
        name,
        email: email.toLowerCase(),
        createdAt: new Date().toISOString(),
      };

      // Add user info
      const updatedUsers = [...users, newUser];
      localStorage.setItem("anyking_users", JSON.stringify(updatedUsers));
      setUsersList(updatedUsers);

      // Add user credentials securely in separate mock table
      const storedCreds = localStorage.getItem("anyking_user_creds") || "[]";
      const creds = JSON.parse(storedCreds);
      creds.push({ email: email.toLowerCase(), password });
      localStorage.setItem("anyking_user_creds", JSON.stringify(creds));

      // Auto login after registration
      setCurrentUser(newUser);
      localStorage.setItem("anyking_current_user", JSON.stringify(newUser));
      toast.success("Account created successfully!");
      return true;
    } catch (e) {
      console.error("Registration error:", e);
      toast.error("Registration failed. Please try again.");
      return false;
    }
  };

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const storedCreds = localStorage.getItem("anyking_user_creds") || "[]";
      const creds = JSON.parse(storedCreds);

      // Find matching credentials
      const matched = creds.find(
        (c: any) => c.email.toLowerCase() === email.toLowerCase() && c.password === password
      );

      if (!matched) {
        toast.error("Invalid email or password.");
        return false;
      }

      const storedUsers = localStorage.getItem("anyking_users") || "[]";
      const users: User[] = JSON.parse(storedUsers);
      const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

      if (!user) {
        toast.error("User account not found.");
        return false;
      }

      setCurrentUser(user);
      localStorage.setItem("anyking_current_user", JSON.stringify(user));
      toast.success(`Welcome back, ${user.name}!`);
      return true;
    } catch (e) {
      console.error("Login error:", e);
      toast.error("Login failed. Please try again.");
      return false;
    }
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("anyking_current_user");
    toast.success("Logged out successfully.");
  };

  // Update profile details
  const updateProfile = async (name: string, email: string, password?: string): Promise<boolean> => {
    if (!currentUser) return false;
    try {
      const storedUsers = localStorage.getItem("anyking_users") || "[]";
      const users: User[] = JSON.parse(storedUsers);

      // Verify email isn't taken by someone else
      if (
        users.some(
          (u) => u.email.toLowerCase() === email.toLowerCase() && u.id !== currentUser.id
        )
      ) {
        toast.error("This email is already taken by another account.");
        return false;
      }

      // Update current user
      const updatedUser: User = {
        ...currentUser,
        name,
        email: email.toLowerCase(),
      };

      // Update users database
      const updatedUsers = users.map((u) => (u.id === currentUser.id ? updatedUser : u));
      localStorage.setItem("anyking_users", JSON.stringify(updatedUsers));
      setUsersList(updatedUsers);

      // Update credentials if password is provided or email changed
      const storedCreds = localStorage.getItem("anyking_user_creds") || "[]";
      const creds = JSON.parse(storedCreds);
      const updatedCreds = creds.map((c: any) => {
        if (c.email.toLowerCase() === currentUser.email.toLowerCase()) {
          return {
            email: email.toLowerCase(),
            password: password || c.password,
          };
        }
        return c;
      });
      localStorage.setItem("anyking_user_creds", JSON.stringify(updatedCreds));

      // Update orders database to match new email if it changed
      if (email.toLowerCase() !== currentUser.email.toLowerCase()) {
        const storedOrders = localStorage.getItem("anyking_orders") || "[]";
        const orders: Order[] = JSON.parse(storedOrders);
        const updatedOrders = orders.map((o) =>
          o.userId === currentUser.id ? { ...o, userEmail: email.toLowerCase() } : o
        );
        localStorage.setItem("anyking_orders", JSON.stringify(updatedOrders));
        setOrdersList(updatedOrders);
      }

      setCurrentUser(updatedUser);
      localStorage.setItem("anyking_current_user", JSON.stringify(updatedUser));
      toast.success("Profile updated successfully!");
      return true;
    } catch (e) {
      console.error("Update profile error:", e);
      toast.error("Update failed. Please try again.");
      return false;
    }
  };

  // Create order on checkout completion
  const createOrder = (
    items: { product: { slug: string; name: string; price: number; images: string[] }; quantity: number }[],
    subtotal: number
  ): Order | null => {
    try {
      const orderItems: OrderItem[] = items.map((item) => ({
        productSlug: item.product.slug,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.images[0] || "",
      }));

      const newOrder: Order = {
        id: `AK-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        userId: currentUser?.id || "guest",
        userEmail: currentUser?.email || "guest@anyking.com",
        items: orderItems,
        subtotal,
        status: "completed",
        createdAt: new Date().toISOString(),
      };

      const storedOrders = localStorage.getItem("anyking_orders") || "[]";
      const orders: Order[] = JSON.parse(storedOrders);
      const updatedOrders = [newOrder, ...orders];

      localStorage.setItem("anyking_orders", JSON.stringify(updatedOrders));
      setOrdersList(updatedOrders);

      return newOrder;
    } catch (e) {
      console.error("Failed to create order:", e);
      return null;
    }
  };

  // Get orders of current user
  const getUserOrders = (): Order[] => {
    if (!currentUser) return [];
    return ordersList.filter((o) => o.userId === currentUser.id);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        usersList,
        ordersList,
        register,
        login,
        logout,
        updateProfile,
        createOrder,
        getUserOrders,
        isAuthenticated: !!currentUser,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
