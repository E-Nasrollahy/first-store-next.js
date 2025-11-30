import React from "react";

export const ContainerLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="mx-30 ">
           {children}
        </div>
    );
}
