import { Post } from "../posts/posts.model";
import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { PostPhotos } from "src/posts/post-photos.model";
import { User } from "src/users/users.model";
import { Photo } from "src/photos/photos.model";
import { PhotoAlbumDefaultTypes } from "./albums_default_types.model";
interface PhotoAlbumCreationAttrs{
    user_id: number;
    type_id: number;
    name: string;
    description: string;
}


@Table({tableName: 'photo_albums'})
export class PhotoAlbum extends Model<PhotoAlbum, PhotoAlbumCreationAttrs> {

    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({ type: DataType.STRING, allowNull:false})
    name: string;

    @Column({ type: DataType.STRING, allowNull:true})
    description: string;

    @ForeignKey( () => User)
    user_id: number;

    @BelongsTo( () => User)
    autor: User;

    @ForeignKey( () => PhotoAlbumDefaultTypes)
    type_id: number;

    @BelongsTo( () => PhotoAlbumDefaultTypes)
    type: PhotoAlbumDefaultTypes;

    @HasMany( () => Photo)
    photos: Photo[];
    

    
}