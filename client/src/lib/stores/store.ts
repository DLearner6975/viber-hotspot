import { UiStore } from "./uiStore";
import { createContext } from "react";
import CounterStore from "./counterStore";
import ActivityStore from "./activityStore";

interface Store {
    counterStore: CounterStore;
    uiStore: UiStore;
    activityStore: ActivityStore;
}

export const store: Store = {
    counterStore: new CounterStore(),
    uiStore: new UiStore(),
    activityStore: new ActivityStore(),
};

export const StoreContext = createContext(store);
