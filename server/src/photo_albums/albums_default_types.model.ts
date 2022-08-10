import { Column, DataType, Model, Table } from "sequelize-typescript";



@Table({tableName: 'photo_album_default_types', timestamps: false})
export class PhotoAlbumDefaultTypes extends Model<PhotoAlbumDefaultTypes> {

    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({ type: DataType.STRING, allowNull:false})
    value: string;
    
    @Column({ type: DataType.STRING, allowNull:true})
    name: string;

    @Column({ type: DataType.STRING, allowNull:true})
    description: string;
    

    
}