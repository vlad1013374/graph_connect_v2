import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { UserRoles } from "./user-roles.model";
interface RoleCreationAttrs{
    value: string;
}


@Table({tableName: 'roles', timestamps: false})
export class Role extends Model<Role, RoleCreationAttrs> {

    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({ type: DataType.STRING, unique: true})
    value: string;
    
    @BelongsToMany( () => User, () => UserRoles)
    users: User[];
}