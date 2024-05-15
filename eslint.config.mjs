import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  {languageOptions: { globals: { ...globals.browser, ...globals.jest, page: "readonly" }}},
  pluginJs.configs.recommended,
];