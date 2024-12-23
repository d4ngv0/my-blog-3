import fs from "fs"
import { BASE_STORAGE_NAME } from "./EnvConfig.js"

export function initStorage(){
          if(!fs.existsSync(BASE_STORAGE_NAME)){
                    fs.mkdirSync(BASE_STORAGE_NAME, {recursive: true});
                    fs.writeFileSync(BASE_STORAGE_NAME+"/db.json", "[]");
          }
}