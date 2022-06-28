import React from 'react';
import ThemeStore from "../store/ThemeStore";

const Main = () => {
    return (
        <div>
            <div className="container">
                <h1>The Mobx use case example(Light/Dark mode)</h1>
                <div className="testElement">
                    {
                        ThemeStore.theme === "light"
                            ? <h4>Test element in light mode</h4>
                            : <h4>Test element in dark mode</h4>
                    }
                </div>
            </div>
        </div>
    );
};

export default Main;
