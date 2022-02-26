import { Builder } from "selenium-webdriver";

export const driver = new Builder().forBrowser("firefox").build();
