import { Link } from "react-router-dom";

export const SideNav = ({ isSidebarCollapsed }) => {
  return (
    <div>
      {isSidebarCollapsed && (
        <aside
          id="logo-sidebar"
          className={`fixed top-0 left-0 w-64 h-screen ml-2 pr-6 mr-20 pt-20 transition-transform ${
            isSidebarCollapsed ? "-translate-x-full" : "translate-x-0"
          }sm:translate-x-0 `}
          aria-label="Sidebar"
        >
          <div className="h-full px-3 pb-4 overflow-y-auto rounded-lg pt-3 bg-white dark:bg-gray-800">
            <ul className="space-y-2 font-medium">
              <li>
                <Link
                  to={"/admin"}
                  className="flex items-center p-2 text-gray-500 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group hover:text-gray-900"
                >
                  <i className="ri-group-fill text-2xl"></i>
                  <span className="flex-1 ml-3 text-gray-900">
                    Utilisateurs
                  </span>
                </Link>
              </li>

              <li>
                <Link
                  to={"/admin/services"}
                  className="flex items-center p-2 text-gray-500 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group hover:text-gray-900"
                >
                  <i className="ri-team-fill text-2xl"></i>
                  <span className="flex-1 ml-3 text-gray-900">Services</span>
                </Link>
              </li>

              <li>
                <Link
                  to={"/logout"}
                  className="cursor-pointer flex items-center p-2 text-gray-500 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group hover:text-gray-900"
                >
                  <i className="ri-logout-circle-line text-2xl"></i>
                  <span className="flex-1 ml-3 text-gray-900">Sign Out</span>
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      )}
    </div>
  );
};
