// components/ThemeStyles.tsx
import React from "react";

export default function ThemeStyles() {
    return (
        <style jsx>{`
            .themed-button {
                transition: all 0.3s ease-out;
                box-shadow: inset 0 1px 2px 0 #b8c1e6,
                            0 0.71px 0.71px -0.58px rgba(46,64,128,0.35),
                            0 1.81px 1.81px -1.17px rgba(46,64,128,0.34),
                            0 3.62px 3.62px -1.75px rgba(46,64,128,0.33),
                            0 6.87px 6.87px -2.33px rgba(46,64,128,0.3),
                            0 13.65px 13.65px -2.92px rgba(46,64,128,0.26),
                            0 30px 30px -3.5px rgba(46,64,128,0.15);
            }
            
            .themed-button:hover {
                transform: translateY(-2px) scale(1.01);
                box-shadow: inset 0 1px 2px 0 #b8c1e6,
                            0 2px 2px -0.58px rgba(46,64,128,0.4),
                            0 4px 4px -1.17px rgba(46,64,128,0.39),
                            0 8px 8px -1.75px rgba(46,64,128,0.38),
                            0 15px 15px -2.33px rgba(46,64,128,0.35),
                            0 25px 25px -2.92px rgba(46,64,128,0.31),
                            0 45px 45px -3.5px rgba(46,64,128,0.25),
                            0 70px 70px -4px rgba(46,64,128,0.2);
            }
            
            @media (min-width: 768px) {
                .themed-button:hover {
                    transform: translateY(-3px) scale(1.02);
                }
            }
            
            .themed-button:active {
                transform: translateY(-1px) scale(1.01);
                transition: all 0.1s ease-out;
            }

            .themed-button-danger {
                transition: all 0.3s ease-out;
                box-shadow: inset 0 1px 2px 0 #f8b8b8,
                            0 0.71px 0.71px -0.58px rgba(239,68,68,0.35),
                            0 1.81px 1.81px -1.17px rgba(239,68,68,0.34),
                            0 3.62px 3.62px -1.75px rgba(239,68,68,0.33),
                            0 6.87px 6.87px -2.33px rgba(239,68,68,0.3),
                            0 13.65px 13.65px -2.92px rgba(239,68,68,0.26),
                            0 30px 30px -3.5px rgba(239,68,68,0.15);
            }
            
            .themed-button-danger:hover {
                transform: translateY(-2px) scale(1.01);
                box-shadow: inset 0 1px 2px 0 #f8b8b8,
                            0 2px 2px -0.58px rgba(239,68,68,0.4),
                            0 4px 4px -1.17px rgba(239,68,68,0.39),
                            0 8px 8px -1.75px rgba(239,68,68,0.38),
                            0 15px 15px -2.33px rgba(239,68,68,0.35),
                            0 25px 25px -2.92px rgba(239,68,68,0.31),
                            0 45px 45px -3.5px rgba(239,68,68,0.25),
                            0 70px 70px -4px rgba(239,68,68,0.2);
            }
            
            @media (min-width: 768px) {
                .themed-button-danger:hover {
                    transform: translateY(-3px) scale(1.02);
                }
            }
            
            .themed-button-danger:active {
                transform: translateY(-1px) scale(1.01);
                transition: all 0.1s ease-out;
            }
        `}</style>
    );
}