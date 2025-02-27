
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Radio } from "lucide-react";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <nav className="border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  className="h-8 w-8"
                  src="/placeholder.svg"
                  alt="Your Company"
                />
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `${
                        isActive
                          ? "bg-gray-700 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white"
                      } rounded-md px-3 py-2 text-sm font-medium flex items-center`
                    }
                  >
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    Dashboard
                  </NavLink>
                  <NavLink
                    to="/sites"
                    className={({ isActive }) =>
                      `${
                        isActive
                          ? "bg-gray-700 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white"
                      } rounded-md px-3 py-2 text-sm font-medium flex items-center`
                    }
                  >
                    <Radio className="h-4 w-4 mr-2" />
                    Sites
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
};
