import { defineConfig } from 'vite';
import path from 'path';
import fs from 'fs';
import alias from './path';

const getTsFiles = (dir: string): string[] => {
  try {
    const files: string[] = [];
    if (!fs.existsSync(dir)) {
      console.error(`Directory not found: ${dir}`);
      return files;
    }

    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        files.push(...getTsFiles(fullPath));
      } else if (entry.isFile() && entry.name.endsWith('.ts')) {
        files.push(fullPath);
      }
    }

    return files;
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error);
    return [];
  }
};

const getInputs = () => {
  const input: Record<string, string> = {};
  const tsFiles = getTsFiles(path.resolve(__dirname, './src/ts'));

  tsFiles.forEach((file) => {
    const name = path.parse(file).name; // Just use the file name without directory
    input[name] = file;
  });

  return input;
};

export default defineConfig(({ mode }) => {
  return {
    build: {
      rollupOptions: {
        input: getInputs(),
        output: {
          entryFileNames: '[name].js',
          chunkFileNames: '[name].js',
          assetFileNames: 'assets/[extname]',
          dir: path.resolve(__dirname, 'assets'),
        },
      },
      emptyOutDir: false, // Prevent clearing the output directory
    },
    resolve: {
      alias,
      extensions: ['.ts', '.js', '.scss'],
    },
  };
});
