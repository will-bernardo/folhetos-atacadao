import fs from 'fs';
import path from 'path';
import jsonfile from 'jsonfile';
import type { Folheto, FolhetoList } from '@/types';

const DATA_PATH = path.join(process.cwd(), 'data', 'folhetos.json');
const CONFIG_PATH = path.join(process.cwd(), 'data', 'config.json');

export interface Config {
  header: {
    imagem: string;
  };
}

export function getFolhetos(): Folheto[] {
  try {
    const data = jsonfile.readFileSync(DATA_PATH) as FolhetoList;
    return data.folhetos || [];
  } catch {
    return [];
  }
}

export function saveFolhetos(folhetos: Folheto[]): void {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  jsonfile.writeFileSync(DATA_PATH, { folhetos }, { spaces: 2 });
}

export function addFolheto(folheto: Omit<Folheto, 'id'>): Folheto {
  const folhetos = getFolhetos();
  const newFolheto: Folheto = {
    id: Date.now().toString(),
    ...folheto,
  };
  folhetos.unshift(newFolheto);
  saveFolhetos(folhetos);
  return newFolheto;
}

export function updateFolheto(id: string, updates: Partial<Folheto>): Folheto | null {
  const folhetos = getFolhetos();
  const index = folhetos.findIndex((f) => f.id === id);
  if (index === -1) return null;

  folhetos[index] = { ...folhetos[index], ...updates };
  saveFolhetos(folhetos);
  return folhetos[index];
}

export function deleteFolheto(id: string): boolean {
  const folhetos = getFolhetos();
  const filtered = folhetos.filter((f) => f.id !== id);
  if (filtered.length === folhetos.length) return false;
  
  saveFolhetos(filtered);
  return true;
}

export function getConfig(): Config {
  try {
    return jsonfile.readFileSync(CONFIG_PATH) as Config;
  } catch {
    return { header: { imagem: '' } };
  }
}

export function updateConfig(updates: Partial<Config>): Config {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  const current = getConfig();
  const updated = { ...current, ...updates };
  jsonfile.writeFileSync(CONFIG_PATH, updated, { spaces: 2 });
  return updated;
}
