import { Post } from "../posts/posts.model";
import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";
import { Photo } from "src/photos/photos.model";
import { PhotoAlbum } from "src/photo_albums/photo_albums.model";
interface UserCreationAttrs{
    login: string;
    email: string;
    password: string;
    activationLink: string;
}


@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {

    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({ type: DataType.STRING, unique: true, allowNull:false})
    login: string;

    @Column({ type: DataType.STRING, unique: true, allowNull:false})
    email: string;

    @Column({ type: DataType.STRING, allowNull:false})
    password: string;

    @Column({ type: DataType.BOOLEAN, defaultValue: false})
    isActivate: boolean;

    @Column({ type: DataType.STRING, allowNull:false})
    activationLink: string;

    @BelongsToMany( () => Role, () => UserRoles)
    roles: Role[];

    @HasMany( () => Post)
    posts: Post[];

    @HasMany( () => PhotoAlbum )
    albums: PhotoAlbum[];
}