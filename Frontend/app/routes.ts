import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    route("/login", "./routes/login.tsx"),
    route("dashboard", "./routes/dashboard.tsx"),
    route("sidebar", "./components/sidebar.tsx"),
    route("wardrobe", "./routes/wardrobe.tsx")
] satisfies RouteConfig;
