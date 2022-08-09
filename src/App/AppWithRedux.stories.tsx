import React from "react";
import {action} from "@storybook/addon-actions";
import AppWithRedux from "./AppWithRedux";
import {ReduxStoreProviderDecorator} from "../ReduxStoreProviderDecorator";

export default {
    title: "AppWithRedux",
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
}

const callback = action("Value changed")


export const AppWithReduxBaseExample = (props: any) => {
    return <AppWithRedux/>
}
