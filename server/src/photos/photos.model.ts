import { Post } from "../posts/posts.model";
import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { PostPhotos } from "src/posts/post-photos.model";
import { User } from "src/users/users.model";
import { PhotoAlbum } from "src/photo_albums/photo_albums.model";
interface PhotoCreationAttrs{
    album_id: number;
    fileName: string;
}


@Table({tableName: 'photos'})
export class Photo extends Model<Photo, PhotoCreationAttrs> {

    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({ type: DataType.STRING, allowNull:false})
    fileName: string;

    @ForeignKey( () => PhotoAlbum)
    album_id: number;

    @BelongsTo( () => PhotoAlbum)
    album: PhotoAlbum;

    @BelongsToMany( () => Post, () => PostPhotos)
    posts: Post[];
}