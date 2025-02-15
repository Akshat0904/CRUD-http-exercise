import User from "./features/user/User";
import "./App.css";

/**
 * Root Application Component
 * @component App
 * @description Main application component that renders the User Management System
 *
 * @features
 * - Single page application structure
 * - Renders the main User management interface
 * - Handles global application state
 *
 * @example
 * ```tsx
 * <App />
 * ```
 */
const App: React.FC = () => {
  return (
    <>
      <User />
    </>
  );
};

export default App;
