import { mountContentScript } from "cc-extension-core";
import "./style.css";
import { monkeytypeSiteConfig } from "./site-config";

mountContentScript(monkeytypeSiteConfig);
