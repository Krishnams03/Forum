import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const AppBreadcrumbs = () => {
  let location = useLocation();
  let pathname = location.pathname.split('/');
  
  String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
  };
  
  return (
    <div className="mt-3">
      {pathname[1] !== '' ? (
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            {pathname.map((path, idx, arr) => (
              <li key={path} className="inline-flex items-center">
                {idx > 0 && (
                  <svg className="w-3 h-3 mx-1 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                  </svg>
                )}
                <Link 
                  to={arr.slice(0, idx + 1).join('/')} 
                  className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2"
                >
                  {idx ? path.capitalize() : 'Home'}
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      ) : (
        ''
      )}
    </div>
  );
};

export default AppBreadcrumbs;