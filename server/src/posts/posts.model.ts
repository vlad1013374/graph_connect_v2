import { BelongsTo, BelongsToMany, Column, DataType,  ForeignKey,  Model, Table } from "sequelize-typescript";
import { Photo } from "src/photos/photos.model";
import { User } from "src/users/users.model";
import { PostPhotos } from "./post-photos.model";
interface PostCreationAttrs{
    user_id: number;
    description: string;
    photos: number[];
}


@Table({tableName: 'posts'})
export class Post extends Model<Post, PostCreationAttrs> {

    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({ type: DataType.STRING, allowNull:false})
    description: string;


    @ForeignKey( () => User)
    user_id: number;
    
    @BelongsTo( () => User)
    author: User;

    @BelongsToMany( () => Photo, () => PostPhotos)
    photos: Photo[];
}