import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  { languageOptions: { 
      globals: { 
        ...globals.browser, 
        ...globals.jest, 
        page: "readonly" 
      }
    }
  },
  pluginJs.configs.recommended,
  // Disable specific rules
  {
    rules: {
      'no-unused-vars': 'off',
      'no-undef': 'off'
    }
  }
];
