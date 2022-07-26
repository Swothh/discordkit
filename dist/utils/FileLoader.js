"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileLoader = void 0;
const structures_1 = require("../structures");
const events_1 = __importDefault(require("events"));
const path_1 = require("path");
const glob_1 = __importDefault(require("glob"));
;
class FileLoader extends events_1.default {
    files = [];
    startedAt = Date.now();
    constructor(dir) {
        super();
        (0, glob_1.default)('**/*+(.ts|.js)', { cwd: dir }, (err, files) => {
            if (err)
                return this.emit('error', err);
            files.forEach(async (file, index) => {
                const { default: File } = await Promise.resolve().then(() => __importStar(require((0, path_1.join)(dir, file))));
                const isFirst = this.files.length === 0 && (File instanceof structures_1.Command || File instanceof structures_1.Event);
                let instance = structures_1.Command;
                if (isFirst || File instanceof instance) {
                    instance = File instanceof structures_1.Command ? structures_1.Command : structures_1.Event;
                    this.files.push(File);
                    this.emit('load', File);
                }
                else {
                    if (!(File instanceof structures_1.Command) && !(File instanceof structures_1.Event)) {
                        this.emit('error', new Error(`${file} must export a Command instance or Event instance as default.`));
                    }
                    ;
                }
                ;
                if (index === files.length - 1)
                    this.emit('finish', Date.now() - this.startedAt);
            });
        });
    }
    ;
}
exports.FileLoader = FileLoader;
;
