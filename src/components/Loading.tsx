import React from "react";

export const LoaderComponent: React.FC = () => {
    return (
        <div className="flex items-center justify-center w-full h-full py-10">
            <div className="flex flex-col items-center">
                {/* Spinner */}
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

                {/* Text */}
                <p className="mt-3 text-gray-600 text-sm font-medium">
                    Loading, please wait...
                </p>
            </div>
        </div>
    );
};
