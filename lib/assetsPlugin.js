import { readdirSync, readFileSync } from 'fs';
import path from 'path';

export default function assetsPlugin(assetsFolder) {
  return {
    name: 'assets-plugin',
    buildStart() {
      const fullFolderPath = path.join(__dirname, assetsFolder);
      for (const file of readdirSync(fullFolderPath)) {
        const filePath = path.join(__dirname, assetsFolder, file);
        this.emitFile({
          type: 'asset',
          source: readFileSync(filePath),
          fileName: file
        });
      }
    }
  };
}
