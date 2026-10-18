import type {Vault} from './vault';
export type Cached={vault:Vault,revision:number,pending:boolean};
async function database():Promise<IDBDatabase>{return new Promise((resolve,reject)=>{const req=indexedDB.open('moss-offline',1);req.onupgradeneeded=()=>req.result.createObjectStore('vaults');req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error);});}
export async function readCache(key:string):Promise<Cached|undefined>{const db=await database();try{return await new Promise((resolve,reject)=>{const req=db.transaction('vaults').objectStore('vaults').get(key);req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error);});}finally{db.close();}}
export async function writeCache(key:string,value:Cached){const db=await database();try{await new Promise<void>((resolve,reject)=>{const tx=db.transaction('vaults','readwrite');tx.objectStore('vaults').put(value,key);tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error);});}finally{db.close();}}
