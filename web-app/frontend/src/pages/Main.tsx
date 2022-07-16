import ThemeStore from "../store/ThemeStore";
import DeviceCard from "../components/DeviceCard";

const Main = () => {
    return (
        <div className="container">
            <h1>The Mobx use case example(Light/Dark mode)</h1>
            <div className="testElement">
                {
                    ThemeStore.theme === "light"
                        ? <h4>Test element in light mode</h4>
                        : <h4>Test element in dark mode</h4>
                }
            </div>
            <DeviceCard/>
            <DeviceCard/>
            <DeviceCard/>
            <DeviceCard/>
        </div>
    );
};

export default Main;
