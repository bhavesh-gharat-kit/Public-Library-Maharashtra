import path from "node:path";
import { createRequire } from "node:module";
import CopyWebpackPlugin from "copy-webpack-plugin";

const require = createRequire(import.meta.url);

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, { isServer }) {
    // Keep your existing pdf.worker rule
    config.module.rules.push({
      test: /pdf\.worker\.min\.mjs$/,
      type: "asset/resource",
    });

    // Add WASM copy only for client builds
    if (!isServer) {
      const pdfjsDistPath = path.dirname(require.resolve("pdfjs-dist/package.json"));
      const wasmDir = path.join(pdfjsDistPath, "wasm");

      config.plugins.push(
        new CopyWebpackPlugin({
          patterns: [
            {
              from: wasmDir,
              to: "static/wasm/", // will be served from /_next/static/wasm/
            },
          ],
        })
      );
    }

    return config;
  },
};

export default nextConfig;




// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   webpack(config) {
//     config.module.rules.push({
//       test: /pdf\.worker\.min\.mjs$/,
//       type: "asset/resource",
//     });
//     return config;
//   },
// };

// export default nextConfig;
