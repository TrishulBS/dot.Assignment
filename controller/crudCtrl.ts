import { Request, Response } from "express";
import { getDB } from "../config/buildSchema";



export const createHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const db = await getDB();
        const tableName: string = req.params.collection;
        const columnNames: string[] = Object.keys(req.body);
        const columnValues: any[] = Object.values(req.body);

        const createQuery = `INSERT INTO ${tableName} (${columnNames.join(', ')}) VALUES (${columnValues.map(() => '?').join(', ')})`;

        db.run(createQuery, columnValues, (err: Error | null) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    error: err.message,
                });
            } else {
                return res.status(201).json({ 
                    success: true,
                    message: 'Data inserted successfully',
                });
            }
        });
    } catch (error) {
        res.status(500).json({ 
            error: (error as Error).message,
        });
    }
};


export const getHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const db = await getDB();
        const tableName: string = req.params.collection;
        const rowId: number = parseInt(req.params.id, 10); // Assuming the rowId is a number

        const getQuery = `SELECT * FROM ${tableName} WHERE id = ?`;

        db.get(getQuery, rowId, (err: Error | null, row: any) => {
            if (err) {
                return res.status(500).json({ 
                    success: false,
                    error: err.message,
                });
            } else {
                if (row) {
                    return res.status(200).json({
                        success: true,
                        data: row,
                    });
                } else {
                    return res.status(404).json({ 
                        success: false,
                        message: 'Row not found',
                    });
                }
            }
        });
    } catch (error) {
        res.status(500).json({ 
            error: (error as Error).message,
        });
    }
};


export const updateHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const db = await getDB();
        const tableName: string = req.params.collection;
        const rowId: number = parseInt(req.params.id, 10); // Assuming the rowId is a number
        const columnNames: string[] = Object.keys(req.body);
        const columnValues: any[] = Object.values(req.body);
        columnValues.push(rowId);

        const updateQuery = `UPDATE ${tableName} SET ${columnNames.map(name => `${name} = ?`).join(', ')} WHERE id = ?`;


        db.run(updateQuery, columnValues, function (this: any, err: Error | null) {
            if (err) {
                return res.status(500).json({
                    success: false,
                    error: err.message,
                });
            } else {
                if (this.changes > 0) {
                    return res.status(200).json({
                        success: true,
                        message: 'Row updated successfully',
                    });
                } else {
                    return res.status(404).json({
                        success: false,
                        message: 'Row not found',
                    });
                }
            }
        });

    } catch (error) {
        res.status(500).json({ 
            error: (error as Error).message,
        });
    }
};


export const deleteHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const db = await getDB();
        const tableName: string = req.params.collection;
        const rowId: number = parseInt(req.params.id, 10); // Assuming the rowId is a number

        const deleteQuery = `DELETE FROM ${tableName} WHERE id = ?`;

        db.run(deleteQuery, rowId, function (this: any, err: Error | null) {
            if (err) {
                res.status(500).json({ 
                    success: false,
                    error: err.message,
                });
            } else {
                if (this.changes > 0) {
                    res.status(200).json({ 
                        success: true,
                        message: 'Row deleted successfully',
                    });
                } else {
                    res.status(404).json({ 
                        success: false,
                        message: 'Row not found',
                    });
                }
            }
        });

    } catch (error) {
        res.status(500).json({ 
            error: (error as Error).message,
        });
    }
};