"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCsvFile = parseCsvFile;
const papaparse_1 = __importDefault(require("papaparse"));
function parseCsvFile(file) {
    return new Promise((resolve, reject) => {
        papaparse_1.default.parse(file, {
            header: true,
            skipEmptyLines: true,
            transformHeader: (header) => header.trim().toLowerCase().replace(/\s+/g, ''),
            complete: (results) => {
                console.log('CSV parsing completed:', results);
                if (results.errors.length > 0) {
                    reject(results.errors);
                    return;
                }
                const rows = results.data;
                resolve(rows.map((row) => ({
                    analystName: row.analystname ?? '',
                    analystEmail: row.participant ?? '',
                    courseName: row.trainingcourse ?? '',
                    activityDate: row.completiondate ?? '',
                    durationHours: row.totalhours ? row.totalhours : '0',
                    trainerName: row.trainer || undefined
                })));
            },
            error: (error) => {
                console.error('CSV parse error', error);
                reject(error);
            }
        });
    });
}
