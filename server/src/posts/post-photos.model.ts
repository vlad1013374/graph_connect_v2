import { Post } from "./posts.model";
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Photo } from "../photos/photos.model";



@Table({tableName: 'post_photos', timestamps: false})
export class PostPhotos extends Model<PostPhotos> {

    @ForeignKey( () => Post)
    @Column({ type: DataType.INTEGER})
    post_id: number;

    @ForeignKey( () => Photo)
    @Column({ type: DataType.INTEGER})
    photo_id: number;
}